/**
 * COMPONENTE DE TARJETA DE PRODUCTO (ProductCardComponent)
 * =========================================================
 *
 * Muestra la información de un solo producto en una tarjeta.
 * Es como una "ficha de producto" en una tienda.
 *
 * ANÁLOGÍA: Es como una etiqueta de precio:
 * - Muestra el nombre del producto
 * - Muestra el precio
 * - Se repite para cada producto en la lista
 *
 * PALABRAS CLAVE:
 * - input.required<Product>(): Signal de entrada obligatoria
 * - product(): Lee el valor de la signal
 * - [product]="product": Pasa datos del padre al hijo
 *
 * DIFERENCIA ENTRE input() Y @Input():
 * - input() es la forma nueva (signals) - más rápida y tipada
 * - @Input() es la forma antigua (decoradores)
 * - input.required() obliga a pasar el dato (no puede ser undefined)
 */

// Component: Decorador del componente
// input: Herramienta nueva para recibir datos del componente padre
import { Component, input } from '@angular/core';

// Interfaz Product: Define la estructura del producto
import { Product } from '../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  template: `
    <div class="product-card">
      <!-- product().name: Lee el nombre de la signal product -->
      <h3>{{ product().name }}</h3>
      <!-- product().price: Lee el precio de la signal product -->
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
  // input.required<Product>(): Signal de entrada OBLIGATORIA
  // El componente padre DEBE pasar un producto
  // Si no lo pasa, Angular lanza un error
  readonly product = input.required<Product>();
}
