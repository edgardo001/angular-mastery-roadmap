// ============================================================
// main.ts — Punto de entrada de la aplicación Ionic + Angular
// ============================================================
// Ionic es un framework para crear apps móviles con web technologies.
// Angular es el motor que maneja la lógica. Juntos, crean apps que
// se pueden compilar para iOS, Android y web.
// bootstrapApplication arranca la aplicación igual que en Angular puro.

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

