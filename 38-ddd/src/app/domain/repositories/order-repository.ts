import { InjectionToken } from '@angular/core';
import { Order, OrderId } from '../entities/order';

export interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;
  delete(id: OrderId): Promise<void>;
}

export const ORDER_REPOSITORY = new InjectionToken<OrderRepository>('OrderRepository');
