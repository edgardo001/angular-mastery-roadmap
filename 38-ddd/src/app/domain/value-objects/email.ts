/**
 * Value Object: Email con validación automática.
 *
 * Un Email value object garantiza que el email sea válido al momento de crearse.
 * Si el email es inválido, lanza un error inmediatamente (fail-fast).
 *
 * Patrón: Self-Validating Value Object.
 * Es como un portero que no deja entrar a nadie sin identificación válida.
 *
 * EMAIL_PATTERN — Expresión regular que verifica el formato básico de email.
 * Constructor privado — Solo se puede crear con Email.from().
 *
 * Características del Value Object:
 * - Inmutable: Una vez creado, no cambia
 * - Se compara por valor, no por referencia
 * - Se autovalida al crearse
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class Email {
  /** Constructor privado: inmutabilidad y validación garantizada */
  private constructor(private readonly value: string) {
    if (!EMAIL_PATTERN.test(value)) {
      throw new Error(`Email inválido: ${value}`);
    }
  }

  /** Factory method: Crea un Email validado */
  static from(value: string): Email {
    return new Email(value);
  }

  /** Convierte a string para mostrar o almacenar */
  toString(): string {
    return this.value;
  }

  /** Compara por valor: dos Emails son iguales si tienen el mismo texto */
  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
