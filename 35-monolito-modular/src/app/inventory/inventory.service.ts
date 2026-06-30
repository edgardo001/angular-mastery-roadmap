/**
 * Servicio del módulo de Inventario.
 *
 * Implementa InventoryServiceContract y maneja el stock de productos.
 * Incluye datos iniciales de ejemplo (Widget A y Widget B).
 *
 * El servicio de inventario es independiente de órdenes y facturación.
 * Cada módulo vive en su propia "burbuja" y se comunica por interfaces.
 *
 * Analogía: Es como el almacén de una tienda. Sabe cuántos productos hay,
 * pero no sabe cuántas órdenes se han hecho o cuántas facturas se han emitido.
 */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InventoryServiceContract, InventoryItem } from '../shared';

@Injectable()
export class InventoryService implements InventoryServiceContract {
  /**
   * Datos iniciales de ejemplo.
   * En producción, estos vendrían de una base de datos.
   */
  private items: InventoryItem[] = [
    { id: crypto.randomUUID(), productId: 'PROD-1', name: 'Widget A', stock: 100, price: 29.99 },
    { id: crypto.randomUUID(), productId: 'PROD-2', name: 'Widget B', stock: 50, price: 49.99 },
  ];

  /** Retorna todos los ítems de inventario */
  getItems(): Observable<InventoryItem[]> {
    return of([...this.items]);
  }

  /**
   * Actualiza el stock de un producto.
   * quantity puede ser positivo (agregar stock) o negativo (reducir stock).
   * find() busca el primer elemento que cumpla la condición.
   * Lanza error si el producto no existe.
   */
  updateStock(productId: string, quantity: number): Observable<InventoryItem> {
    const item = this.items.find(i => i.productId === productId);
    if (item) {
      item.stock += quantity;
      return of({ ...item }); // Retorna copia del ítem actualizado
    }
    throw new Error(`Product ${productId} not found`);
  }
}
