// ──────────────────────────────────────────────
// app.component.ts — Componente padre (raíz)
// ──────────────────────────────────────────────
//
// AppComponent es el COMPONENTE PADRE que contiene y controla
// los ProductCardComponent hijos. Demuestra:
//
// 1. Cómo pasar datos a hijos con property binding [property]
// 2. Cómo recibir eventos de hijos con event binding (event)
// 3. Cómo manejar el estado de la aplicación
// 4. Uso de @for para renderizar una lista de componentes
//
// Flujo de datos:
//   AppComponent → [product], [showQuantity] → ProductCardComponent
//   AppComponent ← (addToCart), (viewDetails), (quantityChange) ← ProductCardComponent

import { Component } from '@angular/core';
import { ProductCardComponent, Product } from './product-card/product-card.component';

@Component({
  selector: 'app-root',
  standalone: true,

  // imports: lista de componentes hijos que este componente usa
  // ProductCardComponent se usa múltiples veces en el template
  imports: [ProductCardComponent],

  template: `
    <h1>Catálogo de Productos</h1>
    <p class="subtitle">Demostración de <code>input()</code>, <code>output()</code> y <code>model()</code></p>

    <div class="grid">
      <!--
        @for control flow:
        Itera sobre el array products y crea un ProductCardComponent
        por cada producto. track product.id es obligatorio para
        que Angular optimice el DOM (solo re-renderiza lo que cambió)
      -->
      @for (product of products; track product.id) {
        <!--
          Property binding: pasa datos del padre al hijo
          [product]="product" → el hijo recibe el objeto Product
          [showQuantity]="true" → el hijo muestra el input de cantidad

          Event binding: el hijo notifica al padre
          (addToCart)="onAddToCart($event)" → recibe un Product
          (viewDetails)="onViewDetails($event)" → recibe un number (id)
          (quantityChange)="onQuantityChange($event)" → recibe un number (qty)
        -->
        <app-product-card
          [product]="product"
          [showQuantity]="true"
          (addToCart)="onAddToCart($event)"
          (viewDetails)="onViewDetails($event)"
          (quantityChange)="onQuantityChange($event)"
        />
      }
    </div>

    <!--
      @if control flow:
      Renderiza el log SOLO si lastAction tiene contenido
      lastAction se actualiza cuando el usuario interactúa con los hijos
    -->
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
  // ─── Estado de la aplicación ───
  // readonly: el array de productos no cambia después de inicializarse
  // En una app real, esto vendría de una API o servicio
  readonly products: Product[] = [
    { id: 1, name: 'Laptop Pro', price: 1499, image: 'https://picsum.photos/seed/laptop/400/300' },
    { id: 2, name: 'Teclado Mecánico', price: 129, image: 'https://picsum.photos/seed/keyboard/400/300' },
    { id: 3, name: 'Monitor 4K', price: 599, image: 'https://picsum.photos/seed/monitor/400/300' },
  ];

  // lastAction: almacena la última acción del usuario
  // Se muestra en el template con @if (lastAction)
  lastAction = '';

  // ─── Manejo de eventos de los hijos ───
  //
  // Estos métodos se ejecutan cuando un hijo emite un evento.
  // Cada método recibe el dato que el hijo envió con output().emit()
  //
  // Flujo:
  // 1. Usuario hace click en "Agregar al carrito" (hijo)
  // 2. Hijo ejecuta: addToCart.emit(product())
  // 3. Angular detecta: (addToCart)="onAddToCart($event)"
  // 4. Padre ejecuta onAddToCart(product)

  // Recibe un Product completo del hijo
  onAddToCart(product: Product) {
    this.lastAction = `"${product.name}" agregado al carrito — $${product.price}`;
  }

  // Recibe solo el ID (number) del hijo
  onViewDetails(id: number) {
    this.lastAction = `Ver detalles del producto #${id}`;
  }

  // Recibe la nueva cantidad (number) del hijo
  onQuantityChange(qty: number) {
    this.lastAction = `Cantidad cambiada a: ${qty}`;
  }
}
