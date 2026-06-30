/**
 * PÁGINA DE LISTA DE PRODUCTOS (ProductListPage)
 * ================================================
 *
 * Muestra todos los productos en una cuadrícula.
 * Es como el "catálogo" de una tienda en línea.
 *
 * ANÁLOGÍA: Es como una estantería de tienda:
 * - Cada producto es una "tarjeta" en la estantería
 * - Los productos se muestran en cuadrícula (grid)
 * - Cada tarjeta muestra nombre y precio
 *
 * PALABRAS CLAVE:
 * - @for: Nuevo syntax de Angular 17+ para iterar arrays
 * - track: Obligatorio en @for - ayuda a Angular a identificar cambios
 * - [product]="product": Pasa datos del padre al hijo (input)
 * - app-product-card: Componente hijo que muestra un producto
 *
 * FLUJO:
 * 1. ProductService provee la lista de productos
 * 2. @for itera sobre cada producto
 * 3. Para cada producto, crea un ProductCardComponent
 * 4. Pasa el producto como input al componente hijo
 */

// Component: Decorador del componente
import { Component } from '@angular/core';

// Servicio que contiene la lista de productos
import { ProductService } from '../services/product.service';

// Componente hijo que muestra un solo producto
import { ProductCardComponent } from '../components/product-card.component';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  // ProductCardComponent se importa para usarlo en el template
  imports: [ProductCardComponent],
  template: `
    <div class="product-list">
      <h2>Productos</h2>
      <div class="grid">
        <!-- @for: Itera sobre la lista de productos -->
        <!-- track product.id: Obligatorio - le dice a Angular cómo identificar cada producto -->
        @for (product of productService.products(); track product.id) {
          <!-- [product]="product": Pasa el producto como input al componente hijo -->
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
  // protected: Visible en el template pero no fuera del componente
  // readonly: No se puede reasignar
  constructor(protected readonly productService: ProductService) {}
}
