// Punto de entrada de la aplicación Angular con State Machines
// Las máquinas de estados ayudan a manejar flujos complejos de UI
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

// Iniciamos la aplicación Angular standalone
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
