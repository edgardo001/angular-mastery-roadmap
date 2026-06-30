/**
 * Configuración del Shell App.
 *
 * provideRouter(routes) — Registra las rutas de la aplicación.
 *   Es obligatorio para que <router-outlet> y RouterLink funcionen.
 *   Las rutas incluyen la carga dinámica del remote via loadRemoteModule.
 *
 * provideZoneChangeDetection — Configura Zone.js para coalescer
 *   eventos de detección de cambios. Mejora el rendimiento al agrupar
 *   múltiples cambios en un solo ciclo de detección.
 *
 * Analogía: proveer es como enchufar dispositivos a una regleta.
 *   Cada provider es un dispositivo que necesita electricidad (funcionalidad)
 *   para funcionar: router, http, animations, etc.
 */
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
