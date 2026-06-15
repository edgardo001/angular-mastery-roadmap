import { Component, inject, signal } from '@angular/core';
import { ORDER_REPOSITORY } from './domain/repositories/order-repository';
import { OrderRepository } from './domain/repositories/order-repository';
import { Order, OrderId } from './domain/entities/order';
import { User, UserId } from './domain/entities/user';
import { Product, ProductId } from './domain/entities/product';
import { Email } from './domain/value-objects/email';
import { Money } from './domain/value-objects/money';
import { Address } from './domain/value-objects/address';

interface OrderSummary {
  id: string;
  status: string;
  total: string;
  lines: number;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly orderRepo = inject<OrderRepository>(ORDER_REPOSITORY);

  readonly orders = signal<OrderSummary[]>([]);
  readonly log = signal<string[]>([]);

  private addLog(msg: string): void {
    this.log.update(l => [...l, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  }

  async createSampleOrder(): Promise<void> {
    const customer = User.register('Juan Pérez', Email.from('juan@example.com'));
    const shippingAddress = Address.of({
      street: 'Av. Reforma 123',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '06600',
      country: 'México',
    });
    customer.updateShippingAddress(shippingAddress);

    const product = Product.create('Laptop', Money.of(999.99), 10);
    const order = Order.create(customer.getId(), shippingAddress);

    order.addLine(product.getId(), product.getName(), product.getPrice(), 1);
    this.addLog(`Orden creada: ${order.getId()} — Total: ${order.getTotal()}`);

    product.reduceStock(1);
    order.confirm();
    this.addLog(`Orden confirmada — Eventos: ${order.getDomainEvents().length}`);

    await this.orderRepo.save(order);
    this.addLog('Orden guardada en repositorio');

    await this.refreshOrders();
  }

  async refreshOrders(): Promise<void> {
    this.addLog('Listando órdenes...');
    const summaries: OrderSummary[] = [];
    const allOrders = [
      await this.orderRepo.findById(OrderId.from('placeholder')),
    ].filter(Boolean) as Order[];

    this.orders.set(summaries);
  }

  clearLog(): void {
    this.log.set([]);
  }
}
