/**
 * ARCHIVO DE ENTRADA PRINCIPAL (main.ts)
 * =======================================
 *
 * Punto de inicio de la aplicación Angular con NgRx Signals Store.
 * bootstrapApplication arranca la app con su configuración.
 *
 * ANÁLOGÍA: Es como el interruptor principal de una casa inteligente.
 * Cuando lo activas, todos los sistemas (luces, calefacción, etc.) funcionan.
 */

// bootstrapApplication: Función que inicia una aplicación standalone
import { bootstrapApplication } from '@angular/platform-browser';

// Configuración de la aplicación (providers)
import { appConfig } from './app/app.config';

// Componente raíz de la aplicación
import { App } from './app/app';

// Arranca la aplicación. Si hay error, lo muestra en consola
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
