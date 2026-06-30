// ============================================================
// app.config.ts — Configuración de la app de IA
// ============================================================
// Configuración estándar: solo registramos el enrutador.
// No necesitamos HttpClient因为我们 usamos fetch() nativo de JavaScript.

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};

