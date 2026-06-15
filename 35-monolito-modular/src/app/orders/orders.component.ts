import { Component, inject, signal } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { OrdersService } from './orders.service';
import { Order } from '../shared';

@Component({
  selector: 'app-orders',
  imports: [SlicePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  private readonly service = inject(OrdersService);
  readonly orders = signal<Order[]>([]);

  constructor() {
    this.load();
  }

  private load(): void {
    this.service.getOrders().subscribe(orders => this.orders.set(orders));
  }

  createOrder(): void {
    this.service.createOrder(`PROD-${Math.floor(Math.random() * 100)}`, 1)
      .subscribe(() => this.load());
  }
}
