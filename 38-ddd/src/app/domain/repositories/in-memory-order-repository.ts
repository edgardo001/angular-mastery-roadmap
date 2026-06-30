/**
 * Implementación concreta: InMemoryOrderRepository.
 *
 * Implementa OrderRepository almacenando órdenes en memoria (Map).
 * Es un adaptador de infraestructura para desarrollo y testing.
 *
 * Map<string, Order> — Estructura clave-valor donde:
 *   - Clave: ID de la orden (string)
 *   - Valor: Objeto Order
 *
 * @Injectable() — Para que Angular pueda inyectar esta clase.
 * En producción, se reemplazaría con HttpOrderRepository o similar.
 *
 * Analogía: Es como una libreta temporal. Funciona mientras la app está
 * abierta, pero se borra al cerrar. Para persistencia real,
 * usarías una base de datos.
 */
import { Injectable } from '@angular/core';
import { OrderRepository } from './order-repository';
import { Order, OrderId } from '../entities/order';

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  /** Map para almacenar órdenes en memoria */
  private store = new Map<string, Order>();

  /** Busca una orden por ID. Retorna null si no existe. */
  async findById(id: OrderId): Promise<Order | null> {
    return this.store.get(id.toString()) ?? null;
  }

  /** Guarda una orden (crea o actualiza) */
  async save(order: Order): Promise<void> {
    this.store.set(order.getId().toString(), order);
  }

  /** Elimina una orden */
  async delete(id: OrderId): Promise<void> {
    this.store.delete(id.toString());
  }
}
