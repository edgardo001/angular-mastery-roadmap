import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="card">
      <img [src]="product().image" [alt]="product().name" class="image" />
      <div class="body">
        <h3>{{ product().name }}</h3>
        <p class="price">{{ product().price | currency }}</p>

        <div class="actions">
          <button class="btn" (click)="addToCart.emit(product())">
            Agregar al carrito
          </button>
          <button class="btn secondary" (click)="viewDetails.emit(product().id)">
            Detalles
          </button>
        </div>

        @if (showQuantity()) {
          <div class="quantity">
            <label>Cantidad:</label>
            <input
              type="number"
              [value]="quantity()"
              (input)="quantityChange.emit(Number($event.target))"
              min="1"
            />
          </div>
        }
      </div>
    </div>
  `,
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
  // Signals API (nuevo en Angular 22)
  readonly product = input.required<Product>();
  readonly showQuantity = input(false);
  readonly quantity = input(1);

  readonly addToCart = output<Product>();
  readonly viewDetails = output<number>();
  readonly quantityChange = output<number>();

  protected readonly Number = Number;
}
