// ──────────────────────────────────────────────
// product-card.component.ts — Tarjeta de producto (hijo)
// ──────────────────────────────────────────────
//
// Este componente demuestra la comunicación entre componentes:
//
// - input(): recibe datos del padre
// - output(): envía eventos al padre
//
// Flujo de datos:
//   Padre → [product], [showQuantity], [quantity] → Hijo  (datos bajan)
//   Padre ← (addToCart), (viewDetails), (quantityChange) ← Hijo  (eventos suben)

import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

// interface: define la forma de un producto
// Se exporta para que el padre pueda importarla
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-product-card',
  standalone: true,

  // CurrencyPipe: pipe para formatear números como moneda
  // Uso en template: {{ product.price | currency }} → "$1,499.00"
  imports: [CurrencyPipe],

  template: `
    <div class="card">
      <!--
        [src]="product().image" → le digo al navegador:
        "pon la imagen que está en product().image"

        product() es una función que retorna el objeto Product
      -->
      <img [src]="product().image" [alt]="product().name" class="image" />
      <div class="body">
        <!-- {{ product().name }} → muestra el nombre del producto -->
        <h3>{{ product().name }}</h3>

        <!-- {{ product().price | currency }} → precio formateado: $1,499.00 -->
        <p class="price">{{ product().price | currency }}</p>

        <div class="actions">
          <!--
            (click)="addToCart.emit(product())" → cuando hacen click:
            1. llamo a addToCart.emit() para avisar al padre
            2. le paso el producto completo
          -->
          <button class="btn" (click)="addToCart.emit(product())">
            Agregar al carrito
          </button>

          <!--
            (click)="viewDetails.emit(product().id)" → aviso al padre
            con solo el ID del producto
          -->
          <button class="btn secondary" (click)="viewDetails.emit(product().id)">
            Detalles
          </button>
        </div>

        <!-- @if (showQuantity()) → solo muestro esto SI showQuantity() es true -->
        @if (showQuantity()) {
          <div class="quantity">
            <label>Cantidad:</label>
            <!--
              [value]="quantity()" → muestra el valor actual
              (input)="quantityChange.emit(Number($event.target.value))" → aviso al padre
            -->
            <input
              type="number"
              [value]="quantity()"
              (input)="quantityChange.emit(Number($event.target.value))"
              min="1"
            />
          </div>
        }
      </div>
    </div>
  `,

  // Estilos scoped: solo se aplican a ESTE componente
  styles: [`
    .card { border-radius: 12px; overflow: hidden; background: white; box-shadow: 0 2px 8px rgba(0,0,0,.1); }
    .image { width: 100%; height: 180px; object-fit: cover; }
    .body { padding: 1rem; }
    h3 { margin: 0 0 .25rem; font-size: 1.1rem; }
    .price { font-size: 1.25rem; font-weight: 700; color: #667eea; margin-bottom: .75rem; }
    .actions { display: flex; gap: .5rem; }
    .btn { flex: 1; padding: .5rem; border: none; border-radius: 6px;
           cursor: pointer; font-size: .875rem; background: #667eea; color: white; font-weight: 600; }
    .btn:hover { opacity: .85; }
    .secondary { background: transparent; border: 1px solid #667eea; color: #667eea; }
    .quantity { margin-top: .75rem; display: flex; align-items: center; gap: .5rem; }
    .quantity input { width: 70px; padding: .25rem; border: 1px solid #ccc; border-radius: 4px; }
  `]
})
export class ProductCardComponent {
  // ═══════════════════════════════════════════════════════════════
  // INPUTS: datos que recibo del padre
  // ═══════════════════════════════════════════════════════════════
  //
  // El padre me pasa datos con property binding: [product]="product"
  // Yo los recibo con input() o input.required()

  // input.required<Product>(): input OBLIGATORIO de tipo Product
  // Si el padre no pasa [product], Angular lanza error
  readonly product = input.required<Product>();

  // input(false): input OPCIONAL con valor por defecto false
  // Si el padre no pasa [showQuantity], se usa false
  readonly showQuantity = input(false);

  // input(1): input OPCIONAL con valor por defecto 1
  readonly quantity = input(1);

  // ═══════════════════════════════════════════════════════════════
  // OUTPUTS: eventos que le aviso al padre
  // ═══════════════════════════════════════════════════════════════
  //
  // Yo le aviso al padre con .emit()
  // El padre escucha con event binding: (addToCart)="onAddToCart($event)"

  // output<Product>(): emite un objeto Product
  readonly addToCart = output<Product>();

  // output<number>(): emite el ID del producto
  readonly viewDetails = output<number>();

  // output<number>(): emite la nueva cantidad
  readonly quantityChange = output<number>();

  // Number: se usa para convertir el valor del input a número
  protected readonly Number = Number;
}
