// ──────────────────────────────────────────────
// main.ts — Punto de entrada de la aplicación Angular
// ──────────────────────────────────────────────
//
// ANÁLOGÍA DEL MUNDO REAL:
// Imagina que una aplicación Angular es como una empresa.
// main.ts es la "persona que enciende las luces" del edificio.
// Sin este archivo, la empresa (app) simplemente no existe.
//
// Este archivo es el PRIMERO que Angular ejecuta. Su único
// trabajo es llamar bootstrapApplication para iniciar la app.
//
// Flujo de ejecución:
// 1. Angular carga index.html (la "puerta de entrada")
// 2. index.html referencia main.ts (el "interruptor principal")
// 3. main.ts llama bootstrapApplication (el "sistema de arranque")
// 4. bootstrapApplication crea el componente AppComponent (la "oficina central")
// 5. AppComponent se monta en <app-root> del DOM (donde se ve la app)
//
// Palabras clave:
//   - Bootstrap: proceso de arranque de la aplicación (como encender un computador)
//   - DOM: Document Object Model, la estructura del HTML que el navegador muestra

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// bootstrapApplication: función que inicializa la aplicación Angular
//
// ANÁLOGÍA: Es como el botón "Power On" de un televisor.
// Presionas una vez y todo el sistema se activa.
//
// Parámetros:
//   1. AppComponent → componente raíz (el "tronco" del árbol de componentes)
//   2. appConfig → configuración global (providers, router, HTTP client)
//
// ¿Qué es un componente raíz?
// Es como el director ejecutivo de una empresa: todo pasa por él.
// Todos los demás componentes son "hijos" o "empleados" de este componente.
//
// ¿Por qué no usamos NgModules?
// Angular 22 usa standalone components por defecto.
// No necesitas un AppModule para declarar componentes.
// Cada componente se declara a sí mismo y importa lo que necesita.
//
// Es como si cada empleado tuviera su propia oficina y se conectara
// directamente con quien necesita, sin pasar por un "mediador central".
//
// .catch(console.error): captura errores durante el bootstrap
// (por ejemplo, si falta un provider o el template tiene errores)
// Es como un sistema de seguridad que atrapa errores antes de que
// la aplicación se arranque completamente.
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
