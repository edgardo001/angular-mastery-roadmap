/**
 * Punto de entrada de la Microaplicación Remota.
 *
 * La Remote App es una microaplicación independiente que se carga
 * dentro del Shell App. Tiene su propio bootstrap y configuración.
 *
 * En una arquitectura real de microfrontends, esta app estaría
 * desplegada en un servidor separado y se cargaría dinámicamente.
 *
 * Analogía: La Remote App es como unplugin de Photoshop.
 * Se carga dentro de la aplicación principal (Shell) y puede
 * funcionar de forma independiente.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
