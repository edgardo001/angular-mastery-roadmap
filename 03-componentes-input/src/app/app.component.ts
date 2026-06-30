// ──────────────────────────────────────────────
// app.component.ts — Componente padre (raíz)
// ──────────────────────────────────────────────
//
// AppComponent es el COMPONENTE PADRE que contiene y controla
// los ProductCardComponent hijos.
//
// En Angular, la app se organiza como un ÁRBOL de componentes:
//   AppComponent (raíz)
//     ├── ProductCardComponent (hijo 1)
//     ├── ProductCardComponent (hijo 2)
//     └── ProductCardComponent (hijo 3)
//
// Analogía: Piensa en un RESTAURANTE:
//   - AppComponent es el MAESTRO CEREMONIAS que coordina todo
//   - Cada ProductCardComponent es un MESERO que atiende una mesa
//   - El maestro les dice qué mostrar ([product]) y los meseros
//     le avisan cuando el cliente quiere algo ((addToCart), etc.)
//
// Flujo de datos (unidireccional — hacia abajo y hacia arriba):
//   AppComponent → [product], [showQuantity] → ProductCardComponent  (datos bajan)
//   AppComponent ← (addToCart), (viewDetails), (quantityChange) ← ProductCardComponent  (eventos suben)

// import: trae el decorador @Component de Angular
// @Component: decorator que le dice a Angular "esta clase es un componente"
// Sin este decorador, Angular no sabría cómo renderizar la clase
import { Component } from '@angular/core';

// import: trae el componente hijo (ProductCardComponent) y su interfaz (Product)
// ProductCardComponent: el componente que se repite por cada producto
// Product: la forma (estructura) que tiene un objeto producto
// Se importa el HIJO porque el padre lo USA en su template
import { ProductCardComponent, Product } from './product-card/product-card.component';

// @Component: decorador que configura el componente
// Le dice a Angular: "esta clase es un componente, así es como se ve y se comporta"
@Component({
  // selector: el nombre HTML que se usa para insertar este componente en un template
  // <app-root></app-root> en el index.html es donde se renderiza todo
  selector: 'app-root',

  // standalone: true → este componente NO necesita un módulo NgModule
  // En Angular moderno, los componentes standalone se importan directamente
  // Es como decir "soy independiente, no necesito un grupo para funcionar"
  standalone: true,

  // imports: lista de componentes/pipes/directivas que este componente USA
  // Si usas un componente hijo en tu template, DEBES importarlo aquí
  // Es como decir "necesito estas herramientas para trabajar"
  imports: [ProductCardComponent],

  // template: el HTML que se renderiza para este componente
  // Es como el "plano de construcción" del componente
  template: `
    <h1>Catálogo de Productos</h1>

    <div class="grid">
      <!--
        @for → bucle que repite un elemento por cada item de una lista
        product: variable temporal que representa cada producto en la iteración
        of products: recorre el array 'products' definido en la clase
        track product.id: le dice a Angular cómo identificar cada elemento único
        (mejora el rendimiento al actualizar la lista)
      -->
      @for (product of products; track product.id) {
        <!--
          <app-product-card>: inserta el componente hijo
          [product]="product": PROPERTY BINDING — le paso datos al hijo
            - El [ ] significa "estoy enlazando una propiedad"
            - product es el nombre de la propiedad en el hijo
            - "product" (sin []) es la variable del @for
          [showQuantity]="true": le digo al hijo que muestre el selector de cantidad
          (addToCart)="onAddToCart($event)": EVENT BINDING — escucho eventos del hijo
            - El ( ) significa "estoy escuchando un evento"
            - addToCart es el nombre del output que el hijo emite
            - $event contiene los datos que el hijo envía (el objeto Product)
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
      @if: directiva de control de flujo — solo muestra el contenido SI la condición es verdadera
      lastAction: si está vacío (''), NO se muestra nada
      Es como un interruptor: prendido = se ve, apagado = no se ve
    -->
    @if (lastAction) {
      <div class="log">{{ lastAction }}</div>
    }
  `,

  // styles: CSS que se aplica SOLO a este componente (estilos "scoped")
  // No afecta a otros componentes de la app
  // Es como tener tu propio "cuarto de pintura" que no ensucia la casa
  styles: [`
    h1 { text-align: center; margin-bottom: 2rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; max-width: 900px; margin: 0 auto; }
    .log { max-width: 900px; margin: 2rem auto 0; padding: 1rem; background: #e3f2fd; border-radius: 8px; font-size: .875rem; }
  `]
})
export class AppComponent {
  // ─── DATOS ───
  // readonly: significa que la referencia NO se puede reasignar
  // (pero SÍ se puede modificar el contenido del array con push, filter, etc.)
  //
  // products: array de objetos Product que se muestra en la tarjeta
  // En una app real, esto vendría de una API (fetch, HttpClient, etc.)
  // Aquí hardcodeamos los datos para simplificar el ejemplo
  //
  // Product[]: tipo TypeScript que dice "es un array de objetos Product"
  // Cada objeto tiene: id (number), name (string), price (number), image (string)
  readonly products: Product[] = [
    { id: 1, name: 'Laptop Pro', price: 1499, image: 'https://picsum.photos/seed/laptop/400/300' },
    { id: 2, name: 'Teclado Mecánico', price: 129, image: 'https://picsum.photos/seed/keyboard/400/300' },
    { id: 3, name: 'Monitor 4K', price: 599, image: 'https://picsum.photos/seed/monitor/400/300' },
  ];

  // lastAction: string que almacena la descripción de la última acción del usuario
  // Se muestra en pantalla cuando cambia (debido a @if en el template)
  // En una app real, esto podría ser un servicio de notificaciones
  lastAction = '';

  // ─── MANEJO DE EVENTOS ───
  // Estos métodos se ejecutan cuando un hijo emite un evento
  // Reciben los datos que el hijo envía con .emit()
  // Son como "escuchadores de radio": el hijo habla, el padre escucha y responde

  // onAddToCart: se ejecuta cuando el usuario hace click en "Agregar al carrito"
  // Recibe el objeto Product completo del hijo
  // Actualiza lastAction para mostrar un mensaje al usuario
  onAddToCart(product: Product) {
    this.lastAction = `"${product.name}" agregado al carrito — $${product.price}`;
  }

  // onViewDetails: se ejecuta cuando el usuario hace click en "Detalles"
  // Recibe solo el ID del producto (número)
  // En una app real, aquí navegarías a la página de detalles del producto
  onViewDetails(id: number) {
    this.lastAction = `Ver detalles del producto #${id}`;
  }

  // onQuantityChange: se ejecuta cuando el usuario cambia la cantidad
  // Recibe el nuevo valor (número) del input de cantidad
  // En una app real, aquí actualizarías el carrito de compras
  onQuantityChange(qty: number) {
    this.lastAction = `Cantidad cambiada a: ${qty}`;
  }
}
