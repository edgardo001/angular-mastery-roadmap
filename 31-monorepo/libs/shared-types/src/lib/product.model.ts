/**
 * Modelo de Producto
 *
 * Interfaz compartida entre admin y client apps.
 * Usada para el catálogo de productos en ambas apps.
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}
