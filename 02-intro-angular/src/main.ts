// ──────────────────────────────────────────────
// main.ts — Punto de entrada de la aplicación Angular
// ──────────────────────────────────────────────
//
// Este archivo es el PRIMERO que Angular ejecuta. Su único
// trabajo es llamar bootstrapApplication para iniciar la app.
//
// Flujo de ejecución:
// 1. Angular carga index.html
// 2. index.html referencia main.ts
// 3. main.ts llama bootstrapApplication
// 4. bootstrapApplication crea el componente AppComponent
// 5. AppComponent se monta en <app-root> del DOM

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// bootstrapApplication: función que inicializa la aplicación Angular
//
// Parámetros:
//   1. AppComponent → componente raíz (el "tronco" del árbol de componentes)
//   2. appConfig → configuración global (providers, router, HTTP client)
//
// ¿Por qué no usamos NgModules?
// Angular 22 usa standalone components por defecto.
// No necesitas un AppModule para declarar componentes.
// Cada componente se declara a sí mismo y importa lo que necesita.
//
// .catch(console.error): captura errores durante el bootstrap
// (por ejemplo, si falta un provider o el template tiene errores)
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
