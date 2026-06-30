// =============================================================================
// ARCHIVO: main.ts
// PROPÓSITO: Punto de entrada que inicia la aplicación Angular en el navegador
// =============================================================================
//
// Este archivo arranca la app Angular que será probada con Playwright E2E.
// Playwright es una herramienta de testing que simula un navegador real
// y verifica que la app funcione correctamente de extremo a extremo (E2E).
//
// Este proyecto muestra una app simple (lista de tareas) diseñada para
// ser testeada automáticamente con Playwright.
// =============================================================================

// bootstrapApplication: Función que inicializa la app standalone de Angular.
import { bootstrapApplication } from '@angular/platform-browser';

// Configuración de la app (providers como Router)
import { appConfig } from './app/app.config';

// Componente raíz de la app
import { App } from './app/app';

// Enciende la app Angular. Playwright luego abrirá esta app en un navegador
// y ejecutará pruebas automatizadas sobre ella.
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
