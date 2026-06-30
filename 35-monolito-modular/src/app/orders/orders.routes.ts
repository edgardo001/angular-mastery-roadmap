/**
 * Rutas del módulo de Órdenes.
 *
 * Cada módulo define sus propias rutas. Estas rutas se cargan de forma
 * lazy (bajo demanda) cuando el usuario visita /orders.
 *
 * path: '' — Ruta raíz del módulo (se carga al visitar /orders)
 * component: OrdersComponent — Componente que se muestra en esta ruta
 *
 * Las rutas se combinan con las rutas principales en app.routes.ts.
 */
import { Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';

export const ORDERS_ROUTES: Routes = [
  { path: '', component: OrdersComponent },
];
