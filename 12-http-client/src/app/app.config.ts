// ============================================================================
// CONFIGURACIÓN DE LA APLICACIÓN (app.config.ts)
// ============================================================================
// Aquí configuramos HttpClient con interceptores funcionales.
// Los interceptores son como " filtros" que se aplican a CADA petición HTTP.

import { ApplicationConfig } from '@angular/core';

// provideHttpClient: Función que habilita HttpClient en la aplicación
// withFetch(): Usa la API fetch nativa del navegador en lugar de XMLHttpRequest
// withInterceptors(): Registra interceptores que procesan cada petición HTTP
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

// Importamos los 3 interceptores que configuraremos
import { loggingInterceptor } from './interceptors/logging.interceptor';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';

// ANÁLOGÍA: Los interceptores son como los controles de seguridad en un aeropuerto.
// Cada pasajero (petición HTTP) debe pasar por cada control:
// 1. loggingInterceptor: Registra quién entra y sale (método, URL, duración)
// 2. authInterceptor: Verifica el pasaporte (token de autenticación)
// 3. errorInterceptor: Maneja problemas si algo sale mal
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      // Los interceptores se ejecutan en el orden del array:
      // logging → auth → error → petición real → respuesta
      withInterceptors([loggingInterceptor, authInterceptor, errorInterceptor]),
    ),
  ],
};
