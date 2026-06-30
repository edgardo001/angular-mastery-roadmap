/**
 * Puerto de salida: Interfaz OrderRepository.
 *
 * En DDD, el repositorio es un puerto que define las operaciones
 * de persistencia para una entidad aggregate (Order).
 *
 * InjectionToken — Token de inyección para desacoplar la interfaz
 * de la implementación concreta (in-memory, HTTP, base de datos).
 *
 * Analogía: El repositorio es como una libreta de contactos.
 * Define QUÉ información puedes guardar y recuperar (interfaces),
 * pero no CÓMO se almacena físicamente (implementación).
 */
import { InjectionToken } from '@angular/core';
import { Order, OrderId } from '../entities/order';

/** Interfaz que define las operaciones de persistencia de órdenes */
export interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>;  // Buscar por ID
  save(order: Order): Promise<void>;             // Guardar (crear o actualizar)
  delete(id: OrderId): Promise<void>;            // Eliminar
}

/** Token de inyección para el repositorio de órdenes */
export const ORDER_REPOSITORY = new InjectionToken<OrderRepository>('OrderRepository');
