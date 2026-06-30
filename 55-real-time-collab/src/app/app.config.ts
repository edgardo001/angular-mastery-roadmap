// ============================================================
// app.config.ts — Configuración de la app de colaboración
// ============================================================
// Configuración estándar: solo registramos el enrutador.
// No necesitamos providers adicionales para WebRTC/WebSocket porque
// son APIs nativas del navegador (no de Angular).

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};

