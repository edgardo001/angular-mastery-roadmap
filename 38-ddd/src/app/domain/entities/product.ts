/**
 * Entidad de dominio: Product con ProductId value object.
 *
 * ProductId — Value object que identifica únicamente a un producto.
 * Product — Entidad con identidad, nombre, precio y stock.
 *
 * Reglas de negocio en la entidad:
 * - reduceStock(): No permite stock negativo (lanza error si no hay suficiente)
 * - hasStock(): Verifica si hay suficiente stock para una cantidad dada
 * - restock(): Agrega stock (solo positivo)
 * - changePrice(): Cambia el precio (value object Money)
 *
 * En DDD, las reglas de negocio van EN LA ENTIDAD, no en servicios externos.
 * Es como un auto: las reglas de cómo funcionar (frenos, acelerador) están
 * dentro del auto, no en el mecánico.
 *
 * Analogía: Product es como un producto en una tienda online.
 * Tiene nombre, precio, y cantidad disponible. El stock se actualiza
 * cuando alguien compra (reduceStock) o cuando llega mercancía (restock).
 */
import { Money } from '../value-objects/money';

/** Value Object: Identificador único de producto */
export class ProductId {
  constructor(private readonly value: string) {}

  static generate(): ProductId {
    return new ProductId(crypto.randomUUID());
  }

  static from(value: string): ProductId {
    return new ProductId(value);
  }

  toString(): string {
    return this.value;
  }

  equals(other: ProductId): boolean {
    return this.value === other.value;
  }
}

/** Entidad: Product — Representa un producto del dominio */
export class Product {
  /** Constructor privado: solo se crea con create() o from() */
  private constructor(
    private readonly id: ProductId,
    private name: string,
    private price: Money,
    private stock: number,
  ) {}

  /** Factory method: Crea un producto nuevo (genera ID automáticamente) */
  static create(name: string, price: Money, stock: number): Product {
    return new Product(ProductId.generate(), name, price, stock);
  }

  /** Factory method: Reconstruye un producto desde datos existentes */
  static from(id: ProductId, name: string, price: Money, stock: number): Product {
    return new Product(id, name, price, stock);
  }

  /** Getters para acceder a las propiedades */
  getId(): ProductId { return this.id; }
  getName(): string { return this.name; }
  getPrice(): Money { return this.price; }
  getStock(): number { return this.stock; }

  /**
   * Verifica si hay suficiente stock para una cantidad dada.
   * Retorna true si el stock es mayor o igual a la cantidad solicitada.
   */
  hasStock(quantity: number): boolean {
    return this.stock >= quantity;
  }

  /**
   * Reduce el stock de un producto.
   * Lanza error si no hay suficiente stock (regla de negocio).
   */
  reduceStock(quantity: number): void {
    if (!this.hasStock(quantity)) {
      throw new Error(`Stock insuficiente: disponible ${this.stock}, solicitado ${quantity}`);
    }
    this.stock -= quantity;
  }

  /** Agrega stock (cuando llega mercancía nueva) */
  restock(quantity: number): void {
    this.stock += quantity;
  }

  /** Cambia el precio del producto */
  changePrice(newPrice: Money): void {
    this.price = newPrice;
  }
}
