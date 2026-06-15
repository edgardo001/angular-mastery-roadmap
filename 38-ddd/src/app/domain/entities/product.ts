import { Money } from '../value-objects/money';

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

export class Product {
  private constructor(
    private readonly id: ProductId,
    private name: string,
    private price: Money,
    private stock: number,
  ) {}

  static create(name: string, price: Money, stock: number): Product {
    return new Product(ProductId.generate(), name, price, stock);
  }

  static from(id: ProductId, name: string, price: Money, stock: number): Product {
    return new Product(id, name, price, stock);
  }

  getId(): ProductId { return this.id; }
  getName(): string { return this.name; }
  getPrice(): Money { return this.price; }
  getStock(): number { return this.stock; }

  hasStock(quantity: number): boolean {
    return this.stock >= quantity;
  }

  reduceStock(quantity: number): void {
    if (!this.hasStock(quantity)) {
      throw new Error(`Stock insuficiente: disponible ${this.stock}, solicitado ${quantity}`);
    }
    this.stock -= quantity;
  }

  restock(quantity: number): void {
    this.stock += quantity;
  }

  changePrice(newPrice: Money): void {
    this.price = newPrice;
  }
}
