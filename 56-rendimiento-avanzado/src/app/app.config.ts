// ============================================================
// app.config.ts — Configuración de la app de rendimiento
// ============================================================
// Configuración estándar. No necesitamos providers especiales porque
// las técnicas de rendimiento son nativas de Angular o del navegador.

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};

