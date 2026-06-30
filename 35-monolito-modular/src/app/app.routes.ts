/**
 * Definición de rutas de la aplicación.
 *
 * Angular Router mapea URLs a componentes. Cuando el usuario navega a "/orders",
 * Angular muestra OrdersComponent dentro del RouterOutlet.
 *
 * loadChildren — Lazy Loading: Carga el módulo solo cuando el usuario visita la ruta.
 * Es como descargar una app bajo demanda: solo descargas lo que necesitas.
 * () => import(...) retorna una función que carga el archivo cuando se necesita.
 *
 * path: '' — Ruta raíz del módulo (ej: /orders/)
 * redirectTo: '/orders' — Redirige la raíz al módulo de órdenes
 * pathMatch: 'full' — Solo redirige si la ruta es exactamente ''
 *
 * Analogía: Las rutas como un mapa de metro. Cada estación (ruta) lleva
 * a un destino diferente (componente), y puedes cambiar de línea (módulo).
 */
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.routes').then(m => m.ORDERS_ROUTES),
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.routes').then(m => m.INVENTORY_ROUTES),
  },
  {
    path: 'billing',
    loadChildren: () => import('./billing/billing.routes').then(m => m.BILLING_ROUTES),
  },
];
