/**
 * Value Object: Email con validación.
 *
 * Este value object valida que el email sea válido al momento de crearse.
 * Si el email es inválido, lanza un error inmediatamente (fail-fast).
 *
 * Patrón: Self-Validating Value Object.
 * Es como un portero de discoteca que no deja entrar a nadie sin ID válido.
 *
 * EMAIL_REGEX — Expresión regular que verifica:
 * - [^\s@]+ : Un o más caracteres que no sean espacio o @
 * - @ : El símbolo @
 * - [^\s@]+ : Un o más caracteres que no sean espacio o @
 * - \. : Un punto literal
 * - [^\s@]+ : Un o más caracteres que no sean espacio o @
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class Email {
  /**
   * Constructor privado: solo se puede crear con from().
   * Valida el email y lanza error si es inválido.
   */
  private constructor(private readonly value: string) {
    if (!EMAIL_REGEX.test(value)) {
      throw new Error(`Invalid email address: ${value}`);
    }
  }

  /** Factory method: Crea un Email validado */
  static from(value: string): Email {
    return new Email(value);
  }

  /** Convierte a string */
  toString(): string {
    return this.value;
  }

  /** Compara por valor */
  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
