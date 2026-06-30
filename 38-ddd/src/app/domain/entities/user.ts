/**
 * Entidad de dominio: User con UserId value object.
 *
 * UserId — Value object que identifica únicamente a un usuario.
 *   - generate(): Crea un ID nuevo con UUID
 *   - from(): Reconstruye un ID desde un string existente
 *   - equals(): Compara dos UserId por valor
 *
 * User — Entidad con identidad única. Dos usuarios son diferentes aunque
 * tengan el mismo nombre, porque tienen IDs diferentes.
 *
 * Constructor privado — Solo se puede crear con register() o from().
 * register() — Crea un usuario nuevo (genera ID y fecha automáticamente).
 * from() — Reconstruye un usuario desde datos existentes (ej: base de datos).
 *
 * Analogía: UserId es como un número de cédula. User es la persona
 * asociada a ese número. Dos personas con el mismo nombre pero diferentes
 * cédulas son personas diferentes.
 */
import { Email } from '../value-objects/email';
import { Address } from '../value-objects/address';

/** Value Object: Identificador único de usuario */
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

/**
 * Entidad: User — Representa un usuario del dominio.
 * Propiedades: id, name, email, shippingAddress (opcional).
 */
export class User {
  /** Constructor privado: solo se crea con register() o from() */
  private constructor(
    private readonly id: UserId,
    private name: string,
    private email: Email,
    private shippingAddress: Address | null,
  ) {}

  /** Factory method: Registra un usuario nuevo (genera ID automáticamente) */
  static register(name: string, email: Email): User {
    return new User(UserId.generate(), name, email, null);
  }

  /** Factory method: Reconstruye un usuario desde datos existentes */
  static from(id: UserId, name: string, email: Email, shippingAddress: Address | null): User {
    return new User(id, name, email, shippingAddress);
  }

  /** Getters para acceder a las propiedades */
  getId(): UserId { return this.id; }
  getName(): string { return this.name; }
  getEmail(): Email { return this.email; }
  getShippingAddress(): Address | null { return this.shippingAddress; }

  /** Métodos de negocio: modifican el estado del usuario */
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
