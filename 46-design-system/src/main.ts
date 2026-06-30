// Importamos la función para iniciar la aplicación Angular standalone
import { bootstrapApplication } from '@angular/platform-browser';
// AppComponent es el componente raíz que contiene toda la interfaz
import { AppComponent } from './app/app';
// appConfig contiene la configuración (providers, rutas, etc.)
import { appConfig } from './app/app.config';

// Iniciamos la aplicación Angular en el navegador
// Si hay un error, lo mostramos en la consola del navegador
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
