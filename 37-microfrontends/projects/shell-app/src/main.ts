/**
 * Punto de entrada del Shell App (aplicación contenedor).
 *
 * En arquitectura de microfrontends, el Shell es la aplicación principal
 * que carga y coordina las microaplicaciones (remotes).
 *
 * Analogía: El Shell es como el marco de una ventana.
 * Las microaplicaciones son los vidrios individuales que se insertan en el marco.
 * Cada vidrio (microfrontend) puede tener un diseño diferente,
 * pero todos encajan en el mismo marco (shell).
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
