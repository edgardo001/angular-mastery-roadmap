// ============================================================
// main.ts — Punto de entrada de la app de integración con IA
// ============================================================
// Esta app conecta Angular con la API de OpenAI para crear un chat
// con inteligencia artificial. bootstrapApplication arranca la app.

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

