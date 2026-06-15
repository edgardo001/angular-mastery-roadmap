export interface AddressData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export class Address {
  private constructor(private readonly data: AddressData) {
    if (!data.street?.trim()) throw new Error('Calle requerida');
    if (!data.city?.trim()) throw new Error('Ciudad requerida');
    if (!data.country?.trim()) throw new Error('País requerido');
  }

  static of(data: AddressData): Address {
    return new Address({ ...data });
  }

  get street(): string { return this.data.street; }
  get city(): string { return this.data.city; }
  get state(): string { return this.data.state; }
  get zipCode(): string { return this.data.zipCode; }
  get country(): string { return this.data.country; }

  toString(): string {
    return `${this.data.street}, ${this.data.city}, ${this.data.state} ${this.data.zipCode}, ${this.data.country}`;
  }

  equals(other: Address): boolean {
    return this.toString() === other.toString();
  }
}
