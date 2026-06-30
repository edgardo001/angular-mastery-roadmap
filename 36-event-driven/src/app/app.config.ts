/**
 * Configuración de la aplicación Event-Driven.
 *
 * Registra los servicios como providers:
 * - EventBusService: El "buzón" central donde se publican y reciben eventos
 * - EventLogger: Middleware que registra todos los eventos que pasan
 * - OrderSaga: Orquestador que coordina el flujo de una orden paso a paso
 *
 * Analogía: Es como la configuración de una estación de radio.
 * El EventBus es la frecuencia, el Logger es el que graba las transmisiones,
 * y el Saga es el presentador que coordina el programa.
 */
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { EventBusService } from './events/event-bus';
import { EventLogger } from './events/event-logger';
import { OrderSaga } from './sagas/order-saga';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    EventBusService, // Servicio central de eventos
    EventLogger,     // Middleware de logging
    OrderSaga,       // Orquestador de flujos
  ],
};
