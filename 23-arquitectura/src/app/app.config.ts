/**
 * CONFIGURACIÓN DE LA APLICACIÓN (app.config.ts)
 * ================================================
 *
 * Define los providers (servicios) que Angular usará en esta aplicación.
 * Incluye configuración de rutas y listeners de errores.
 *
 * ANÁLOGÍA: Es como el manual de instrucciones de una casa.
 * Le dice a Angular qué servicios están disponibles.
 *
 * PALABRAS CLAVE:
 * - ApplicationConfig: Tipo que define la configuración de la app
 * - provideRouter: Habilita el sistema de rutas de Angular
 * - provideBrowserGlobalErrorListeners: Escucha errores del navegador
 */

// ApplicationConfig: Tipo que define la configuración de la app
// provideBrowserGlobalErrorListeners: Escucha errores globales del navegador
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

// provideRouter: Habilita el sistema de rutas de Angular
import { provideRouter } from '@angular/router';

// Importa las rutas definidas en app.routes.ts
import { routes } from './app.routes';

// Exporta la configuración de la aplicación
export const appConfig: ApplicationConfig = {
  providers: [
    // Escucha errores globales del navegador
    provideBrowserGlobalErrorListeners(),
    // Habilita el sistema de rutas con las rutas definidas
    provideRouter(routes)
  ]
};
