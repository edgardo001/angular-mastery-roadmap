// Punto de entrada de la aplicación Angular
// bootstrapApplication inicia la aplicación en el navegador
import { bootstrapApplication } from '@angular/platform-browser';
// AppComponent es el componente raíz que contiene toda la interfaz
import { AppComponent } from './app/app';
// appConfig define providers y configuración de la aplicación
import { appConfig } from './app/app.config';

// Iniciamos la aplicación Angular standalone
// Si hay error, lo mostramos en consola para depuración
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
