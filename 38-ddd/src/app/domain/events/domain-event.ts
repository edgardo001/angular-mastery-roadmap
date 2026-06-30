/**
 * Clase abstracta base para eventos de dominio.
 *
 * En DDD, un evento de dominio representa algo que YA PASÓ en el dominio.
 * Es como una entrada de diario: documenta un hecho ocurrido.
 *
 * Clase abstracta (abstract class): No se puede instanciar directamente.
 * Solo sirve como base para otras clases que sí se pueden crear.
 * Es como un molde genérico que otros moldes específicos heredan.
 *
 * eventId — ID único del evento (UUID).
 * occurredAt — Fecha/hora en que ocurrió el evento.
 * aggregateId — ID de la entidad afectada por el evento.
 */
export abstract class DomainEvent {
  readonly eventId: string;
  readonly occurredAt: Date;

  constructor(readonly aggregateId: string) {
    this.eventId = crypto.randomUUID(); // ID único generado automáticamente
    this.occurredAt = new Date();       // Timestamp automático
  }
}
