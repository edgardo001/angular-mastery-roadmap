import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { ORDER_REPOSITORY } from './domain/repositories/order-repository';
import { InMemoryOrderRepository } from './domain/repositories/in-memory-order-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: ORDER_REPOSITORY, useClass: InMemoryOrderRepository },
  ],
};
