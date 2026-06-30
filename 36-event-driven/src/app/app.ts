/**
 * Componente raíz de la aplicación Event-Driven.
 *
 * Permite crear órdenes y ver el log de eventos y el progreso del saga.
 * Los componentes en arquitectura event-driven publican eventos
 * y reaccionan a los resultados.
 *
 * inject() — Obtiene el EventBus, Logger y Saga del sistema de inyección.
 * signal() — Contenedor reactivo para el estado del componente.
 * DatePipe — Pipe para formatear fechas en el template.
 */
import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EventBusService } from './events/event-bus';
import { EventLogger, LogEntry } from './events/event-logger';
import { OrderSaga } from './sagas/order-saga';
import { OrderPlacedEvent } from './events/domain-events';

@Component({
  selector: 'app-root',
  imports: [DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly eventBus = inject(EventBusService);
  private readonly logger = inject(EventLogger);
  private readonly saga = inject(OrderSaga);

  /** Signal con las entradas del log de eventos */
  readonly logEntries = signal<LogEntry[]>([]);

  /** Signal con los logs del saga (flujo de la orden) */
  readonly sagaLogs = signal<readonly string[]>([]);

  /** Contador para generar IDs únicos de órdenes */
  private counter = 0;

  /**
   * Publica un evento OrderPlacedEvent en el bus de eventos.
   * Esto dispara toda la cadena de eventos: pago → inventario → completado.
   * Los suscriptores (Saga, Logger) reaccionan automáticamente.
   */
  placeOrder(): void {
    this.counter++;
    const productId = `PROD-${Math.floor(Math.random() * 10) + 1}`;
    const quantity = Math.floor(Math.random() * 5) + 1;
    const total = quantity * 29.99;

    // Publica el evento en el bus central
    this.eventBus.publish(
      new OrderPlacedEvent(
        `ORD-${this.counter}-${Date.now()}`,
        productId,
        quantity,
        total,
      ),
    );

    // Actualiza las señales con los logs más recientes
    this.logEntries.set(this.logger.getAll());
    this.sagaLogs.set([...this.saga.logs]);
  }

  /** Refresca los logs sin crear una orden nueva */
  refreshLogs(): void {
    this.logEntries.set(this.logger.getAll());
    this.sagaLogs.set([...this.saga.logs]);
  }
}
