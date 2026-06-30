/**
 * Punto de entrada de la aplicación de Monolito Modular.
 *
 * Un monolito modular es una arquitectura donde una sola aplicación
 * se divide en módulos bien definidos (orders, billing, inventory).
 * Es como un edificio grande con departamentos separados pero bajo
 * un mismo techo.
 *
 * bootstrapApplication() arranca la aplicación standalone con la configuración.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
