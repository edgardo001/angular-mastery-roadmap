// =============================================================================
// ARCHIVO: main.ts (punto de entrada del NAVEGADOR)
// PROPÓSITO: Inicia la aplicación Angular en el navegador del usuario
// =============================================================================
//
// Este es el archivo que el navegador ejecuta cuando carga tu app.
// Piensa en él como la "llave de encendido" de tu aplicación Angular.
//
// En SSR hay DOS puntos de entrada:
// - main.ts → ejecuta en el NAVEGADOR (del usuario)
// - main.server.ts → ejecuta en el SERVIDOR (cuando renderiza SSR)
//
// Ambos comparten la misma app, pero con configuraciones diferentes.
// =============================================================================

// bootstrapApplication es la función que "enciende" una app Angular standalone
// (sin NgModule). Es como prender un auto: necesita el motor (App) y
// la configuración (appConfig) para funcionar.
import { bootstrapApplication } from '@angular/platform-browser';

// La configuración de la app: define qué servicios y rutas están disponibles.
import { appConfig } from './app/app.config';

// El componente raíz de la aplicación - el "árbol" del que cuelgan
// todos los demás componentes.
import { App } from './app/app';

// Inicia la aplicación con el componente App y la configuración appConfig.
// Si algo falla durante el inicio, imprime el error en la consola.
// Esto es como darle la vuelta a la llave del auto: el motor arranca.
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
