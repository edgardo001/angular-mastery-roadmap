// =============================================================================
// ARCHIVO: main.ts
// PROPÓSITO: Punto de entrada que inicia la aplicación Angular en el navegador
// =============================================================================
//
// Este es el "botón de encendido" de la app. Ejecuta bootstrapApplication()
// que inicializa Angular y carga el componente raíz (App) con su configuración.
//
// En este proyecto se demuestra cómo integrar Tailwind CSS con Angular,
// incluyendo dark mode, diseño responsive y manejo de estado con signals.
// =============================================================================

// bootstrapApplication: Función que arranca una app Angular standalone.
// Toma dos argumentos: el componente raíz y la configuración.
import { bootstrapApplication } from '@angular/platform-browser';

// La configuración de la app (providers de servicios como Router)
import { appConfig } from './app/app.config';

// El componente raíz que se renderiza primero
import { App } from './app/app';

// Enciende la app: Angular carga App y lo muestra en el navegador.
// Si falla, imprime el error en consola para debugging.
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
