import { DomainEvent } from './domain-event';
import { Money } from '../value-objects/money';

export class OrderPlacedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    readonly customerId: string,
    readonly total: Money,
    readonly itemCount: number,
  ) {
    super(aggregateId);
  }
}
