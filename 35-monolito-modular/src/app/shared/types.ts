/**
 * Tipos compartidos entre todos los módulos del monolito.
 *
 * Estas interfaces definen la estructura de datos que usan los módulos
 * de orders, billing e inventory. Es como un diccionario compartido:
 * todos hablan el mismo idioma.
 *
 * Usar interfaces en lugar de clases permite:
 * - Menor acoplamiento entre módulos
 * - Fácil sustitución de implementaciones
 * - Mejor rendimiento (no hay sobrecarga de clases)
 *
 * Analogía: Son como los formularios estándar de una empresa.
 * Todos los departamentos usan el mismo formato para órdenes, facturas, etc.
 */

/** Modelo de una orden de compra */
export interface Order {
  id: string;         // ID único de la orden
  productId: string;  // ID del producto ordenado
  quantity: number;   // Cantidad ordenada
  total: number;      // Precio total
  status: 'pending' | 'confirmed' | 'shipped' | 'cancelled'; // Estado actual
  createdAt: Date;    // Fecha de creación
}

/** Modelo de un ítem de inventario */
export interface InventoryItem {
  id: string;         // ID único del ítem
  productId: string;  // ID del producto
  name: string;       // Nombre del producto
  stock: number;      // Cantidad disponible en bodega
  price: number;      // Precio unitario
}

/** Modelo de una factura */
export interface Invoice {
  id: string;         // ID único de la factura
  orderId: string;    // ID de la orden asociada
  amount: number;     // Monto a pagar
  paid: boolean;      // ¿Ya se pagó?
  issuedAt: Date;     // Fecha de emisión
}
