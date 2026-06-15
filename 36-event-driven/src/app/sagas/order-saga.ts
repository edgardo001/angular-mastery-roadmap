import { Injectable, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventBusService } from '../events/event-bus';
import {
  OrderPlacedEvent,
  PaymentReceivedEvent,
  InventoryUpdatedEvent,
  PaymentFailedEvent,
  InventoryRestoredEvent,
} from '../events/domain-events';

interface SagaState {
  orderId: string;
  productId: string;
  quantity: number;
  total: number;
  step: 'order-placed' | 'payment-pending' | 'payment-received' | 'inventory-updated' | 'failed';
}

@Injectable()
export class OrderSaga implements OnDestroy {
  private readonly eventBus = inject(EventBusService);
  private readonly subscription: Subscription;
  private readonly sagas = new Map<string, SagaState>();
  private readonly output: string[] = [];

  constructor() {
    this.subscription = this.eventBus.on(OrderPlacedEvent).subscribe(event => this.onOrderPlaced(event));
    this.eventBus.on(PaymentReceivedEvent).subscribe(event => this.onPaymentReceived(event));
    this.eventBus.on(PaymentFailedEvent).subscribe(event => this.onPaymentFailed(event));
    this.eventBus.on(InventoryUpdatedEvent).subscribe(event => this.onInventoryUpdated(event));
  }

  get logs(): readonly string[] {
    return this.output;
  }

  private log(msg: string): void {
    this.output.push(`[${new Date().toLocaleTimeString()}] ${msg}`);
  }

  private onOrderPlaced(event: OrderPlacedEvent): void {
    const state: SagaState = {
      orderId: event.aggregateId,
      productId: event.productId,
      quantity: event.quantity,
      total: event.total,
      step: 'order-placed',
    };
    this.sagas.set(event.aggregateId, state);
    this.log(`SAGA: Order ${event.aggregateId} placed — processing payment...`);
    this.processPayment(state);
  }

  private processPayment(state: SagaState): void {
    const success = Math.random() > 0.3;
    state.step = 'payment-pending';

    if (success) {
      this.log(`SAGA: Payment received for order ${state.orderId} — $${state.total}`);
      this.eventBus.publish(new PaymentReceivedEvent(state.orderId, state.total));
    } else {
      this.log(`SAGA: Payment FAILED for order ${state.orderId}`);
      this.eventBus.publish(new PaymentFailedEvent(state.orderId, 'Insufficient funds'));
    }
  }

  private onPaymentReceived(event: PaymentReceivedEvent): void {
    const state = this.sagas.get(event.aggregateId);
    if (!state) return;

    state.step = 'payment-received';
    this.log(`SAGA: Updating inventory for order ${state.orderId}`);
    this.eventBus.publish(new InventoryUpdatedEvent(state.orderId, state.productId, -state.quantity));
  }

  private onInventoryUpdated(event: InventoryUpdatedEvent): void {
    const state = this.sagas.get(event.aggregateId);
    if (!state) return;

    state.step = 'inventory-updated';
    this.log(`SAGA: Order ${state.orderId} completed successfully`);
  }

  private onPaymentFailed(event: PaymentFailedEvent): void {
    const state = this.sagas.get(event.aggregateId);
    if (!state) return;

    state.step = 'failed';
    this.log(`SAGA: Compensating transaction — order ${state.orderId} rolled back. Reason: ${event.reason}`);

    this.eventBus.publish(new InventoryRestoredEvent(event.aggregateId, state.productId, state.quantity));
    this.log(`SAGA: Inventory restored for order ${state.orderId}`);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
