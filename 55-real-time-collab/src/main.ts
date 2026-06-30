// ============================================================
// main.ts — Punto de entrada de la app de colaboración en tiempo real
// ============================================================
// Esta app permite a múltiples usuarios editar el mismo documento
// simultáneamente, similar a Google Docs. bootstrapApplication
// arranca la aplicación Angular.

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

