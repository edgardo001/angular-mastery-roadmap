/**
 * Entidad de dominio: Order — La entidad más compleja del dominio.
 *
 * Order es una entidad con ESTADO (state machine) que controla el ciclo de vida:
 * pending → confirmed → shipped → delivered
 *                     ↘ cancelled (desde pending, confirmed o shipped)
 *
 * OrderId — Value object para identificar la orden.
 * OrderLine — Value object que representa una línea de la orden (producto + cantidad).
 * OrderStatus — Union type que define los estados posibles.
 *
 * Reglas de negocio:
 * - No se pueden agregar líneas a una orden confirmada
 * - No se puede confirmar una orden sin productos
 * - No se puede cancelar una orden entregada
 * - El total se calcula sumando los subtotales de cada línea
 * - Al confirmar, se genera un OrderPlacedEvent (evento de dominio)
 *
 * domainEvents — Arreglo que almacena los eventos generados por la entidad.
 * Estos eventos se pueden publicar después de guardar la entidad.
 *
 * Analogía: Order es como un pedido de Amazon. Tiene estados (procesando,
 * enviado, entregado), líneas de producto, y genera eventos cuando cambia
 * de estado (notificación de envío, confirmación de entrega, etc.).
 */
import { Money, Currency } from '../value-objects/money';
import { Address } from '../value-objects/address';
import { ProductId } from './product';
import { UserId } from './user';
import { DomainEvent } from '../events/domain-event';
import { OrderPlacedEvent } from '../events/order-placed-event';

/** Value Object: Identificador único de orden */
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

/** Interfaz para los datos de una línea de orden */
export interface OrderLineData {
  productId: ProductId;
  productName: string;
  unitPrice: Money;
  quantity: number;
}

/** Value Object: Línea de orden (producto + cantidad + precio) */
export class OrderLine {
  constructor(private readonly data: OrderLineData) {}

  getProductId(): ProductId { return this.data.productId; }
  getProductName(): string { return this.data.productName; }
  getUnitPrice(): Money { return this.data.unitPrice; }
  getQuantity(): number { return this.data.quantity; }

  /** Calcula el subtotal multiplicando precio unitario × cantidad */
  getSubtotal(): Money {
    return this.data.unitPrice.multiply(this.data.quantity);
  }
}

/** Tipo que define los estados posibles de una orden */
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

/**
 * Entidad: Order — Entidad aggregate raíz del dominio de órdenes.
 * Contiene líneas, tiene estado, y genera eventos de dominio.
 */
export class Order {
  /** Líneas de la orden (productos) */
  private readonly lines: OrderLine[] = [];

  /** Estado actual de la orden */
  private status: OrderStatus = 'pending';

  /** Eventos de dominio generados por esta entidad */
  private readonly domainEvents: DomainEvent[] = [];

  /** Constructor privado: solo se crea con create() o from() */
  private constructor(
    private readonly id: OrderId,
    private readonly customerId: UserId,
    private shippingAddress: Address,
  ) {}

  /** Factory method: Crea una orden nueva con estado 'pending' */
  static create(customerId: UserId, shippingAddress: Address): Order {
    return new Order(OrderId.generate(), customerId, shippingAddress);
  }

  /** Factory method: Reconstruye una orden desde datos existentes */
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

  /** Getters para acceder a las propiedades */
  getId(): OrderId { return this.id; }
  getCustomerId(): UserId { return this.customerId; }
  getShippingAddress(): Address { return this.shippingAddress; }
  getLines(): readonly OrderLine[] { return [...this.lines]; } // Retorna copia
  getStatus(): OrderStatus { return this.status; }
  getDomainEvents(): DomainEvent[] { return [...this.domainEvents]; }

  /**
   * Agrega una línea (producto) a la orden.
   * Solo se puede hacer si la orden está en estado 'pending'.
   */
  addLine(productId: ProductId, productName: string, unitPrice: Money, quantity: number): void {
    if (this.status !== 'pending') {
      throw new Error('No se pueden agregar líneas a una orden ya confirmada');
    }
    if (quantity <= 0) {
      throw new Error('La cantidad debe ser positiva');
    }
    this.lines.push(new OrderLine({ productId, productName, unitPrice, quantity }));
  }

  /**
   * Confirma la orden: cambia estado a 'confirmed' y genera OrderPlacedEvent.
   * Solo se puede confirmar si tiene al menos una línea.
   */
  confirm(): void {
    if (this.lines.length === 0) {
      throw new Error('No se puede confirmar una orden sin productos');
    }
    if (this.status !== 'pending') {
      throw new Error('La orden ya fue procesada');
    }
    this.status = 'confirmed';
    // Genera evento de dominio que otros componentes pueden escuchar
    this.domainEvents.push(
      new OrderPlacedEvent(
        this.id.toString(),
        this.customerId.toString(),
        this.getTotal(),
        this.lines.length,
      ),
    );
  }

  /** Envía la orden: solo se puede desde estado 'confirmed' */
  ship(): void {
    if (this.status !== 'confirmed') {
      throw new Error('Solo se pueden enviar órdenes confirmadas');
    }
    this.status = 'shipped';
  }

  /** Entrega la orden: solo se puede desde estado 'shipped' */
  deliver(): void {
    if (this.status !== 'shipped') {
      throw new Error('Solo se pueden entregar órdenes enviadas');
    }
    this.status = 'delivered';
  }

  /** Cancela la orden: no se puede cancelar si ya está entregada */
  cancel(): void {
    if (this.status === 'delivered') {
      throw new Error('No se puede cancelar una orden entregada');
    }
    if (this.status === 'cancelled') {
      throw new Error('La orden ya está cancelada');
    }
    this.status = 'cancelled';
  }

  /** Calcula el total sumando los subtotales de todas las líneas */
  getTotal(): Money {
    return this.lines.reduce(
      (acc, line) => acc.add(line.getSubtotal()),
      Money.zero('USD' as Currency), // Inicia en cero y va sumando
    );
  }

  /** Cuenta el total de artículos en la orden */
  getItemCount(): number {
    return this.lines.reduce((acc, line) => acc + line.getQuantity(), 0);
  }
}
