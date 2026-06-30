/**
 * Definición de eventos de dominio.
 *
 * Los eventos de dominio representan cosas que YA PASARON en el sistema.
 * Son como las entradas de un diario: documentan lo que ocurrió.
 *
 * DomainEvent — Interfaz base que todos los eventos deben implementar.
 * Cada evento tiene:
 * - eventId: Identificador único del evento
 * - eventName: Nombre descriptivo (ej: 'OrderPlaced')
 * - occurredAt: Cuándo ocurrió
 * - aggregateId: ID de la entidad afectada (ej: ID de la orden)
 *
 * Eventos definidos:
 * - OrderPlacedEvent: Se creó una orden nueva
 * - PaymentReceivedEvent: Se recibió el pago
 * - PaymentFailedEvent: El pago falló
 * - InventoryUpdatedEvent: Se actualizó el inventario
 * - InventoryRestoredEvent: Se restauró el inventario (rollback)
 *
 * Analogía: Los eventos como señales de tráfico. Cada señal indica algo
 * que pasó: "semáforo en verde" (pago recibido), "accidente" (pago fallido).
 */

/** Interfaz base para todos los eventos de dominio */
export interface DomainEvent {
  readonly eventId: string;     // ID único del evento
  readonly eventName: string;   // Nombre descriptivo
  readonly occurredAt: Date;    // Fecha/hora del evento
  readonly aggregateId: string; // ID de la entidad afectada
}

/**
 * Evento: Se colocó una orden nueva.
 * Es el primer evento de la cadena de procesamiento de órdenes.
 */
export class OrderPlacedEvent implements DomainEvent {
  readonly eventId: string;
  readonly eventName = 'OrderPlaced';
  readonly occurredAt: Date;

  constructor(
    readonly aggregateId: string,   // ID de la orden
    readonly productId: string,    // ID del producto
    readonly quantity: number,     // Cantidad ordenada
    readonly total: number,        // Monto total
  ) {
    this.eventId = crypto.randomUUID();
    this.occurredAt = new Date();
  }
}

/**
 * Evento: Se recibió el pago exitosamente.
 * Se publica después de procesar el pago con éxito.
 */
export class PaymentReceivedEvent implements DomainEvent {
  readonly eventId: string;
  readonly eventName = 'PaymentReceived';
  readonly occurredAt: Date;

  constructor(
    readonly aggregateId: string, // ID de la orden
    readonly amount: number,     // Monto pagado
  ) {
    this.eventId = crypto.randomUUID();
    this.occurredAt = new Date();
  }
}

/**
 * Evento: Se actualizó el inventario.
 * Se publica cuando se descuenta productos del stock.
 */
export class InventoryUpdatedEvent implements DomainEvent {
  readonly eventId: string;
  readonly eventName = 'InventoryUpdated';
  readonly occurredAt: Date;

  constructor(
    readonly aggregateId: string,    // ID de la orden
    readonly productId: string,     // ID del producto
    readonly quantityChange: number, // Cambio en el stock (negativo = descuento)
  ) {
    this.eventId = crypto.randomUUID();
    this.occurredAt = new Date();
  }
}

/**
 * Evento: El pago falló.
 * Dispara la lógica de compensación (rollback).
 */
export class PaymentFailedEvent implements DomainEvent {
  readonly eventId: string;
  readonly eventName = 'PaymentFailed';
  readonly occurredAt: Date;

  constructor(
    readonly aggregateId: string, // ID de la orden
    readonly reason: string,     // Razón del fallo
  ) {
    this.eventId = crypto.randomUUID();
    this.occurredAt = new Date();
  }
}

/**
 * Evento: Se restauró el inventario después de un fallo.
 * Es parte de la compensación (rollback) cuando el pago falla.
 */
export class InventoryRestoredEvent implements DomainEvent {
  readonly eventId: string;
  readonly eventName = 'InventoryRestored';
  readonly occurredAt: Date;

  constructor(
    readonly aggregateId: string,         // ID de la orden
    readonly productId: string,          // ID del producto
    readonly quantityRestored: number,   // Cantidad restaurada
  ) {
    this.eventId = crypto.randomUUID();
    this.occurredAt = new Date();
  }
}
