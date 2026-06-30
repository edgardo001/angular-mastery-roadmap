/**
 * ARCHIVO DE ENTRADA PRINCIPAL (main.ts)
 * =======================================
 *
 * Este es el punto de inicio de toda aplicación Angular standalone.
 * Es como el interruptor principal de una casa: cuando lo enciendes,
 * todo el sistema empieza a funcionar.
 *
 * ANÁLOGÍA: bootstrapApplication es como "prender" la aplicación.
 * Le dice a Angular: "aquí está el componente raíz y esta es la configuración,
 * ahora empieza a funcionar".
 *
 * FLUJO:
 * 1. Angular busca el componente raíz (AppComponent)
 * 2. Aplica la configuración (appConfig) que define servicios y providers
 * 3. Renderiza el componente en el navegador
 * 4. Si hay un error, lo muestra en la consola
 */

// bootstrapApplication: Función que arranca una aplicación standalone
// "Standalone" significa que NO necesita un módulo NgModule traditional
import { bootstrapApplication } from '@angular/platform-browser';

// El componente raíz que Angular va a renderizar en pantalla
import { AppComponent } from './app/app.component';

// La configuración de la aplicación (providers, rutas, servicios, etc.)
import { appConfig } from './app/app.config';

// Inicia la aplicación. Es como encender el motor de un auto.
// Si hay error, lo muestra en consola (err = error)
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
