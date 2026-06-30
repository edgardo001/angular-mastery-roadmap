/**
 * Rutas del módulo de Facturación.
 * Se carga bajo demanda (lazy loading) al visitar /billing.
 */
import { Routes } from '@angular/router';
import { BillingComponent } from './billing.component';

export const BILLING_ROUTES: Routes = [
  { path: '', component: BillingComponent },
];
