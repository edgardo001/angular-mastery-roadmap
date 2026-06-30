/**
 * ============================================================
 * main.ts — Punto de entrada de la aplicación Angular
 * ============================================================
 *
 * Este archivo es como el "botón de encendido" de un auto.
 * Cuando el navegador carga la página, ejecuta este archivo
 * y arranca toda la aplicación Angular.
 *
 * Analogía: Es como el director de una orquesta que levanta
 * la batuta y dice "¡empezamos!". Sin él, los músicos
 * (componentes) no sabrían cuándo comenzar.
 */

// bootstrapApplication: Función que "arranca" la aplicación standalone.
// "Standalone" significa que NO necesita un módulo NgModule (Angular moderno).
// Es como encender un televisor: solo presionas el botón y listo.
import { bootstrapApplication } from '@angular/platform-browser';

// AppComponent: El componente raíz de toda la aplicación.
// Es como la pantalla principal de una app de celular.
// TODO lo que el usuario ve, empieza desde aquí.
import { AppComponent } from './app/app.component';

// appConfig: Configuración general de la aplicación.
// Contiene los "servicios" que la app necesita para funcionar
// (rutas, HTTP client, animaciones, etc.)
// Es como el manual de instrucciones de un electrodoméstico.
import { appConfig } from './app/app.config';

/**
 * bootstrapApplication() — Inicia la aplicación
 *
 * Parámetros:
 *   1. AppComponent → Componente raíz que se va a renderizar
 *   2. appConfig    → Configuración con servicios necesarios
 *
 * .catch((err) => console.error(err)) → Si hay error al iniciar,
 *   lo muestra en la consola del navegador (F12).
 *
 * Flujo simplificado:
 *   1. Navegador carga index.html
 *   2. main.ts se ejecuta
 *   3. bootstrapApplication arranca Angular
 *   4. Angular renderiza AppComponent en el DOM
 */
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
