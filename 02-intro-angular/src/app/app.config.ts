// ──────────────────────────────────────────────
// app.config.ts — Configuración global de la aplicación
// ──────────────────────────────────────────────
//
// Este archivo define los "providers" globales de Angular.
// Los providers son servicios, configuraciones y utilidades
// que están disponibles en toda la aplicación.
//
// ¿Qué es un provider?
// Un provider es un objeto que Angular puede inyectar
// en cualquier componente o servicio. Ejemplos:
//   - provideRouter() → habilita el enrutamiento
//   - provideHttpClient() → habilita las peticiones HTTP
//   - provideAnimations() → habilita animaciones
//
// En este ejemplo no hay providers porque es una app simple.
// En proyectos reales, verías algo como:
//
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(),
//   ]

import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [],
};
