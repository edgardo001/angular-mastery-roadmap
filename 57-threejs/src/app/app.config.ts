// ============================================================
// app.config.ts — Configuración de la app Three.js
// ============================================================
// Configuración estándar. Three.js es una librería externa,
// no necesita providers de Angular (se usa directamente).

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};

