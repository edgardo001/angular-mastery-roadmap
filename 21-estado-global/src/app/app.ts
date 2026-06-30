/**
 * COMPONENTE PRINCIPAL CON ESTADO GLOBAL (App)
 * =============================================
 *
 * Demuestra cómo usar NgRx Signals Store para manejar estado global.
 * El carrito y el tema son "stores" compartidos entre componentes.
 *
 * ANÁLOGÍA: Es como una tienda en línea:
 * - El carrito (CartStore) es como el carrito de Amazon
 * - El tema (ThemeStore) es como el modo oscuro/claro de la app
 * - Los productos son como los artículos de la tienda
 *
 * PALABRAS CLAVE:
 * - inject(): Obtiene servicios del contenedor de inyección
 * - inject(CartStore): Obtiene el store del carrito
 * - inject(ThemeStore): Obtiene el store del tema
 * - store.method(): Llama a un método del store para modificar el estado
 * - store.signal(): Lee el valor actual de una signal del store
 */

// Component: Decorador del componente
import { Component, inject } from '@angular/core';

// Stores de estado global (NgRx Signals)
import { CartStore } from './stores/cart.store';
import { ThemeStore } from './stores/theme.store';

// Interfaz que define la estructura de un producto
interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // inject(): Obtiene los stores del contenedor de inyección
  // Los stores son singletons: UNA sola instancia para toda la app
  readonly cart = inject(CartStore);
  readonly theme = inject(ThemeStore);

  // Lista de productos disponibles (datos de ejemplo)
  products: Product[] = [
    { id: 1, name: 'Angular T-Shirt', price: 25 },
    { id: 2, name: 'Signals Mug', price: 12 },
    { id: 3, name: 'NgRx Hoodie', price: 45 },
    { id: 4, name: 'Reactive Stickers', price: 5 },
  ];

  // Método que agrega un producto al carrito
  addProduct(product: Product) {
    // Llama al método addItem del CartStore
    // El store actualiza el estado y lo persiste en localStorage
    this.cart.addItem(product);
  }
}
