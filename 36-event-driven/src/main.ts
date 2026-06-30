/**
 * Punto de entrada de la aplicación de Event-Driven Architecture.
 *
 * La arquitectura orientada a eventos se basa en componentes que se comunican
 * a través de eventos, NO llamadas directas. Es como un sistema de altavoces:
 * uno publica un evento y todos los que estén escuchando lo reciben.
 *
 * bootstrapApplication() arranca la aplicación standalone.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
