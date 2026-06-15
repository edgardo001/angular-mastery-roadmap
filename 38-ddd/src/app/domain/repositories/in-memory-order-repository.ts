import { Injectable } from '@angular/core';
import { OrderRepository } from './order-repository';
import { Order, OrderId } from '../entities/order';

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  private store = new Map<string, Order>();

  async findById(id: OrderId): Promise<Order | null> {
    return this.store.get(id.toString()) ?? null;
  }

  async save(order: Order): Promise<void> {
    this.store.set(order.getId().toString(), order);
  }

  async delete(id: OrderId): Promise<void> {
    this.store.delete(id.toString());
  }
}
