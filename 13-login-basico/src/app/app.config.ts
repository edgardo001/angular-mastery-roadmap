// ============================================================================
// CONFIGURACIÓN DE LA APLICACIÓN (app.config.ts)
// ============================================================================
// Aquí configuramos los providers (servicios) que la aplicación necesita.

import { ApplicationConfig } from '@angular/core';

// provideRouter: Habilita el enrutamiento (navegación entre páginas)
import { provideRouter } from '@angular/router';

// provideHttpClient: Habilita HttpClient para hacer peticiones HTTP
import { provideHttpClient } from '@angular/common/http';

// Importamos las rutas definidas en app.routes.ts
import { routes } from './app.routes';

// providers: Lista de servicios y configuraciones de la app
// Es como el "manual de instrucciones" que le dice a Angular qué herramientas usar
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),      // Habilita navegación entre páginas
    provideHttpClient(),        // Habilita peticiones HTTP al servidor
  ],
};
