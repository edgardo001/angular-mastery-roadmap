/**
 * ARCHIVO DE ENTRADA PRINCIPAL (main.ts)
 * =======================================
 *
 * Punto de inicio de la aplicación Angular para Docker/Despliegue.
 * bootstrapApplication arranca la app con su configuración.
 *
 * ANÁLOGÍA: Es como el interruptor principal de una casa.
 * Cuando lo activas, todos los sistemas empiezan a funcionar.
 *
 * NOTA: Esta app está diseñada para ejecutarse en Docker.
 * El build de producción se ejecuta dentro de un contenedor.
 */

// bootstrapApplication: Función que inicia una aplicación standalone
import { bootstrapApplication } from '@angular/platform-browser';

// Configuración de la aplicación (providers, rutas, etc.)
import { appConfig } from './app/app.config';

// Componente raíz de la aplicación
import { App } from './app/app';

// Arranca la aplicación. Si hay error, lo muestra en consola
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
