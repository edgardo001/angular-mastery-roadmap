/**
 * Value Object: Address — Representa una dirección física.
 *
 * Un Address es un value object compuesto (hecho de otros valores).
 * Se valida al crearse: calle, ciudad y país son obligatorios.
 *
 * Interface AddressData — Define la estructura de datos de entrada.
 * Es como un formulario: el value object espera recibir estos campos.
 *
 * Constructor privado — Solo se puede crear con Address.of().
 * Se crea una copia del objeto de entrada ({ ...data }) para garantizar inmutabilidad.
 *
 * Características:
 * - Inmutable: No se puede modificar después de crear
 * - Se compara por valor (el string completo de la dirección)
 * - Autovalida campos obligatorios
 *
 * Analogía: Es como una etiqueta de envío. Una vez impresa, no cambias
 * la dirección. Si necesitas otra, creas una etiqueta nueva.
 */

/** Interfaz que define la estructura de datos de una dirección */
export interface AddressData {
  street: string;  // Calle y número
  city: string;    // Ciudad
  state: string;   // Estado/Provincia
  zipCode: string; // Código postal
  country: string; // País
}

export class Address {
  /** Constructor privado con validación de campos obligatorios */
  private constructor(private readonly data: AddressData) {
    if (!data.street?.trim()) throw new Error('Calle requerida');
    if (!data.city?.trim()) throw new Error('Ciudad requerida');
    if (!data.country?.trim()) throw new Error('País requerido');
  }

  /** Factory method: Crea un Address validado */
  static of(data: AddressData): Address {
    return new Address({ ...data }); // Copia para inmutabilidad
  }

  /** Getters para acceder a cada campo de la dirección */
  get street(): string { return this.data.street; }
  get city(): string { return this.data.city; }
  get state(): string { return this.data.state; }
  get zipCode(): string { return this.data.zipCode; }
  get country(): string { return this.data.country; }

  /** Representación en string completa de la dirección */
  toString(): string {
    return `${this.data.street}, ${this.data.city}, ${this.data.state} ${this.data.zipCode}, ${this.data.country}`;
  }

  /** Compara por el string completo de la dirección */
  equals(other: Address): boolean {
    return this.toString() === other.toString();
  }
}
