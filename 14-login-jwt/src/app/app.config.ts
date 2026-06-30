// ============================================================================
// CONFIGURACIÓN DE LA APLICACIÓN (app.config.ts)
// ============================================================================
// Configuración completa para una app con JWT: rutas, HttpClient e interceptores.

import { ApplicationConfig } from '@angular/core';

// provideRouter: Habilita el enrutamiento (navegación entre páginas)
import { provideRouter } from '@angular/router';

// provideHttpClient: Habilita HttpClient con fetch y interceptores
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

// Importamos las rutas y los interceptores
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { mockBackendInterceptor } from './interceptors/mock-backend.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      // mockBackendInterceptor DEBE ir ANTES de authInterceptor
      // Porque simula las respuestas del servidor antes de que lleguen al servidor real
      // ANÁLOGÍA: Primero el recepcionista verifica tu cita, luego el guardia revisa tu ID
      withInterceptors([mockBackendInterceptor, authInterceptor]),
    ),
  ],
};
