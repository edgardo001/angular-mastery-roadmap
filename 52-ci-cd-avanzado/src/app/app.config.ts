// ============================================================
// app.config.ts — Configuración de la aplicación Angular
// ============================================================
// Este archivo configura los "proveedores" de la aplicación.
// Un proveedor es como un servicio que Angular usa internamente.
// Por ejemplo: el router (enrutador), HTTP client (cliente web), etc.

// ApplicationConfig es el tipo que define la estructura de configuración.
import { ApplicationConfig } from '@angular/core';

// provideRouter: le dice a Angular que use el enrutador con nuestras rutas.
import { provideRouter } from '@angular/router';

// Nuestras rutas definidas en app.routes.ts
import { routes } from './app.routes';

// La configuración de la aplicación: un objeto con un array de providers.
export const appConfig: ApplicationConfig = {
  providers: [
    // provideRouter(routes) registra el enrutador con las rutas que definimos.
    provideRouter(routes)
  ]
};

