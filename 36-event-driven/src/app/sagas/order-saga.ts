/**
 * Saga: Orquestador de procesamiento de órdenes.
 *
 * Un Saga coordina una secuencia de pasos que deben ejecutarse en orden.
 * Si un paso falla, ejecuta pasos de compensación (rollback) para deshacer
 * los cambios anteriores.
 *
 * Flujo exitoso:
 * OrderPlaced → processPayment → PaymentReceived → updateInventory → InventoryUpdated → completado
 *
 * Flujo con fallo:
 * OrderPlaced → processPayment → PaymentFailed → compensar (restaurar inventario)
 *
 * Patrón: Choreography Saga (cada paso publica eventos que disparan el siguiente).
 * Es como una cadena de montaje: cada estación hace su trabajo y pasa
 * el producto a la siguiente estación.
 *
 * @Injectable() — Se registra en app.config.ts como provider.
 * ngOnDestroy — Se suscribe a eventos y limpia la suscripción al destruirse.
 */
import { Injectable, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventBusService } from '../events/event-bus';
import {
  OrderPlacedEvent,
  PaymentReceivedEvent,
  InventoryUpdatedEvent,
  PaymentFailedEvent,
  InventoryRestoredEvent,
} from '../events/domain-events';

/**
 * Estado interno de cada saga (flujo de procesamiento).
 * Cada orden tiene su propio estado que rastrea en qué paso va.
 */
interface SagaState {
  orderId: string;
  productId: string;
  quantity: number;
  total: number;
  step: 'order-placed' | 'payment-pending' | 'payment-received' | 'inventory-updated' | 'failed';
}

@Injectable()
export class OrderSaga implements OnDestroy {
  private readonly eventBus = inject(EventBusService);
  private readonly subscription: Subscription;

  /** Mapa que almacena el estado de cada saga activa. Clave = ID de orden */
  private readonly sagas = new Map<string, SagaState>();

  /** Arreglo de mensajes de log para mostrar en la UI */
  private readonly output: string[] = [];

  constructor() {
    /**
     * Se suscribe a los eventos relevantes.
     * Cada evento dispara un método que procesa ese paso del saga.
     */
    this.subscription = this.eventBus.on(OrderPlacedEvent).subscribe(event => this.onOrderPlaced(event));
    this.eventBus.on(PaymentReceivedEvent).subscribe(event => this.onPaymentReceived(event));
    this.eventBus.on(PaymentFailedEvent).subscribe(event => this.onPaymentFailed(event));
    this.eventBus.on(InventoryUpdatedEvent).subscribe(event => this.onInventoryUpdated(event));
  }

  /** Retorna los logs como array de solo lectura */
  get logs(): readonly string[] {
    return this.output;
  }

  /** Agrega un mensaje de log con marca de tiempo */
  private log(msg: string): void {
    this.output.push(`[${new Date().toLocaleTimeString()}] ${msg}`);
  }

  /**
   * Maneja el evento OrderPlaced: crea el estado del saga y procesa el pago.
   * Simula un pago con 70% de probabilidad de éxito.
   */
  private onOrderPlaced(event: OrderPlacedEvent): void {
    const state: SagaState = {
      orderId: event.aggregateId,
      productId: event.productId,
      quantity: event.quantity,
      total: event.total,
      step: 'order-placed',
    };
    this.sagas.set(event.aggregateId, state);
    this.log(`SAGA: Order ${event.aggregateId} placed — processing payment...`);
    this.processPayment(state);
  }

  /**
   * Simula el procesamiento de pago.
   * Math.random() > 0.3 significa 70% de probabilidad de éxito.
   * Publica PaymentReceivedEvent o PaymentFailedEvent según el resultado.
   */
  private processPayment(state: SagaState): void {
    const success = Math.random() > 0.3;
    state.step = 'payment-pending';

    if (success) {
      this.log(`SAGA: Payment received for order ${state.orderId} — $${state.total}`);
      this.eventBus.publish(new PaymentReceivedEvent(state.orderId, state.total));
    } else {
      this.log(`SAGA: Payment FAILED for order ${state.orderId}`);
      this.eventBus.publish(new PaymentFailedEvent(state.orderId, 'Insufficient funds'));
    }
  }

  /**
   * Maneja el evento PaymentReceived: actualiza el inventario.
   * quantityChange es negativo porque se descuenta productos.
   */
  private onPaymentReceived(event: PaymentReceivedEvent): void {
    const state = this.sagas.get(event.aggregateId);
    if (!state) return;

    state.step = 'payment-received';
    this.log(`SAGA: Updating inventory for order ${state.orderId}`);
    this.eventBus.publish(new InventoryUpdatedEvent(state.orderId, state.productId, -state.quantity));
  }

  /**
   * Maneja el evento InventoryUpdated: marca la orden como completada.
   */
  private onInventoryUpdated(event: InventoryUpdatedEvent): void {
    const state = this.sagas.get(event.aggregateId);
    if (!state) return;

    state.step = 'inventory-updated';
    this.log(`SAGA: Order ${state.orderId} completed successfully`);
  }

  /**
   * Maneja el evento PaymentFailed: ejecuta compensación (rollback).
   * Restaura el inventario que se había descontado (si se descontó).
   * Es como deshacer una compra: si el pago falla, devuelves los productos.
   */
  private onPaymentFailed(event: PaymentFailedEvent): void {
    const state = this.sagas.get(event.aggregateId);
    if (!state) return;

    state.step = 'failed';
    this.log(`SAGA: Compensating transaction — order ${state.orderId} rolled back. Reason: ${event.reason}`);

    // Compensación: restaurar inventario
    this.eventBus.publish(new InventoryRestoredEvent(event.aggregateId, state.productId, state.quantity));
    this.log(`SAGA: Inventory restored for order ${state.orderId}`);
  }

  /**
   * Lifecycle hook: Limpia la suscripción al destruir el servicio.
   * Previene memory leaks (fugas de memoria).
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
