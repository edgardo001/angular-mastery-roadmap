// ============================================================
// main.ts — Punto de entrada de la app Three.js 3D
// ============================================================
// Esta app integra Angular con Three.js para crear visualizaciones 3D.
// Three.js es una librería de JavaScript para crear gráficos 3D en
// el navegador usando WebGL (la misma tecnología de los videojuegos).
// bootstrapApplication arranca la aplicación Angular.

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

