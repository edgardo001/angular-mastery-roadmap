/**
 * Evento de dominio: OrderPlacedEvent.
 *
 * Se publica cuando una orden es confirmada. Contiene información
 * clave del momento en que se realizó el pedido.
 *
 * extends DomainEvent — Hereda de la clase base y reutiliza:
 *   - eventId (generado automáticamente)
 *   - occurredAt (fecha automática)
 *   - aggregateId (ID de la orden)
 *
 * readonly — Propiedades de solo lectura: no se pueden modificar después de crear.
 *
 * Analogía: Es como un recibo de compra. Documenta qué se compró,
 * cuándo y a quién, pero no cambia después de imprimirse.
 */
import { DomainEvent } from './domain-event';
import { Money } from '../value-objects/money';

export class OrderPlacedEvent extends DomainEvent {
  constructor(
    aggregateId: string,          // ID de la orden (hereda de DomainEvent)
    readonly customerId: string,  // ID del cliente que hizo la orden
    readonly total: Money,        // Monto total de la orden
    readonly itemCount: number,   // Cantidad de productos en la orden
  ) {
    super(aggregateId); // Llama al constructor de la clase base
  }
}
