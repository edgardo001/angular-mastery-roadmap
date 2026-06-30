/**
 * ARCHIVO: main.ts - Punto de entrada de la aplicación Angular (.NET JWT)
 *
 * Este es el primer archivo que Angular ejecuta cuando inicia la aplicación.
 * Su función es "arrancar" (bootstrap) el componente raíz y configurar todos
 * los servicios que la aplicación necesita para funcionar.
 *
 * Analogía: Es como encender un computador. Antes de que puedas usar cualquier
 * programa, el sistema operativo debe cargar primero.
 */

// bootstrapApplication: Función de Angular que inicializa una aplicación standalone.
// "Standalone" significa que el componente raíz no necesita un módulo NgModule para funcionar.
import { bootstrapApplication } from '@angular/platform-browser';

// Importamos la configuración de la aplicación (providers, rutas, interceptores, etc.)
import { appConfig } from './app/app.config';

// Importamos el componente raíz de la aplicación (el "árbol" de todos los demás componentes)
import { AppComponent } from './app/app.component';

/**
 * bootstrapApplication arranca la aplicación Angular con:
 * 1. El componente raíz (AppComponent) - el primer componente que se renderiza
 * 2. La configuración (appConfig) - lista de providers (servicios, interceptores, etc.)
 *
 * Si ocurre un error durante el arranque, se imprime en la consola del navegador.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
