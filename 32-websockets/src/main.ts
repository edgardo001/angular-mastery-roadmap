/**
 * Archivo principal de entrada de la aplicación Angular.
 *
 * bootstrapApplication() es la función que arranca una aplicación Angular standalone
 * (sin módulos NgModule). Es como prender el motor de un auto: le dice a Angular
 * que cargue el componente raíz (AppComponent) y aplique la configuración (appConfig).
 *
 * @Component standalone: significa que el componente no depende de ningún NgModule
 * para funcionar. Es como un módulo independiente que trae todo lo que necesita.
 *
 * El catch maneja errores si la aplicación falla al iniciar.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Arrancamos la aplicación con el componente raíz y la configuración de proveedores
bootstrapApplication(AppComponent, appConfig).catch(console.error);
