/**
 * CONFIGURACIÓN DE LA APLICACIÓN (app.config.ts)
 * ================================================
 *
 * Define los providers (servicios) que Angular usará en esta aplicación.
 * Esta app usa NgRx Signals Store para manejar estado global.
 *
 * ANÁLOGÍA: Es como el manual de instrucciones de una casa inteligente.
 * Le dice a Angular qué sistemas están disponibles.
 *
 * PALABRAS CLAVE:
 * - ApplicationConfig: Tipo que define la configuración de la app
 * - provideBrowserGlobalErrorListeners: Escucha errores del navegador
 */

// ApplicationConfig: Tipo que define la configuración de la app
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

// Exporta la configuración de la aplicación
export const appConfig: ApplicationConfig = {
  providers: [
    // Escucha errores globales del navegador (como un sistema de seguridad)
    provideBrowserGlobalErrorListeners(),
  ]
};
