// Componente de checkout que usa una máquina de estados
// Modela el flujo de compra en línea con pasos definidos
// Nuevo: muestra context (carrito), guards (validación), invoke (loading de pago)
import { Component, OnDestroy, inject, signal } from '@angular/core';
import { MachineService } from '../services/machine.service';
import { checkoutMachine } from '../machines/checkout.machine';

@Component({
  selector: 'app-checkout',
  standalone: true,
  template: `
    <div class="checkout">
      <h2>Checkout Flow</h2>

      <!-- Indicador de pasos del checkout -->
      <div class="steps">
        <div class="step" [class.active]="isStep('selecting')">1. Select</div>
        <div class="step" [class.active]="isStep('payment')">2. Payment</div>
        <div class="step" [class.active]="isStep('confirming')">3. Confirm</div>
        <div class="step" [class.active]="isStep('processingPayment')">4. Processing</div>
        <div class="step" [class.active]="isStep('done')">5. Done</div>
      </div>

      <!-- CONTEXT: muestra los datos del carrito -->
      <div class="cart-info">
        <p><strong>Cart:</strong> {{ context().items.length }} items — \${{ context().total.toFixed(2) }}</p>
        @if (context().address) {
          <p><strong>Address:</strong> {{ context().address }}</p>
        }
        @if (context().paymentMethod) {
          <p><strong>Payment:</strong> {{ context().paymentMethod }}</p>
        }
      </div>

      <!-- GUARDS: muestra las condiciones de validación -->
      <div class="guards-info">
        <p><strong>Guards:</strong></p>
        <p [class.pass]="context().items.length > 0">
          hasItems: {{ context().items.length > 0 ? '✅' : '❌ (add items first)' }}
        </p>
        <p [class.pass]="context().address.trim().length > 0">
          hasAddress: {{ context().address.trim().length > 0 ? '✅' : '❌ (set address)' }}
        </p>
        <p [class.pass]="context().paymentMethod.length > 0">
          hasPaymentMethod: {{ context().paymentMethod.length > 0 ? '✅' : '❌ (select method)' }}
        </p>
      </div>

      <div class="content">
        <!-- @switch: control flow moderno de Angular (reemplaza *ngSwitch) -->
        @switch (currentState()) {
          @case ('idle') {
            <p>Ready to start shopping!</p>
          }
          @case ('selecting') {
            <p>Select your products:</p>
            <!-- Lista de productos disponibles para agregar -->
            <div class="product-list">
              @for (product of availableProducts; track product.id) {
                <button class="product-btn" (click)="addItem(product)">
                  + {{ product.name }} — \${{ product.price }}
                </button>
              }
            </div>
            <!-- Lista de items en el carrito -->
            @if (context().items.length > 0) {
              <div class="cart-items">
                <p><strong>Your Cart:</strong></p>
                @for (item of context().items; track item.id) {
                  <div class="cart-item">
                    <span>{{ item.name }} x{{ item.quantity }}</span>
                    <span>\${{ (item.price * item.quantity).toFixed(2) }}</span>
                    <button class="remove-btn" (click)="removeItem(item.id)">✕</button>
                  </div>
                }
              </div>
            }
          }
          @case ('payment') {
            <p>Enter payment details:</p>
            <div class="form-group">
              <label>Shipping Address:</label>
              <input
                type="text"
                [value]="context().address"
                (input)="setAddress($event)"
                placeholder="123 Main St, City"
              />
            </div>
            <div class="form-group">
              <label>Payment Method:</label>
              <div class="payment-options">
                <button
                  [class.selected]="context().paymentMethod === 'credit'"
                  (click)="setPaymentMethod('credit')"
                >Credit Card</button>
                <button
                  [class.selected]="context().paymentMethod === 'paypal'"
                  (click)="setPaymentMethod('paypal')"
                >PayPal</button>
                <button
                  [class.selected]="context().paymentMethod === 'bank'"
                  (click)="setPaymentMethod('bank')"
                >Bank Transfer</button>
              </div>
            </div>
          }
          @case ('confirming') {
            <p>Review your order:</p>
            <div class="order-summary">
              <p><strong>Items:</strong> {{ context().items.length }}</p>
              <p><strong>Total:</strong> \${{ context().total.toFixed(2) }}</p>
              <p><strong>Address:</strong> {{ context().address }}</p>
              <p><strong>Payment:</strong> {{ context().paymentMethod }}</p>
            </div>
          }
          @case ('processingPayment') {
            <!-- INVOKE LOADING STATE: muestra cuando el pago está procesándose -->
            <div class="loading">
              <div class="spinner"></div>
              <p>Processing payment...</p>
              <p class="loading-detail">Calling payment API (2s delay)</p>
            </div>
          }
          @case ('paymentError') {
            <div class="error">
              <p>❌ Payment Failed</p>
              <p class="error-detail">{{ context().error }}</p>
            </div>
          }
          @case ('done') {
            <div class="success">
              <p>✅ Order confirmed!</p>
              <p>Payment ID: {{ context().paymentId }}</p>
            </div>
          }
        }
      </div>

      <!-- ERROR: muestra errores del invoke -->
      @if (context().error && currentState() !== 'paymentError') {
        <div class="error-banner">{{ context().error }}</div>
      }

      <div class="actions">
        <!-- Botones que envían eventos según el estado actual -->
        @if (currentState() === 'idle') {
          <button (click)="send('START')">Start Checkout</button>
        }
        @if (currentState() === 'selecting') {
          <!-- Guard: solo puede avanzar si hay items -->
          <button
            (click)="send('PAY')"
            [disabled]="context().items.length === 0"
            [title]="context().items.length === 0 ? 'Add items first' : 'Proceed to payment'"
          >Continue to Payment</button>
          <button class="secondary" (click)="send('CANCEL')">Cancel</button>
        }
        @if (currentState() === 'payment') {
          <!-- Guard: solo puede confirmar si tiene dirección Y método de pago -->
          <button
            (click)="send('CONFIRM')"
            [disabled]="context().address.trim().length === 0 || context().paymentMethod.length === 0"
            [title]="getConfirmDisabledReason()"
          >Review Order</button>
          <button class="secondary" (click)="send('BACK')">Back</button>
        }
        @if (currentState() === 'confirming') {
          <button (click)="send('CONFIRM')">Pay \${{ context().total.toFixed(2) }}</button>
          <button class="secondary" (click)="send('BACK')">Back</button>
        }
        @if (currentState() === 'paymentError') {
          <button (click)="send('RETRY')">Retry Payment</button>
          <button class="secondary" (click)="send('CANCEL')">Cancel</button>
        }
        @if (currentState() === 'done') {
          <button (click)="send('START')">New Order</button>
        }
      </div>
    </div>
  `,
  styles: [`
    .checkout { background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .steps { display: flex; justify-content: center; gap: 0.5rem; margin: 1rem 0; flex-wrap: wrap; }
    .step { padding: 6px 12px; border-radius: 999px; background: #e2e8f0; color: #64748b; font-size: 0.8rem; font-weight: 600; }
    .step.active { background: #6366f1; color: #fff; }
    .content { text-align: center; padding: 1.5rem 0; }
    .actions { display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem; }
    button { padding: 8px 20px; border: 1px solid #6366f1; background: #6366f1; color: #fff; border-radius: 6px; cursor: pointer; font-weight: 600; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    button.secondary { background: #fff; color: #6366f1; }
    .cart-info { background: #f8fafc; padding: 0.75rem; border-radius: 8px; margin: 0.75rem 0; font-size: 0.85rem; }
    .cart-info p { margin: 0.25rem 0; }
    .guards-info { background: #fffbeb; padding: 0.75rem; border-radius: 8px; margin: 0.75rem 0; font-size: 0.8rem; }
    .guards-info p { margin: 0.2rem 0; }
    .guards-info .pass { color: #16a34a; }
    .product-list { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin: 1rem 0; }
    .product-btn { padding: 6px 12px; border: 1px solid #e2e8f0; background: #fff; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
    .product-btn:hover { background: #f1f5f9; }
    .cart-items { background: #f1f5f9; padding: 0.75rem; border-radius: 8px; margin: 1rem 0; text-align: left; }
    .cart-item { display: flex; justify-content: space-between; align-items: center; padding: 0.3rem 0; }
    .remove-btn { background: #ef4444; color: #fff; border: none; border-radius: 4px; padding: 2px 8px; cursor: pointer; font-size: 0.75rem; }
    .form-group { margin: 1rem 0; text-align: left; }
    .form-group label { display: block; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.9rem; }
    .form-group input { width: 100%; padding: 8px; border: 1px solid #e2e8f0; border-radius: 6px; box-sizing: border-box; }
    .payment-options { display: flex; gap: 0.5rem; }
    .payment-options button { flex: 1; padding: 8px; border: 1px solid #e2e8f0; background: #fff; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
    .payment-options button.selected { border-color: #6366f1; background: #eef2ff; color: #6366f1; }
    .order-summary { background: #f1f5f9; padding: 1rem; border-radius: 8px; text-align: left; }
    .order-summary p { margin: 0.3rem 0; }
    .loading { padding: 2rem; }
    .spinner { width: 40px; height: 40px; border: 4px solid #e2e8f0; border-top-color: #6366f1; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-detail { color: #64748b; font-size: 0.85rem; }
    .error { padding: 1.5rem; color: #dc2626; }
    .error-detail { font-size: 0.85rem; margin-top: 0.5rem; }
    .success { padding: 1.5rem; color: #16a34a; }
    .error-banner { background: #fef2f2; color: #dc2626; padding: 0.75rem; border-radius: 8px; margin-top: 0.75rem; font-size: 0.85rem; }
  `]
})
export class CheckoutComponent implements OnDestroy {
  private readonly machineService = inject(MachineService);
  private actor: any = null; // Actor de XState
  readonly currentState = signal('idle'); // Estado actual del checkout
  readonly context = signal<any>({
    items: [], total: 0, address: '', paymentMethod: '',
    error: null, paymentId: null,
  }); // Context de la máquina (carrito, dirección, etc.)

