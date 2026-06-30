/**
 * Configuración de la aplicación con Monolito Modular.
 *
 * Este archivo es el "centro de control" que registra:
 * 1. El router para navegación entre módulos
 * 2. Los servicios de cada módulo (orders, billing, inventory)
 * 3. Los tokens de inyección para desacoplar módulos
 *
 * Patrón: Los módulos se comunican a través de interfaces (contratos),
 * NO directamente entre sí. Esto permite cambiar implementaciones
 * sin afectar a otros módulos.
 *
 * Analogía: Es como una empresa con departamentos separados:
 * - Cada departamento tiene sus propios servicios
 * - Se comunican a través de interfaces formales (contratos)
 * - Puedes cambiar de proveedor sin afectar a otros departamentos
 */
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { OrdersService } from './orders/orders.service';
import { InventoryService } from './inventory/inventory.service';
import { BillingService } from './billing/billing.service';
import { ORDER_SERVICE, INVENTORY_SERVICE, BILLING_SERVICE } from './shared';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    // Cada módulo se registra con su token y clase concreta
    { provide: ORDER_SERVICE, useClass: OrdersService },
    { provide: INVENTORY_SERVICE, useClass: InventoryService },
    { provide: BILLING_SERVICE, useClass: BillingService },
  ],
};
