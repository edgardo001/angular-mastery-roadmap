/**
 * Value Object: Money — Representa dinero con moneda.
 *
 * Un value object Money garantiza que:
 * - No se pueden sumar pesos con dólares (misma moneda)
 * - El monto no puede ser negativo o infinito
 * - Las operaciones retornan nuevos objetos (inmutabilidad)
 *
 * Tipo Currency — Union type: solo permite 'USD', 'EUR' o 'MXN'.
 * Es como un selector de moneda que solo acepta opciones válidas.
 *
 * Constructor privado — Solo se puede crear con Money.of() o Money.zero().
 * assertSameCurrency() — Valida que ambas monedas sean iguales antes de operar.
 *
 * Analogía: Money es como una billete de banco. No puedes cortar un billete
 * por la mitad para sumar. Siempre trabajas con billetes completos.
 * Cada operación crea un billete nuevo.
 */
export type Currency = 'USD' | 'EUR' | 'MXN';

export class Money {
  /** Constructor privado con validación */
  private constructor(
    private readonly amount: number,
    private readonly currency: Currency,
  ) {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new Error(`Monto inválido: ${amount}`);
    }
  }

  /** Factory method: Crea un Money con monto y moneda */
  static of(amount: number, currency: Currency = 'USD'): Money {
    return new Money(amount, currency);
  }

  /** Factory method: Crea un Money con valor cero */
  static zero(currency: Currency = 'USD'): Money {
    return new Money(0, currency);
  }

  /** Suma dos Money de la misma moneda. Retorna un Money nuevo. */
  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency);
  }

  /** Resta dos Money de la misma moneda. No permite resultado negativo. */
  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    const result = this.amount - other.amount;
    if (result < 0) throw new Error('Resultado negativo no permitido');
    return new Money(result, this.currency);
  }

  /** Multiplica el monto por un factor. Retorna un Money nuevo. */
  multiply(factor: number): Money {
    return new Money(this.amount * factor, this.currency);
  }

  /** Retorna el monto numérico */
  getAmount(): number {
    return this.amount;
  }

  /** Retorna la moneda */
  getCurrency(): Currency {
    return this.currency;
  }

  /** Representación en string: "USD 999.99" */
  toString(): string {
    return `${this.currency} ${this.amount.toFixed(2)}`;
  }

  /** Compara por monto Y moneda */
  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  /**
   * Valida que ambas monedas sean iguales antes de operar.
   * Lanza error si son diferentes (ej: sumar USD + EUR).
   */
  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error(`Divisa不一致: ${this.currency} vs ${other.currency}`);
    }
  }
}
