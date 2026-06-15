import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from '../components/product-card.component';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <div class="product-list">
      <h2>Productos</h2>
      <div class="grid">
        @for (product of productService.products(); track product.id) {
          <app-product-card [product]="product" />
        }
      </div>
    </div>
  `,
  styles: [`
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
  `]
})
export class ProductListPage {
  constructor(protected readonly productService: ProductService) {}
}
