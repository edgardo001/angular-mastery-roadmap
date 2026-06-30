/**
 * Logger de Eventos (Middleware).
 *
 * Registra cada evento que pasa por el bus de eventos.
 * Implementa EventBusMiddleware para procesar eventos antes de que lleguen
 * a suscriptores.
 *
 * Patrón: Middleware (como Express.js middleware).
 * Cada evento pasa por este logger antes de ser entregado al destinatario.
 * Es como una cámara de seguridad que graba todo lo que pasa por un pasillo.
 *
 * LogEntry — Interfaz que define la forma de cada entrada del log.
 * @Injectable({ providedIn: 'root' }) — Singleton en toda la aplicación.
 */
import { Injectable } from '@angular/core';
import { DomainEvent } from './domain-events';
import { EventBusMiddleware } from './event-bus';

/** Formato de cada entrada en el log */
export interface LogEntry {
  timestamp: string;  // Fecha/hora del evento en formato ISO
  eventName: string;  // Nombre del evento
  aggregateId: string; // ID de la entidad afectada
}

@Injectable({ providedIn: 'root' })
export class EventLogger implements EventBusMiddleware {
  /** Arreglo que almacena todas las entradas del log */
  readonly logs: LogEntry[] = [];

  /**
   * handle() — Método del middleware que procesa cada evento.
   * Registra el evento en el log y luego llama a next() para pasar
   * el evento al siguiente middleware o suscriptor.
   *
   * Si no llamaras a next(), el evento "se moriría" aquí y nadie más lo recibiría.
   */
  handle<T extends DomainEvent>(event: T, next: () => void | Promise<void>): void {
    this.logs.push({
      timestamp: event.occurredAt.toISOString(),
      eventName: event.eventName,
      aggregateId: event.aggregateId,
    });
    next(); // Pasa el evento al siguiente en la cadena
  }

  /** Retorna una copia del log completo */
  getAll(): LogEntry[] {
    return [...this.logs];
  }

  /** Limpia todas las entradas del log */
  clear(): void {
    this.logs.length = 0;
  }
}
