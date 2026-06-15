import { Money, Currency } from '../value-objects/money';
import { Address } from '../value-objects/address';
import { ProductId } from './product';
import { UserId } from './user';
import { DomainEvent } from '../events/domain-event';
import { OrderPlacedEvent } from '../events/order-placed-event';

export class OrderId {
  constructor(private readonly value: string) {}

  static generate(): OrderId {
    return new OrderId(crypto.randomUUID());
  }

  static from(value: string): OrderId {
    return new OrderId(value);
  }

  toString(): string {
    return this.value;
  }

  equals(other: OrderId): boolean {
    return this.value === other.value;
  }
}

export interface OrderLineData {
  productId: ProductId;
  productName: string;
  unitPrice: Money;
  quantity: number;
}

export class OrderLine {
  constructor(private readonly data: OrderLineData) {}

  getProductId(): ProductId { return this.data.productId; }
  getProductName(): string { return this.data.productName; }
  getUnitPrice(): Money { return this.data.unitPrice; }
  getQuantity(): number { return this.data.quantity; }

  getSubtotal(): Money {
    return this.data.unitPrice.multiply(this.data.quantity);
  }
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export class Order {
  private readonly lines: OrderLine[] = [];
  private status: OrderStatus = 'pending';
  private readonly domainEvents: DomainEvent[] = [];

  private constructor(
    private readonly id: OrderId,
    private readonly customerId: UserId,
    private shippingAddress: Address,
  ) {}

  static create(customerId: UserId, shippingAddress: Address): Order {
    return new Order(OrderId.generate(), customerId, shippingAddress);
  }

  static from(
    id: OrderId,
    customerId: UserId,
    shippingAddress: Address,
    lines: OrderLine[],
    status: OrderStatus,
  ): Order {
    const order = new Order(id, customerId, shippingAddress);
    lines.forEach(l => order.lines.push(l));
    order.status = status;
    return order;
  }

  getId(): OrderId { return this.id; }
  getCustomerId(): UserId { return this.customerId; }
  getShippingAddress(): Address { return this.shippingAddress; }
  getLines(): readonly OrderLine[] { return [...this.lines]; }
  getStatus(): OrderStatus { return this.status; }
  getDomainEvents(): DomainEvent[] { return [...this.domainEvents]; }

  addLine(productId: ProductId, productName: string, unitPrice: Money, quantity: number): void {
    if (this.status !== 'pending') {
      throw new Error('No se pueden agregar líneas a una orden ya confirmada');
    }
    if (quantity <= 0) {
      throw new Error('La cantidad debe ser positiva');
    }
    this.lines.push(new OrderLine({ productId, productName, unitPrice, quantity }));
  }

  confirm(): void {
    if (this.lines.length === 0) {
      throw new Error('No se puede confirmar una orden sin productos');
    }
    if (this.status !== 'pending') {
      throw new Error('La orden ya fue procesada');
    }
    this.status = 'confirmed';
    this.domainEvents.push(
      new OrderPlacedEvent(
        this.id.toString(),
        this.customerId.toString(),
        this.getTotal(),
        this.lines.length,
      ),
    );
  }

  ship(): void {
    if (this.status !== 'confirmed') {
      throw new Error('Solo se pueden enviar órdenes confirmadas');
    }
    this.status = 'shipped';
  }

  deliver(): void {
    if (this.status !== 'shipped') {
      throw new Error('Solo se pueden entregar órdenes enviadas');
    }
    this.status = 'delivered';
  }

  cancel(): void {
    if (this.status === 'delivered') {
      throw new Error('No se puede cancelar una orden entregada');
    }
    if (this.status === 'cancelled') {
      throw new Error('La orden ya está cancelada');
    }
    this.status = 'cancelled';
  }

  getTotal(): Money {
    return this.lines.reduce(
      (acc, line) => acc.add(line.getSubtotal()),
      Money.zero('USD' as Currency),
    );
  }

  getItemCount(): number {
    return this.lines.reduce((acc, line) => acc + line.getQuantity(), 0);
  }
}
