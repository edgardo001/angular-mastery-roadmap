export interface DomainEvent {
  readonly eventId: string;
  readonly eventName: string;
  readonly occurredAt: Date;
  readonly aggregateId: string;
}

export class OrderPlacedEvent implements DomainEvent {
  readonly eventId: string;
  readonly eventName = 'OrderPlaced';
  readonly occurredAt: Date;

  constructor(
    readonly aggregateId: string,
    readonly productId: string,
    readonly quantity: number,
    readonly total: number,
  ) {
    this.eventId = crypto.randomUUID();
    this.occurredAt = new Date();
  }
}

export class PaymentReceivedEvent implements DomainEvent {
  readonly eventId: string;
  readonly eventName = 'PaymentReceived';
  readonly occurredAt: Date;

  constructor(
    readonly aggregateId: string,
    readonly amount: number,
  ) {
    this.eventId = crypto.randomUUID();
    this.occurredAt = new Date();
  }
}

export class InventoryUpdatedEvent implements DomainEvent {
  readonly eventId: string;
  readonly eventName = 'InventoryUpdated';
  readonly occurredAt: Date;

  constructor(
    readonly aggregateId: string,
    readonly productId: string,
    readonly quantityChange: number,
  ) {
    this.eventId = crypto.randomUUID();
    this.occurredAt = new Date();
  }
}

export class PaymentFailedEvent implements DomainEvent {
  readonly eventId: string;
  readonly eventName = 'PaymentFailed';
  readonly occurredAt: Date;

  constructor(
    readonly aggregateId: string,
    readonly reason: string,
  ) {
    this.eventId = crypto.randomUUID();
    this.occurredAt = new Date();
  }
}

export class InventoryRestoredEvent implements DomainEvent {
  readonly eventId: string;
  readonly eventName = 'InventoryRestored';
  readonly occurredAt: Date;

  constructor(
    readonly aggregateId: string,
    readonly productId: string,
    readonly quantityRestored: number,
  ) {
    this.eventId = crypto.randomUUID();
    this.occurredAt = new Date();
  }
}
