/**
 * Funciones de formateo de datos
 *
 * Utilidades para formatear números, fechas y strings.
 * Estas funciones son puras (sin dependencias de Angular)
 * y pueden usarse en cualquier parte del monorepo.
 */

/**
 * Formatea un número como moneda
 * Ejemplo: formatCurrency(1234.56) → "$1,234.56"
 */
export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}

/**
 * Formatea una fecha como string legible
 * Ejemplo: formatDate(new Date()) → "30 de junio de 2026"
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric', month: 'long', day: 'numeric'
  }).format(date);
}

/**
 * Trunca un string a la longitud máxima
 * Ejemplo: truncate("Hello World", 5) → "Hello..."
 */
export function truncate(str: string, maxLength: number): string {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
}
