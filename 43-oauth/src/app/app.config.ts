/**
 * ARCHIVO: app.config.ts - Configuración de la aplicación Angular (OAuth)
 *
 * Este archivo configura los providers necesarios para la autenticación OAuth2:
 * - Cliente HTTP con interceptor de autenticación
 * - Configuración OIDC con el proveedor de identidad
 *
 * Analogía: Es como configurar un sistema de seguridad en un edificio.
 * Instalas las cámaras (interceptor), conectas la alarma (proveedor OIDC)
 * y configuras quién tiene acceso (providers).
 */

// ApplicationConfig: Tipo que define la estructura de la configuración.
import { ApplicationConfig } from '@angular/core';

// provideRouter: Función que configura el sistema de enrutamiento.
import { provideRouter } from '@angular/router';

// provideAuth: Función de angular-auth-oidc-client que configura la autenticación OIDC.
// authInterceptor: Interceptor que agrega el token de acceso a las peticiones HTTP.
import { provideAuth, authInterceptor } from 'angular-auth-oidc-client';

// Importamos la configuración del proveedor de identidad.
import { authConfig } from './auth.config';

// provideHttpClient: Configura el cliente HTTP.
// withInterceptors: Permite agregar interceptores a las peticiones HTTP.
import { provideHttpClient, withInterceptors } from '@angular/common/http';

/**
 * appConfig: Configuración de la aplicación.
 *
 * providers:
 * 1. Cliente HTTP con interceptor de autenticación: Cada petición HTTP
 *    llevará automáticamente el token de acceso OAuth2.
 * 2. Configuración OIDC: Define el proveedor de identidad, permisos,
 *    y cómo manejar tokens.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * provideHttpClient(withInterceptors([authInterceptor()])):
     * Configura el cliente HTTP y le agrega el interceptor de autenticación.
     * authInterceptor() es una función que la librería angular-auth-oidc-client
     * proporciona para agregar automáticamente el token de acceso a cada petición.
     */
    provideHttpClient(withInterceptors([authInterceptor()])),

    /**
     * provideAuth({ config: authConfig }):
     * Configura el servicio de autenticación OIDC con nuestra configuración.
     * Esto registra OidcSecurityService como provider disponible en toda la app.
     */
    provideAuth({ config: authConfig }),
  ],
};
