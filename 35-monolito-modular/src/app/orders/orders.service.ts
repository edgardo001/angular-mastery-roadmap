/**
 * Servicio del módulo de Órdenes.
 *
 * Implementa OrderServiceContract y maneja la lógica de negocio
 * para crear y consultar órdenes de compra.
 *
 * @Injectable() — Sin providedIn: 'root' porque se registra manualmente
 * en app.config.ts con el token ORDER_SERVICE. Esto permite usar
 * múltiples implementaciones si fuera necesario.
 *
 * Observable — RxJS devuelve datos como Observables (flujos de datos).
 * of() crea un Observable que emite un valor y se completa inmediatamente.
 * Es como un mensajero que entrega una carta y se va.
 *
 * Los datos se almacenan en memoria (arreglo privado).
 * En producción, esto sería una llamada HTTP a un API real.
 */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderServiceContract, Order } from '../shared';

@Injectable()
export class OrdersService implements OrderServiceContract {
  /** Arreglo en memoria que simula una base de datos de órdenes */
  private orders: Order[] = [];

  /** Retorna una copia del array de órdenes (inmutabilidad) */
  getOrders(): Observable<Order[]> {
    return of([...this.orders]); // [...array] crea una copia superficial
  }

  /**
   * Crea una orden nueva con datos generados.
   * crypto.randomUUID() genera un ID único para cada orden.
   * El precio unitario está hardcodeado a 29.99 para el ejemplo.
   */
  createOrder(productId: string, quantity: number): Observable<Order> {
    const order: Order = {
      id: crypto.randomUUID(),
      productId,
      quantity,
      total: quantity * 29.99,
      status: 'pending',
      createdAt: new Date(),
    };
    this.orders.push(order);
    return of(order);
  }
}
