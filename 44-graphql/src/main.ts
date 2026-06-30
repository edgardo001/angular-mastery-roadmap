/**
 * ARCHIVO: main.ts - Punto de entrada de la aplicación Angular (GraphQL)
 *
 * Este es el primer archivo que Angular ejecuta cuando inicia la aplicación.
 * Su función es "arrancar" (bootstrap) el componente raíz y configurar todos
 * los servicios que la aplicación necesita para funcionar.
 *
 * En este ejemplo, la aplicación demuestra cómo usar GraphQL con Angular
 * mediante la librería Apollo Angular. GraphQL es un lenguaje de consultas
 * alternativo a REST que permite al cliente solicitar exactamente los datos
 * que necesita, ni más ni menos.
 */

// bootstrapApplication: Función de Angular que inicializa una aplicación standalone.
import { bootstrapApplication } from '@angular/platform-browser';

// Importamos la configuración de la aplicación.
import { appConfig } from './app/app.config';

// Importamos el componente raíz de la aplicación.
import { App } from './app/app';

/**
 * bootstrapApplication arranca la aplicación Angular con:
 * 1. El componente raíz (App) - el primer componente que se renderiza
 * 2. La configuración (appConfig) - lista de providers (servicios, interceptores, etc.)
 */
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
