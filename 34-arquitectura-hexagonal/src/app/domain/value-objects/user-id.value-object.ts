/**
 * Value Object: UserId.
 *
 * Un Value Object es un objeto que se compara por su VALOR, no por su identidad.
 * Dos UserId con el mismo valor son considerados iguales.
 *
 * Características de un Value Object:
 * - Inmutable: Una vez creado, no cambia
 * - Sin identidad propia: Se compara por valor
 * - Autovalidación: Se valida a sí mismo al crearse
 *
 * Constructor privado: Solo se puede crear con generate() o from().
 * crypto.randomUUID() genera un ID único global (ej: "550e8400-e29b-41d4-a716-446655440000").
 *
 * Analogía: Es como un número de pasaporte. No importa quién lo tenga,
 * lo que importa es el número impreso en él.
 */
export class UserId {
  /** Constructor privado: inmutabilidad garantizada */
  private constructor(private readonly value: string) {}

  /** Genera un UserId nuevo con un UUID único */
  static generate(): UserId {
    return new UserId(crypto.randomUUID());
  }

  /** Reconstruye un UserId desde un string existente */
  static from(value: string): UserId {
    return new UserId(value);
  }

  /** Convierte a string para mostrar o almacenar */
  toString(): string {
    return this.value;
  }

  /** Compara por valor: dos UserId son iguales si tienen el mismo string */
  equals(other: UserId): boolean {
    return this.value === other.value;
  }
}
