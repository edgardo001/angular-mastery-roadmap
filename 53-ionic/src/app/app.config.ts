// ============================================================
// app.config.ts — Configuración de la app Ionic
// ============================================================
// Igual que en Angular puro, configuramos los proveedores aquí.
// El router es el servicio que maneja la navegación entre pantallas.

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};

