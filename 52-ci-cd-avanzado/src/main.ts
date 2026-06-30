// ============================================================
// main.ts — Punto de entrada de la aplicación Angular
// ============================================================
// bootstrapApplication es la función que "enciende" la aplicación.
// Imagina que es como prender una computadora: le dice al navegador
// que cargue el componente principal y toda la configuración.

import { bootstrapApplication } from '@angular/platform-browser';

// appConfig contiene los proveedores: servicios que Angular necesita
// para funcionar (rutas, HTTP, animaciones, etc.)
import { appConfig } from './app/app.config';

// App es el componente raíz — el "padre" de todos los demás componentes.
import { App } from './app/app';

// Iniciamos la aplicación con el componente App y la configuración.
// Si algo falla, lo mostramos en la consola del navegador.
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

