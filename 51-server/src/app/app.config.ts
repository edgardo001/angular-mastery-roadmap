// ApplicationConfig: configuración de la aplicación Angular
import { ApplicationConfig } from '@angular/core';
// provideRouter: habilita el sistema de rutas de Angular
import { provideRouter } from '@angular/router';
// Importamos las definiciones de rutas
import { routes } from './app.routes';

// Configuración con soporte para rutas
export const appConfig: ApplicationConfig = {
  providers: [
    // provideRouter: registra el router para navegar entre páginas
    // Sin esto, ngRouter no funciona en la aplicación
    provideRouter(routes)
  ]
};

