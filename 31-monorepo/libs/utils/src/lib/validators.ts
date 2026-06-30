/**
 * Funciones de validación
 *
 * Utilidades para validar datos de entrada.
 * Funciones puras sin dependencias de Angular.
 */

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^\+?[\d\s-]{10,}$/.test(phone);
}
