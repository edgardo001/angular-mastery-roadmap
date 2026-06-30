/**
 * Contratos e interfaces de servicios compartidos.
 *
 * Estas interfaces definen QUÉ puede hacer cada servicio, pero NO CÓMO lo hace.
 * Es como un contrato laboral: dice las responsabilidades, pero no cómo
 * se ejecutan las tareas.
 *
 * InjectionToken — Permite desacoplar la interfaz de la implementación.
 * Cada módulo registra su implementación concreta en app.config.ts.
 *
 * Observable<T> — Flujo de datos que emite valores a lo largo del tiempo.
 * Es como un canal de YouTube: te suscribes y recibes videos (datos) cuando llegan.
 *
 * Analogía: Los contratos como un menú de restaurante.
 * Dice qué puedes pedir (operaciones), pero no cómo el chef lo prepara (implementación).
 */
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, InventoryItem, Invoice } from './types';

/** Contrato del servicio de órdenes */
export interface OrderServiceContract {
  getOrders(): Observable<Order[]>;                                    // Obtener todas las órdenes
  createOrder(productId: string, quantity: number): Observable<Order>; // Crear una orden nueva
}

/** Contrato del servicio de inventario */
export interface InventoryServiceContract {
  getItems(): Observable<InventoryItem[]>;                                        // Obtener todos los ítems
  updateStock(productId: string, quantity: number): Observable<InventoryItem>;    // Actualizar stock
}

/** Contrato del servicio de facturación */
export interface BillingServiceContract {
  getInvoices(): Observable<Invoice[]>;                                              // Obtener todas las facturas
  createInvoice(orderId: string, amount: number): Observable<Invoice>;               // Crear una factura
}

/**
 * Tokens de inyección para cada servicio.
 * Permiten cambiar la implementación sin modificar el código que usa el servicio.
 */
export const ORDER_SERVICE = new InjectionToken<OrderServiceContract>('OrderService');
export const INVENTORY_SERVICE = new InjectionToken<InventoryServiceContract>('InventoryService');
export const BILLING_SERVICE = new InjectionToken<BillingServiceContract>('BillingService');
