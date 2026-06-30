/**
 * Punto de entrada del Shell App (aplicación contenedor).
 *
 * bootstrapApplication — Función de Angular Platform Browser que inicializa
 *   una aplicación standalone. Recibe el componente raíz (AppComponent)
 *   y la configuración de providers (appConfig).
 *
 * En Module Federation, el Shell es el host: la app que carga remotos.
 * Su main.ts es igual al de cualquier app Angular standalone.
 *
 * Analogía: Es como encender el motor de un auto. La configuración (appConfig)
 *   es el panel de instrumentos, y el componente raíz (AppComponent) es
 *   el volante que controla todo.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
