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
