// ============================================================================
// ARCHIVO PRINCIPAL DE ARRANQUE (main.ts)
// ============================================================================
// Este es el punto de entrada de la aplicación Angular standalone (sin NgModule).
// Equivale al archivo main.ts que genera Angular CLI al crear un proyecto nuevo.

// bootstrapApplication: Función que "arranca" (inicializa) la aplicación Angular.
// Recibe dos argumentos:
//   1. El componente raíz (AppComponent) — el componente que se muestra primero.
//   2. La configuración de la aplicación (appConfig) — servicios, rutas, etc.

import { bootstrapApplication } from '@angular/platform-browser';

// Importamos el componente raíz que Angular renderizará en el DOM
import { AppComponent } from './app/app.component';

// Importamos la configuración de providers (servicios, HttpClient, rutas, etc.)
import { appConfig } from './app/app.config';

// .catch() captura errores si la aplicación falla al iniciar
// Ejemplo: si falta un provider obligatorio, Angular lanza un error aquí
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
