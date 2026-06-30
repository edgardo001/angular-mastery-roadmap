// ──────────────────────────────────────────────
// product-card.component.ts — Tarjeta de producto (hijo)
// ──────────────────────────────────────────────
//
// Este componente demuestra la comunicación padre ↔ hijo en Angular.
//
// Conceptos clave:
// - input(): recibe datos del padre (como un hijo que escucha instrucciones)
// - output(): envía eventos al padre (como un hijo que reporta resultados)
//
// Analogía: Piensa en un MESERO en un restaurante:
//   - El MESERO (hijo) recibe instrucciones del MAESTRO (padre):
//     "Muestra esta mesa" → input product
//     "Muestra el menú" → input showQuantity
//   - El MESERO le reporta al MAESTRO cuando el cliente pide algo:
//     "El cliente quiere esto" → output addToCart
//     "¿Qué mesa es?" → output viewDetails
//
// Flujo de datos (unidireccional):
//   Padre → [product], [showQuantity], [quantity] → Hijo  (datos bajan)
//   Padre ← (addToCart), (viewDetails), (quantityChange) ← Hijo  (eventos suben)
//
// En Angular, los datos fluyen en UNA sola dirección:
//   - El padre manda datos AL hijo con [property]
//   - El hijo notifica AL padre con (event)
//   - NUNCA el hijo modifica datos del padre directamente

// import: trae decoradores y funciones de Angular core
// Component: decorador que define un componente Angular
// input: función para crear inputs (datos que el padre pasa al hijo)
// output: función para crear outputs (eventos que el hijo envía al padre)
import { Component, input, output } from '@angular/core';

// import: trae CurrencyPipe de Angular Common
// Pipe: transforma datos en el template (ej: número → moneda formateada)
// CurrencyPipe: convierte 1499 en "$1,499.00"
import { CurrencyPipe } from '@angular/common';

// interface: define la FORMA de un objeto (qué propiedades tiene y de qué tipo)
// Es como un PLANO DE CONSTRUCCIÓN: dice "un producto tiene id, name, price, image"
// Se exporta para que otros archivos (como app.component.ts) puedan importarla
// y saber qué estructura tiene un objeto Product
export interface Product {
  id: number;      // identificador único del producto
  name: string;    // nombre del producto
  price: number;   // precio en dólares
  image: string;   // URL de la imagen del producto
}

