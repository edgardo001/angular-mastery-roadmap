import { Component, input } from '@angular/core';
import { Product } from '../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  template: `
    <div class="product-card">
      <h3>{{ product().name }}</h3>
      <p>Precio: {{ product().price }}</p>
    </div>
  `,
  styles: [`
    .product-card {
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
    }
    h3 { margin: 0 0 0.5rem; }
    p { margin: 0; color: #c3002f; font-weight: bold; }
  `]
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
}
