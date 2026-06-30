/**
 * Punto de entrada de la aplicación de Domain-Driven Design (DDD).
 *
 * DDD es un enfoque de diseño de software que pone el dominio de negocio
 * (reglas de negocio, entidades, value objects) en el centro del diseño.
 *
 * bootstrapApplication() arranca la aplicación standalone con la configuración.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
