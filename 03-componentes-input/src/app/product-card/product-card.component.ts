// ──────────────────────────────────────────────
// product-card.component.ts — Tarjeta de producto (hijo)
// ──────────────────────────────────────────────
//
// Este componente demuestra la NUEVA API de signals para
// comunicación entre componentes en Angular 17+:
//
// - input(): recibe datos del padre (reemplaza @Input)
// - output(): envía eventos al padre (reemplaza @Output)
// - input.required(): input obligatorio
//
// Flujo de datos:
//   Padre → [product], [showQuantity], [quantity] → Hijo  (datos bajan)
//   Padre ← (addToCart), (viewDetails), (quantityChange) ← Hijo  (eventos suben)

import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

// Interface: define la forma de un producto
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
  // Debe importarse explícitamente en standalone components
  // Uso en template: {{ product().price | currency }} → "$1,499.00"
  imports: [CurrencyPipe],

  template: `
    <div class="card">
      <!--
        Property binding con signal:
        [src]="product().image" → accede al valor del signal product()
        product() es una FUNCIÓN que retorna el objeto Product
        Angular sabe cuándo llamarla y cuándo re-renderizar
      -->
      <img [src]="product().image" [alt]="product().name" class="image" />
      <div class="body">
        <!--
          Interpolación con signal:
          {{ product().name }} → "Laptop Pro"
          Cada vez que product() cambie, Angular actualiza el DOM
        -->
        <h3>{{ product().name }}</h3>

        <!--
          Pipe currency:
          {{ product().price | currency }} → "$1,499.00"
          El pipe formatea el número como moneda localizada
        -->
        <p class="price">{{ product().price | currency }}</p>

        <div class="actions">
          <!--
            Event binding + output():
            (click)="addToCart.emit(product())" → emite el objeto Product al padre
            El padre recibe el evento en: (addToCart)="onAddToCart($event)"
          -->
          <button class="btn" (click)="addToCart.emit(product())">
            Agregar al carrito
          </button>

          <!--
            Event binding + output():
            (click)="viewDetails.emit(product().id)" → emite solo el ID
            El padre recibe: (viewDetails)="onViewDetails($event)"
          -->
          <button class="btn secondary" (click)="viewDetails.emit(product().id)">
            Detalles
          </button>
        </div>

        <!--
          @if control flow:
          Renderiza el input de cantidad SOLO si showQuantity() es true
          showQuantity() es un signal que el padre puede configurar
        -->
        @if (showQuantity()) {
          <div class="quantity">
            <label>Cantidad:</label>
            <!--
              Input de cantidad:
              [value]="quantity()" → muestra el valor actual del signal
              (input)="quantityChange.emit(Number($event.target))" → emite el nuevo valor
              Number() convierte el string del input a number
            -->
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
  // INPUTS (datos que vienen del padre)
  // ═══════════════════════════════════════════════════════════════
  //
  // input() y input.required() son signals que Angular gestiona.
  // El padre pasa datos con property binding: [product]="product"
  //
  // Diferencia con @Input():
  // - input() retorna un Signal<T>, no una propiedad directa
  // - Se accede con product() en el template (paréntesis)
  // - Angular sabe automáticamente cuándo cambió (reactividad)

  // input.required<Product>(): input OBLIGATORIO de tipo Product
  // Si el padre no pasa [product], Angular lanza error en compilación
  //
  // Uso en template: product().image, product().name, product().price
  readonly product = input.required<Product>();

  // input(false): input OPCIONAL con valor por defecto false
  // Si el padre no pasa [showQuantity], se usa false
  //
  // Uso en template: @if (showQuantity()) { ... }
  readonly showQuantity = input(false);

  // input(1): input OPCIONAL con valor por defecto 1
  // Se usa para la cantidad de productos
  readonly quantity = input(1);

  // ═══════════════════════════════════════════════════════════════
  // OUTPUTS (eventos que van al padre)
  // ═══════════════════════════════════════════════════════════════
  //
  // output() crea un EventEmitter tipado.
  // Se usa con .emit() para enviar datos al padre.
  //
  // El padre escucha con event binding:
  //   (addToCart)="onAddToCart($event)"
  //   (viewDetails)="onViewDetails($event)"

  // output<Product>(): emite un objeto Product cuando el usuario
  // hace click en "Agregar al carrito"
  readonly addToCart = output<Product>();

  // output<number>(): emite el ID del producto (number)
  // cuando el usuario hace click en "Detalles"
  readonly viewDetails = output<number>();

  // output<number>(): emite la nueva cantidad (number)
  // cuando el usuario cambia el input de cantidad
  readonly quantityChange = output<number>();

  // ═══════════════════════════════════════════════════════════════
  // UTILIDADES
  // ═══════════════════════════════════════════════════════════════
  //
  // Number: referencia al constructor Number global
  // Se expone para usarlo en el template:
  //   (input)="quantityChange.emit(Number($event.target))"
  //
  // ¿Por qué? $event.target es un HTMLElement, no un número.
  // Number() convierte el valor string del input a number.
  protected readonly Number = Number;
}
