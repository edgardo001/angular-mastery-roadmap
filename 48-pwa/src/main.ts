// Punto de entrada de la aplicación Angular PWA (Progressive Web App)
// Una PWA funciona como una app nativa pero en el navegador
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

// Iniciamos la aplicación Angular standalone
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
