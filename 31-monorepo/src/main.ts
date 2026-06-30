// =============================================================================
// ARCHIVO: main.ts
// PROPÓSITO: Punto de entrada que inicia la aplicación Angular del monorepo
// =============================================================================
//
// Este archivo arranca una app Angular dentro de un monorepositorio.
// Un monorepo es una estructura de proyecto donde MÚLTIPLES aplicaciones
// y librerías viven en un solo repositorio de Git.
//
// ¿Qué es un monorepo?
// Imagina un edificio de apartamentos: en lugar de tener casas separadas
// (repositorios separados), todos viven en el mismo edificio (monorepo).
// Comparten la piscina, el estacionamiento y la portería (librerías compartidas).
//
// Este proyecto simula la estructura de un monorepo con Nx,
// una herramienta que gestiona monorepos de Angular.
// =============================================================================

// bootstrapApplication: Función que inicializa la app standalone
import { bootstrapApplication } from '@angular/platform-browser';

// Componente raíz que muestra la estructura del monorepo
import { AppComponent } from './app/app.component';

// Configuración de la app (vacía para este proyecto de demo)
import { appConfig } from './app/app.config';

// Enciende la app. En un monorepo real, cada app tendría su propio main.ts
// y su propia configuración, pero comparten librerías del monorepo.
bootstrapApplication(AppComponent, appConfig).catch(console.error);
