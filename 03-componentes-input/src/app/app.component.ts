// ──────────────────────────────────────────────
// app.component.ts — Componente padre (raíz)
// ──────────────────────────────────────────────
//
// AppComponent es el COMPONENTE PADRE que contiene y controla
// los ProductCardComponent hijos.
//
// Flujo de datos:
//   AppComponent → [product], [showQuantity] → ProductCardComponent
//   AppComponent ← (addToCart), (viewDetails), (quantityChange) ← ProductCardComponent

import { Component } from '@angular/core';
import { ProductCardComponent, Product } from './product-card/product-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductCardComponent],

  template: `
    <h1>Catálogo de Productos</h1>

    <div class="grid">
      <!--
        @for → por cada producto, creo un <app-product-card>
        y le paso datos con [property]
        y escucho eventos con (event)
      -->
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

    <!-- @if → solo muestro esto si hay una acción -->
    @if (lastAction) {
      <div class="log">{{ lastAction }}</div>
    }
  `,

  styles: [`
    h1 { text-align: center; margin-bottom: 2rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; max-width: 900px; margin: 0 auto; }
    .log { max-width: 900px; margin: 2rem auto 0; padding: 1rem; background: #e3f2fd; border-radius: 8px; font-size: .875rem; }
  `]
})
export class AppComponent {
  // ─── DATOS ───
  // Lista de productos (en una app real vendría de una API)
  readonly products: Product[] = [
    { id: 1, name: 'Laptop Pro', price: 1499, image: 'https://picsum.photos/seed/laptop/400/300' },
    { id: 2, name: 'Teclado Mecánico', price: 129, image: 'https://picsum.photos/seed/keyboard/400/300' },
    { id: 3, name: 'Monitor 4K', price: 599, image: 'https://picsum.photos/seed/monitor/400/300' },
  ];

  // lastAction: almacena la última acción del usuario
  lastAction = '';

  // ─── MANEJO DE EVENTOS ───
  // Estos métodos se ejecutan cuando un hijo emite un evento

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
