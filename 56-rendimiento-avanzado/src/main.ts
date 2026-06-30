// ============================================================
// main.ts — Punto de entrada de la app de rendimiento avanzado
// ============================================================
// Esta app muestra técnicas avanzadas de optimización en Angular:
// ngOptimizedImage, @defer, virtual scrolling y Core Web Vitals.
// bootstrapApplication arranca la aplicación.

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

