/**
 * Configuración de la Microaplicación Remota.
 * No necesita proveedores especiales para funcionar.
 */
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
};
