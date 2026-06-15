import { Component, OnDestroy, inject, signal } from '@angular/core';
import { MachineService } from '../services/machine.service';
import { checkoutMachine } from '../machines/checkout.machine';

@Component({
  selector: 'app-checkout',
  standalone: true,
  template: `
    <div class="checkout">
      <h2>Checkout Flow</h2>
      <div class="steps">
        <div class="step" [class.active]="currentState() === 'selecting'">1. Select</div>
        <div class="step" [class.active]="currentState() === 'payment'">2. Payment</div>
        <div class="step" [class.active]="currentState() === 'confirming'">3. Confirm</div>
      </div>
      <div class="content">
        @switch (currentState()) {
          @case ('idle') {
            <p>Ready to start shopping!</p>
          }
          @case ('selecting') {
            <p>Select your products.</p>
          }
          @case ('payment') {
            <p>Enter payment details.</p>
          }
          @case ('confirming') {
            <p>Review your order.</p>
          }
          @case ('done') {
            <p>Order confirmed! Thank you.</p>
          }
        }
      </div>
      <div class="actions">
        @if (currentState() === 'idle') {
          <button (click)="send('START')">Start Checkout</button>
        }
        @if (currentState() === 'selecting') {
          <button (click)="send('SELECT_PRODUCT')">Continue to Payment</button>
          <button class="secondary" (click)="send('CANCEL')">Cancel</button>
        }
        @if (currentState() === 'payment') {
          <button (click)="send('PAY')">Pay Now</button>
          <button class="secondary" (click)="send('BACK')">Back</button>
        }
        @if (currentState() === 'confirming') {
          <button (click)="send('CONFIRM')">Confirm Order</button>
          <button class="secondary" (click)="send('BACK')">Back</button>
        }
        @if (currentState() === 'done') {
          <button (click)="send('START')">New Order</button>
        }
      </div>
    </div>
  `,
  styles: [`
    .checkout { background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .steps { display: flex; justify-content: center; gap: 1rem; margin: 1rem 0; }
    .step { padding: 6px 16px; border-radius: 999px; background: #e2e8f0; color: #64748b; font-size: 0.875rem; font-weight: 600; }
    .step.active { background: #6366f1; color: #fff; }
    .content { text-align: center; padding: 2rem; }
    .actions { display: flex; gap: 0.5rem; justify-content: center; }
    button { padding: 8px 20px; border: 1px solid #6366f1; background: #6366f1; color: #fff; border-radius: 6px; cursor: pointer; font-weight: 600; }
    button.secondary { background: #fff; color: #6366f1; }
  `]
})
export class CheckoutComponent implements OnDestroy {
  private readonly machineService = inject(MachineService);
  private actor: any = null;
  readonly currentState = signal('idle');

  constructor() {
    this.actor = this.machineService.createActorFrom(checkoutMachine);
    this.currentState.set(this.actor.getSnapshot().value);
    this.actor.subscribe((snapshot: any) => {
      this.currentState.set(snapshot.value);
    });
  }

  send(event: string) {
    this.actor?.send({ type: event });
  }

  ngOnDestroy() {
    this.actor?.stop();
  }
}
