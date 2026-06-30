// =============================================================================
// ARCHIVO: main.ts
// PROPÓSITO: Punto de entrada que inicia la aplicación Angular para Storybook
// =============================================================================
//
// Este archivo arranca la app Angular que contiene los componentes
// documentados con Storybook. Storybook es una herramienta para desarrollar,
// documentar y probar componentes de UI de forma aislada.
//
// ¿Qué es Storybook?
// Piensa en Storybook como un "catálogo de piezas LEGO": en lugar de
// construir el edificio completo para ver cómo se ve una pieza,
// Storybook te muestra cada pieza individualmente, con controles
// para probar diferentes configuraciones y estados.
// =============================================================================

// bootstrapApplication: Función que inicializa la app standalone de Angular
import { bootstrapApplication } from '@angular/platform-browser';

// Componente raíz que muestra los componentes Button y Card
import { AppComponent } from './app/app.component';

// Configuración de la app (vacía porque Storybook maneja su propia config)
import { appConfig } from './app/app.config';

// Enciende la app. Storybook también puede usar esta configuración
// para renderizar los componentes en su interfaz web.
bootstrapApplication(AppComponent, appConfig).catch(console.error);
