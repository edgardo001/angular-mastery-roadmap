export type Currency = 'USD' | 'EUR' | 'MXN';

export class Money {
  private constructor(
    private readonly amount: number,
    private readonly currency: Currency,
  ) {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new Error(`Monto inválido: ${amount}`);
    }
  }

  static of(amount: number, currency: Currency = 'USD'): Money {
    return new Money(amount, currency);
  }

  static zero(currency: Currency = 'USD'): Money {
    return new Money(0, currency);
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    const result = this.amount - other.amount;
    if (result < 0) throw new Error('Resultado negativo no permitido');
    return new Money(result, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(this.amount * factor, this.currency);
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): Currency {
    return this.currency;
  }

  toString(): string {
    return `${this.currency} ${this.amount.toFixed(2)}`;
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error(`Divisa不一致: ${this.currency} vs ${other.currency}`);
    }
  }
}
