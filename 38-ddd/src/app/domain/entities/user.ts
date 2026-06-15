import { Email } from '../value-objects/email';
import { Address } from '../value-objects/address';

export class UserId {
  constructor(private readonly value: string) {}

  static generate(): UserId {
    return new UserId(crypto.randomUUID());
  }

  static from(value: string): UserId {
    return new UserId(value);
  }

  toString(): string {
    return this.value;
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }
}

export class User {
  private constructor(
    private readonly id: UserId,
    private name: string,
    private email: Email,
    private shippingAddress: Address | null,
  ) {}

  static register(name: string, email: Email): User {
    return new User(UserId.generate(), name, email, null);
  }

  static from(id: UserId, name: string, email: Email, shippingAddress: Address | null): User {
    return new User(id, name, email, shippingAddress);
  }

  getId(): UserId { return this.id; }
  getName(): string { return this.name; }
  getEmail(): Email { return this.email; }
  getShippingAddress(): Address | null { return this.shippingAddress; }

  changeName(name: string): void {
    this.name = name;
  }

  changeEmail(email: Email): void {
    this.email = email;
  }

  updateShippingAddress(address: Address): void {
    this.shippingAddress = address;
  }
}
