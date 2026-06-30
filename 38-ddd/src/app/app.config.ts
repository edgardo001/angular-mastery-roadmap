/**
 * Configuración de la aplicación DDD.
 *
 * Registra el repositorio de órdenes como provider.
 * En DDD, los repositorios son la capa de persistencia que guarda
 * y recupera entidades del dominio.
 *
 * { provide: TOKEN, useClass: Implementación } — Le dice a Angular:
 * "cuando alguien pida ORDER_REPOSITORY, crea una InMemoryOrderRepository".
 */
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { ORDER_REPOSITORY } from './domain/repositories/order-repository';
import { InMemoryOrderRepository } from './domain/repositories/in-memory-order-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: ORDER_REPOSITORY, useClass: InMemoryOrderRepository },
  ],
};
