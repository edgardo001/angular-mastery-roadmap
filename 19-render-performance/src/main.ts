/**
 * ARCHIVO DE ENTRADA PRINCIPAL (main.ts)
 * =======================================
 *
 * Punto de inicio de la aplicación Angular.
 * bootstrapApplication arranca la app con su configuración.
 *
 * ANÁLOGÍA: Es como el interruptor principal de una casa inteligente.
 * Cuando lo activas, todos los sistemas empiezan a funcionar.
 *
 * FLUJO:
 * 1. Angular carga el componente raíz (AppComponent)
 * 2. Aplica la configuración (appConfig)
 * 3. Renderiza la aplicación en el navegador
 */

// bootstrapApplication: Función que inicia una aplicación standalone
// "Standalone" significa que NO necesita módulos NgModule (forma moderna)
import { bootstrapApplication } from '@angular/platform-browser';

// Componente raíz que Angular va a mostrar en pantalla
import { AppComponent } from './app/app.component';

// Configuración de la aplicación (providers, servicios, etc.)
import { appConfig } from './app/app.config';

// Arranca la aplicación. Si hay error, lo muestra en consola
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
