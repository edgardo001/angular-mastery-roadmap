/**
 * Rutas del módulo de Inventario.
 * Se carga bajo demanda al visitar /inventory.
 */
import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';

export const INVENTORY_ROUTES: Routes = [
  { path: '', component: InventoryComponent },
];
