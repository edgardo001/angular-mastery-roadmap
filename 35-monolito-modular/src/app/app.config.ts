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
    { provide: ORDER_SERVICE, useClass: OrdersService },
    { provide: INVENTORY_SERVICE, useClass: InventoryService },
    { provide: BILLING_SERVICE, useClass: BillingService },
  ],
};
