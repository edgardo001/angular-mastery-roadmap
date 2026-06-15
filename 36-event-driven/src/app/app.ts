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

  readonly logEntries = signal<LogEntry[]>([]);
  readonly sagaLogs = signal<readonly string[]>([]);

  private counter = 0;

  placeOrder(): void {
    this.counter++;
    const productId = `PROD-${Math.floor(Math.random() * 10) + 1}`;
    const quantity = Math.floor(Math.random() * 5) + 1;
    const total = quantity * 29.99;

    this.eventBus.publish(
      new OrderPlacedEvent(
        `ORD-${this.counter}-${Date.now()}`,
        productId,
        quantity,
        total,
      ),
    );

    this.logEntries.set(this.logger.getAll());
    this.sagaLogs.set([...this.saga.logs]);
  }

  refreshLogs(): void {
    this.logEntries.set(this.logger.getAll());
    this.sagaLogs.set([...this.saga.logs]);
  }
}
