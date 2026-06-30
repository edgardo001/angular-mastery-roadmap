// Injectable permite que Angular gestione este servicio automáticamente
import { Injectable } from '@angular/core';

// CSP = Content Security Policy (Política de Seguridad de Contenido)
// Un nonce es un número único de un solo uso que se usa para validar scripts
// Piensa en él como un código temporal que cambia cada vez que cargas la página
@Injectable({ providedIn: 'root' }) // providedIn: 'root' significa que está disponible en toda la app
export class CspService {
  // Almacenamos el nonce actual (null si no se ha generado)
  private nonce: string | null = null;

  // Genera un nonce aleatorio de 16 bytes (32 caracteres hexadecimales)
  // Un nonce es como un número de serie único: cada página carga tiene el suyo
  generateNonce(): string {
    // Creamos un array de 16 bytes (128 bits) para el nonce
    const array = new Uint8Array(16);
    // crypto.getRandomValues llena el array con números aleatorios seguros
    // A diferencia de Math.random(), estos son criptográficamente seguros
    crypto.getRandomValues(array);
    // Convertimos cada byte a hexadecimal (00-ff) y lo unimos
    // Resultado: algo como "a1b2c3d4e5f6..." (32 caracteres)
    this.nonce = Array.from(array)
      .map((b) => b.toString(16).padStart(2, '0')) // cada byte a 2 dígitos hex
      .join('');
    return this.nonce;
  }

  // Retorna el nonce actual sin regenerarlo
  getNonce(): string | null {
    return this.nonce;
  }

  // Verifica si un token coincide con el nonce actual
  // Útil para validar que un script fue autorizado por nuestro servidor
  verifyNonce(token: string): boolean {
    return this.nonce === token;
  }

  // Construye una política CSP que incluye el nonce
  // El nonce permite ejecutar solo los scripts que nosotros autorizamos
  buildCspWithNonce(basePolicy: string): string {
    const nonce = this.generateNonce();
    // Agregamos 'nonce-XXXXX' a la política CSP
    // Los scripts con este nonce pueden ejecutarse, los demás no
    return `${basePolicy} 'nonce-${nonce}'`;
  }
}
