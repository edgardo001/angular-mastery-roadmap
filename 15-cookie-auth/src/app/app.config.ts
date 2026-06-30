// ============================================================================
// CONFIGURACIÓN DE LA APLICACIÓN (app.config.ts)
// ============================================================================
// Configuración para autenticación con cookies HttpOnly y protección XSRF.

import { ApplicationConfig } from '@angular/core';

// provideHttpClient: Habilita HttpClient
// withFetch(): Usa la API fetch nativa
// withInterceptors(): Registra interceptores
// withXsrfConfiguration(): Configura la protección contra CSRF/XSRF
import { provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration } from '@angular/common/http';

// cookieInterceptor: Agrega withCredentials: true a cada petición
import { cookieInterceptor } from './interceptors/cookie.interceptor';

// ANÁLOGÍA: La configuración es como las reglas de seguridad de un edificio.
// - withFetch: Usa el sistema de cámaras más moderno
// - withXsrfConfiguration: Configura los detectores de intrusos
// - withInterceptors: Agrega guardias en cada puerta
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      // Configuración XSRF: Angular lee la cookie XSRF-TOKEN y la envía como header
      // Esto protege contra ataques Cross-Site Request Forgery
      withXsrfConfiguration({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' }),
      withInterceptors([cookieInterceptor]),
    ),
  ],
};
