// Archivo de tipos TypeScript para el módulo BFF (Backend For Frontend)
// Los interfaces definen la estructura de los objetos que usamos en la aplicación
// Como un plano de una casa: especifica qué campos tiene cada objeto

// User: información básica del usuario (datos seguros para el frontend)
export interface User {
  id: number;
  name: string;
  email: string;
  role: string; // Ejemplo: 'admin', 'user', 'manager'
}

// RawUser: extiende User con datos SENSIBLES que NO deben mostrarse al frontend
// El BFF debe filtrar estos campos antes de enviarlos al navegador
export interface RawUser extends User {
  numSeguroSocial: string; // Número de seguro social (datos personales)
  tarjetaCredito: string; // Número de tarjeta de crédito (datos financieros)
}

// Order: representa un pedido/orden de compra
export interface Order {
  id: number;
  userId: number; // ID del usuario que hizo el pedido
  product: string; // Nombre del producto
  quantity: number; // Cantidad ordenada
  total: number; // Total a pagar
  status: string; // Estado: 'pending', 'shipped', 'delivered', etc.
}

// Product: información de un producto disponible para venta
export interface Product {
  id: number;
  name: string;
  price: number; // Precio en centavos o dólares
  stock: number; // Cantidad disponible en inventario
  category: string; // Categoría: 'electronics', 'clothing', etc.
}

// BffDashboardData: datos agregados que el BFF envía al frontend
// Combina información de múltiples fuentes en una sola respuesta
export interface BffDashboardData {
  user: User; // Datos del usuario (sin campos sensibles)
  orders: Order[]; // Lista de pedidos
  products: Product[]; // Lista de productos
  summary: {
    totalOrders: number; // Total de pedidos
    totalRevenue: number; // Ingresos totales
    lowStockProducts: number; // Productos con stock bajo
  };
}

// LoginResponse: respuesta del endpoint de login
export interface LoginResponse {
  sessionId: string; // ID de sesión para autenticación
  user: User; // Datos del usuario autenticado
}

// TransformedProduct: producto transformado por el BFF
// El BFF convierte datos crudos en formato más amigable para el frontend
export interface TransformedProduct {
  id: number;
  label: string; // Nombre formateado para mostrar
  priceFormatted: string; // Precio formateado: "$29.99"
  available: boolean; // true si stock > 0, false si agotado
}
