import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderServiceContract, Order } from '../shared';

@Injectable()
export class OrdersService implements OrderServiceContract {
  private orders: Order[] = [];

  getOrders(): Observable<Order[]> {
    return of([...this.orders]);
  }

  createOrder(productId: string, quantity: number): Observable<Order> {
    const order: Order = {
      id: crypto.randomUUID(),
      productId,
      quantity,
      total: quantity * 29.99,
      status: 'pending',
      createdAt: new Date(),
    };
    this.orders.push(order);
    return of(order);
  }
}
