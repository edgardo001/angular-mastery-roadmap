// Punto de entrada de la aplicación Angular con Server-Side Rendering (SSR)
// SSR renderiza la app en el servidor antes de enviarla al navegador
// Mejora SEO, rendimiento inicial, y funciona con JavaScript deshabilitado
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Iniciamos la aplicación Angular standalone
// En SSR, esto se ejecuta tanto en el servidor como en el navegador
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

