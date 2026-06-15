import { Component } from '@angular/core';
import { ProductCardComponent, Product } from './product-card/product-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <h1>Catálogo de Productos</h1>
    <p class="subtitle">Demostración de <code>input()</code>, <code>output()</code> y <code>model()</code></p>

    <div class="grid">
      @for (product of products; track product.id) {
        <app-product-card
          [product]="product"
          [showQuantity]="true"
          (addToCart)="onAddToCart($event)"
          (viewDetails)="onViewDetails($event)"
          (quantityChange)="onQuantityChange($event)"
        />
      }
    </div>

    @if (lastAction) {
      <div class="log">
        <strong>Última acción:</strong> {{ lastAction }}
      </div>
    }
  `,
  styles: [`
    h1 { text-align: center; margin-bottom: .25rem; }
    .subtitle { text-align: center; color: #666; margin-bottom: 2rem; }
    code { background: #e8e8e8; padding: .125rem .375rem; border-radius: 4px; font-size: .875rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; max-width: 900px; margin: 0 auto; }
    .log { max-width: 900px; margin: 2rem auto 0; padding: 1rem; background: #e3f2fd; border-radius: 8px; font-size: .875rem; }
  `]
})
export class AppComponent {
  readonly products: Product[] = [
    { id: 1, name: 'Laptop Pro', price: 1499, image: 'https://picsum.photos/seed/laptop/400/300' },
    { id: 2, name: 'Teclado Mecánico', price: 129, image: 'https://picsum.photos/seed/keyboard/400/300' },
    { id: 3, name: 'Monitor 4K', price: 599, image: 'https://picsum.photos/seed/monitor/400/300' },
  ];

  lastAction = '';

  onAddToCart(product: Product) {
    this.lastAction = `"${product.name}" agregado al carrito — $${product.price}`;
  }

  onViewDetails(id: number) {
    this.lastAction = `Ver detalles del producto #${id}`;
  }

  onQuantityChange(qty: number) {
    this.lastAction = `Cantidad cambiada a: ${qty}`;
  }
}
