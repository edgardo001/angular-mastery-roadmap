/**
 * Configuración del Shell App.
 *
 * No necesita proveedores especiales porque la comunicación entre
 * microfrontends se maneja a través del EventBus, no del router o HTTP.
 */
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
};
