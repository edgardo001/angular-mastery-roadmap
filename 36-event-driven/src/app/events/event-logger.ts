import { Injectable } from '@angular/core';
import { DomainEvent } from './domain-events';
import { EventBusMiddleware } from './event-bus';

export interface LogEntry {
  timestamp: string;
  eventName: string;
  aggregateId: string;
}

@Injectable({ providedIn: 'root' })
export class EventLogger implements EventBusMiddleware {
  readonly logs: LogEntry[] = [];

  handle<T extends DomainEvent>(event: T, next: () => void | Promise<void>): void {
    this.logs.push({
      timestamp: event.occurredAt.toISOString(),
      eventName: event.eventName,
      aggregateId: event.aggregateId,
    });
    next();
  }

  getAll(): LogEntry[] {
    return [...this.logs];
  }

  clear(): void {
    this.logs.length = 0;
  }
}
