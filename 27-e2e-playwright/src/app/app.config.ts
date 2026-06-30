// =============================================================================
// ARCHIVO: app.config.ts
// PROPÓSITO: Configuración de la aplicación Angular (providers disponibles)
// =============================================================================
//
// Define los servicios (providers) que están disponibles globalmente
// en la aplicación. Es como el "presupuesto de herramientas" que le dice
// a Angular qué servicios tiene disponibles para usar.
//
// Este proyecto solo necesita Router y listeners de errores,
// ya que es una app simple diseñada para testing E2E.
// =============================================================================

// ApplicationConfig: Tipo del objeto de configuración de la app
// provideBrowserGlobalErrorListeners: Captura errores no manejados en el navegador
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

// provideRouter: Habilita el sistema de rutas de Angular
import { provideRouter } from '@angular/router';

// Rutas definidas (vacías en este proyecto)
import { routes } from './app.routes';

// Configuración completa exportada para usar en main.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