  // Productos disponibles para agregar al carrito
  readonly availableProducts = [
    { id: 1, name: 'Angular Book', price: 29.99 },
    { id: 2, name: 'XState Course', price: 49.99 },
    { id: 3, name: 'TypeScript Guide', price: 24.99 },
  ];

  constructor() {
    // Creamos un actor desde la máquina de checkout
    this.actor = this.machineService.createActorFrom(checkoutMachine);
    // Obtenemos el estado inicial
    const initialSnapshot = this.actor.getSnapshot();
    this.currentState.set(initialSnapshot.value);
    this.context.set(initialSnapshot.context);

    // Escuchamos cambios de estado
    this.actor.subscribe((snapshot: any) => {
      this.currentState.set(snapshot.value);
      // Actualizamos el context (datos del carrito, errores, etc.)
      this.context.set(snapshot.context);
    });
  }

  // Helper: verificar si estamos en un paso específico
  isStep(step: string): boolean {
    return this.currentState() === step;
  }

  // Helper: razón por la que el botón de confirmar está deshabilitado
  getConfirmDisabledReason(): string {
    if (this.context().address.trim().length === 0) return 'Enter shipping address first';
    if (this.context().paymentMethod.length === 0) return 'Select payment method first';
    return '';
  }

  // Agregar producto al carrito (envía evento ADD_ITEM)
  addItem(product: { id: number; name: string; price: number }) {
    this.actor?.send({ type: 'ADD_ITEM', item: product });
  }

  // Eliminar producto del carrito (envía evento REMOVE_ITEM)
  removeItem(itemId: number) {
    this.actor?.send({ type: 'REMOVE_ITEM', itemId });
  }

  // Establecer dirección de envío (envía evento SET_ADDRESS)
  setAddress(event: Event) {
    const input = event.target as HTMLInputElement;
    this.actor?.send({ type: 'SET_ADDRESS', address: input.value });
  }

  // Establecer método de pago (envía evento SET_PAYMENT_METHOD)
  setPaymentMethod(method: string) {
    this.actor?.send({ type: 'SET_PAYMENT_METHOD', method });
  }

  // Envía un evento genérico a la máquina de estados
  send(event: string) {
    this.actor?.send({ type: event });
  }

  // Limpiamos el actor al destruir el componente
  ngOnDestroy() {
    this.actor?.stop();
  }
}
