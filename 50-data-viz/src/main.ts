// Punto de entrada de la aplicación Angular de visualización de datos
// Usa ng2-charts para crear gráficos interactivos con Chart.js
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

// Iniciamos la aplicación Angular standalone
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