// @Component: decorador que le dice a Angular "esta clase es un componente"
// Configura: selector, template, estilos, imports, etc.
@Component({
  // selector: el nombre HTML que se usa para insertar este componente
  // <app-product-card></app-product-card> se usa en el template del padre
  selector: 'app-product-card',

  // standalone: true → este componente es independiente (no necesita NgModule)
  // Puede importar lo que necesite directamente
  standalone: true,

  // imports: lista de dependencias que este componente USA en su template
  // CurrencyPipe se usa con {{ product.price | currency }}
  // Si no lo importas, Angular no sabe qué hacer con "| currency"
  imports: [CurrencyPipe],

  // template: el HTML que se renderiza para este componente
  // Es como el "diseño" de la tarjeta de producto
  template: `
    <div class="card">
      <!--
        [src]="product().image" → PROPERTY BINDING
        Le digo al navegador: "pon la imagen que está en product().image"
        
        product() es una FUNCIÓN (así funcionan los inputs modernos de Angular)
        Returns: el objeto Product que el padre pasó con [product]="..."
        
        [alt]="product().name" → el texto alternativo de la imagen
        Es importante para accesibilidad (lectores de pantalla)
      -->
      <img [src]="product().image" [alt]="product().name" class="image" />
      <div class="body">
        <!--
          {{ product().name }} → INTERPOLACIÓN DE TEMPLATE
          Muestra el valor de product().name directamente en el HTML
          Las llaves {{ }} insertion dinámicamente datos en el template
        -->
        <h3>{{ product().name }}</h3>

        <!--
          {{ product().price | currency }} → PIPE DE TRANSFORMACIÓN
          El pipe | currency convierte 1499 en "$1,499.00"
          Es como una "licuadora": toma un dato crudo y lo transforma
        -->
        <p class="price">{{ product().price | currency }}</p>

        <div class="actions">
          <!--
            (click)="addToCart.emit(product())" → EVENT BINDING
            El (click) escucha el evento click del botón
            Cuando ocurre, ejecuta addToCart.emit(product())
            
            emit(): función de output() que ENVÍA datos al padre
            Le dice al padre: "oye, el usuario hizo click con este producto"
            
            El padre escucha con: (addToCart)="onAddToCart($event)"
          -->
          <button class="btn" (click)="addToCart.emit(product())">
            Agregar al carrito
          </button>

          <!--
            (click)="viewDetails.emit(product().id)" → aviso al padre
            En este caso, solo envío el ID (número), no el producto completo
            El padre decide qué hacer con ese ID (ver detalles, etc.)
          -->
          <button class="btn secondary" (click)="viewDetails.emit(product().id)">
            Detalles
          </button>
        </div>

        <!--
          @if (showQuantity()) → DIRECTIVA DE CONTROL DE FLUJO
          Solo muestro el input de cantidad SI showQuantity() es true
          
          showQuantity() es un input del padre
          Si el padre pasa [showQuantity]="true", se muestra
          Si el padre pasa [showQuantity]="false" o no pasa nada, NO se muestra
        -->
        @if (showQuantity()) {
          <div class="quantity">
            <label>Cantidad:</label>
            <!--
              [value]="quantity()" → muestra el valor actual del input quantity
              (input)="quantityChange.emit(Number($event.target.value))" → aviso al padre
              
              $event: contiene los datos del evento del navegador
              $event.target.value: el valor del input HTML (siempre es string)
              Number(): convierte el string a número antes de enviarlo al padre
              
              quantityChange es un output<number> que emite la nueva cantidad
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

  // styles: CSS que se aplica SOLO a este componente (estilos "scoped")
  // No afecta a otros componentes de la app
  // Es como tener tu propio "cuarto de pintura" que no ensucia la casa
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
  // Los inputs son como "instrucciones" que el padre me da.
  // El padre los pasa con property binding: [product]="product"
  // Yo los recibo con input() o input.required()
  //
  // Analogía: Es como un MESERO que recibe una ORDEN:
  //   - "Muestra esta mesa" → input product (obligatorio)
  //   - "Muestra el menú" → input showQuantity (opcional, default: false)
  //   - "Sirve 1 plato" → input quantity (opcional, default: 1)

  // input.required<Product>(): input OBLIGATORIO de tipo Product
  // Si el padre NO pasa [product], Angular lanza un error en consola
  // "required" significa que NO tiene valor por defecto
  // El tipo <Product> le dice a TypeScript qué estructura tiene el objeto
  //
  // En el template se usa como: product() (es una función)
  readonly product = input.required<Product>();

  // input(false): input OPCIONAL con valor por defecto false
  // Si el padre no pasa [showQuantity], se usa false (no se muestra el input de cantidad)
  // El valor entre paréntesis es el DEFAULT (valor por defecto)
  readonly showQuantity = input(false);

  // input(1): input OPCIONAL con valor por defecto 1
  // Si el padre no pasa [quantity], se usa 1
  // El padre puede cambiarlo con: [quantity]="miCantidad"
  readonly quantity = input(1);

  // ═══════════════════════════════════════════════════════════════
  // OUTPUTS: eventos que le aviso al padre
  // ═══════════════════════════════════════════════════════════════
  //
  // Los outputs son como "reportes" que le envío al padre.
  // Yo los activo con .emit() y el padre los escucha con (event)
  //
  // Analogía: Es como un MESERO que REPORTA al MAESTRO:
  //   - "El cliente quiere esto" → output addToCart (envía Product)
  //   - "¿Qué mesa es?" → output viewDetails (envía number)
  //   - "Cambiaron la cantidad" → output quantityChange (envía number)

  // output<Product>(): crea un output que emite un objeto Product
  // El padre lo escucha con: (addToCart)="onAddToCart($event)"
  // $event será el objeto Product completo
  readonly addToCart = output<Product>();

  // output<number>(): crea un output que emite un número (el ID del producto)
  // Enviar solo el ID es más eficiente que enviar todo el objeto
  readonly viewDetails = output<number>();

  // output<number>(): crea un output que emite un número (la nueva cantidad)
  // Se activa cuando el usuario cambia el valor del input de cantidad
  readonly quantityChange = output<number>();

  // Number: referencia a la función global Number() de JavaScript
  // Se usa en el template para convertir strings a números
  // Ejemplo: Number("5") → 5
  // Se declara como propiedad protegida para que el template pueda acceder a ella
  // "protected" significa que solo este componente y sus hijos pueden usarla
  protected readonly Number = Number;
}
