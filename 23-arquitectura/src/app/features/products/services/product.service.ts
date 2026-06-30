/**
 * SERVICIO DE PRODUCTOS (ProductService)
 * =======================================
 *
 * Gestiona la lista de productos (CRUD básico).
 * Es como un "catálogo de productos" que se puede modificar.
 *
 * ANÁLOGÍA: Es como un inventario de tienda:
 * - addProduct(): Agrega un producto nuevo
 * - removeProduct(): Elimina un producto
 * - products: Lista de todos los productos
 *
 * PALABRAS CLAVE:
 * - signal(): Variable reactiva que Angular vigila
 * - asReadonly(): Signal solo lectura desde fuera
 * - .update(): Actualiza el valor basándose en el anterior
 * - .filter(): Crea un nuevo array sin los elementos que no cumplan la condición
 *
 * PATRÓN DE SEGURIDAD:
 * - _products: Signal privada (solo modificable internamente)
 * - products: Signal pública solo lectura (los componentes solo leen)
 */

// Injectable, signal: Herramientas de Angular
import { Injectable, signal } from '@angular/core';

// Interfaz que define la estructura de un producto
export interface Product {
  id: number;
  name: string;
  price: number;
}

// providedIn: 'root': Singleton global
@Injectable({ providedIn: 'root' })
export class ProductService {
  // Signal privada con la lista de productos
  private readonly _products = signal<Product[]>([]);

  // Signal pública solo lectura
  readonly products = this._products.asReadonly();

  // addProduct(): Agrega un nuevo producto al catálogo
  addProduct(product: Product): void {
    // .update(): Toma el array actual y agrega el nuevo producto
    // [...list, product]: Spread operator + nuevo elemento
    this._products.update(list => [...list, product]);
  }

  // removeProduct(): Elimina un producto por su ID
  removeProduct(id: number): void {
    // .filter(): Crea un nuevo array sin el producto con el ID especificado
    this._products.update(list => list.filter(p => p.id !== id));
  }
}
