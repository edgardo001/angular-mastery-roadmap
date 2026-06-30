// ──────────────────────────────────────────────
// app.config.ts — Configuración global de la aplicación
// ──────────────────────────────────────────────
//
// ANÁLOGÍA DEL MUNDO REAL:
// Imagina que una aplicación Angular es como una ciudad.
// app.config.ts es el "ayuntamiento" que decide qué servicios
// están disponibles para todos los ciudadanos (componentes).
//
// Este archivo define los "providers" globales de Angular.
// Los providers son servicios, configuraciones y utilidades
// que están disponibles en toda la aplicación.
//
// ¿Qué es un provider?
// Un provider es un objeto que Angular puede inyectar
// en cualquier componente o servicio. Ejemplos:
//   - provideRouter() → habilita el enrutamiento (como poner semáforos en la ciudad)
//   - provideHttpClient() → habilita las peticiones HTTP (como poner correo postal)
//   - provideAnimations() → habilita animaciones (como poner espectáculos públicos)
//
// ANÁLOGÍA: Los providers son como los "servicios públicos" de una ciudad.
// Sin agua (provideHttpClient), no puedes cocinar.
// Sin carreteras (provideRouter), no puedes viajar.
//
// En este ejemplo no hay providers porque es una app simple.
// En proyectos reales, verías algo como:
//
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(),
//   ]

import { ApplicationConfig } from '@angular/core';

// ApplicationConfig: tipo de TypeScript que define la estructura de configuración
// Es como un "formulario de registro" que le dice a Angular qué servicios ofrecer.
//
// ANÁLOGÍA: Es como el "catálogo de servicios" de un ayuntamiento.
// Si no pones nada en el catálogo, la ciudad no tiene servicios especiales.
export const appConfig: ApplicationConfig = {
  // providers: array de servicios disponibles en toda la aplicación
  // Cada provider es un "servicio público" que cualquier componente puede usar.
  //
  // En esta app simple, no hay providers (la ciudad no tiene servicios aún).
  providers: [],
};
