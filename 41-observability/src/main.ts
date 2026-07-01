/**
 * ARCHIVO: main.ts - Punto de entrada de la aplicación Angular (Observabilidad)
 *
 * Este es el primer archivo que Angular ejecuta cuando inicia la aplicación.
 * Su función es "arrancar" (bootstrap) el componente raíz y configurar todos
 * los servicios que la aplicación necesita para funcionar.
 *
 * En este ejemplo, la aplicación demuestra cómo implementar observabilidad:
 * logging, manejo de errores y métricas de rendimiento (Web Vitals).
 */

// OpenTelemetry tracing: Se importa PRIMERO para que intercepte todas las peticiones HTTP
// desde el inicio de la aplicación. Si lo importas después, las primeras peticiones
// no serán rastreadas. Es como encender las cámaras de seguridad ANTES de abrir el almacén.
import './app/tracing';

// bootstrapApplication: Función de Angular que inicializa una aplicación standalone.
import { bootstrapApplication } from '@angular/platform-browser';

// Importamos la configuración de la aplicación (providers, interceptores, etc.)
import { appConfig } from './app/app.config';

// Importamos el componente raíz de la aplicación.
import { App } from './app/app';

/**
 * bootstrapApplication arranca la aplicación Angular con:
 * 1. El componente raíz (App) - el primer componente que se renderiza
 * 2. La configuración (appConfig) - lista de providers (servicios, interceptores, etc.)
 *
 * Si ocurre un error durante el arranque, se imprime en la consola del navegador.
 */
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
