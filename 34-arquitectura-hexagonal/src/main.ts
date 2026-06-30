/**
 * Punto de entrada de la aplicación de Arquitectura Hexagonal.
 *
 * bootstrapApplication() arranca la aplicación Angular standalone.
 * La Arquitectura Hexagonal (Ports & Adapters) separa la lógica de negocio
 * de los detalles técnicos (HTTP, bases de datos, etc.).
 *
 * Analogía: Es como un cargador de celular universal (puerto) que funciona
 * con cualquier enchufe (adaptador) del mundo.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
