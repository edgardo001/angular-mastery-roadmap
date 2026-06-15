export abstract class DomainEvent {
  readonly eventId: string;
  readonly occurredAt: Date;

  constructor(readonly aggregateId: string) {
    this.eventId = crypto.randomUUID();
    this.occurredAt = new Date();
  }
}
