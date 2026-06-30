/**
 * Barrel export (exportación tipo barril) del módulo compartido.
 *
 * Un barrel export re-exporta todo desde un solo punto de acceso.
 * En lugar de importar desde './types' y './contracts' por separado,
 * los módulos pueden importar solo desde './shared'.
 *
 * Es como un supermercado: no vas al granjero, al panadero y al carnicero
 * por separado. Vas al supermercado y compras todo en un lugar.
 *
 * El keyword 'type' antes de export indica que solo se exportan tipos
 * (interfaces), no valores en tiempo de ejecución.
 */

// Re-exporta tipos (interfaces) desde types.ts
export type { Order, InventoryItem, Invoice } from './types';

// Re-exporta interfaces de contratos e InjectionTokens desde contracts.ts
export type {
  OrderServiceContract,
  InventoryServiceContract,
  BillingServiceContract,
} from './contracts';

// Re-exporta los tokens de inyección (estos SÍ son valores en runtime)
export {
  ORDER_SERVICE,
  INVENTORY_SERVICE,
  BILLING_SERVICE,
} from './contracts';
