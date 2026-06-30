/**
 * CONFIGURACIÓN DE LA APLICACIÓN CON TANSTACK QUERY
 * ==================================================
 *
 * Configura los providers necesarios para Angular y TanStack Query.
 * TanStack Query gestiona el estado del servidor (caché, reintentos, etc.)
 *
 * ANÁLOGÍA: Es como configurar una oficina:
 * - provideHttpClient(): Instala el teléfono para llamar a clientes (APIs)
 * - provideAngularQuery(): Instala un sistema de archivos inteligente (caché)
 *
 * PALABRAS CLAVE:
 * - provideBrowserGlobalErrorListeners(): Escucha errores del navegador
 * - provideHttpClient(): Habilita HttpClient para peticiones HTTP
 * - provideAngularQuery(): Configura TanStack Query con un QueryClient
 * - QueryClient: El "administrador" de caché de TanStack Query
 */

// ApplicationConfig: Tipo que define la configuración de la app
// provideBrowserGlobalErrorListeners: Escucha errores globales del navegador
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

// provideHttpClient: Habilita el servicio HTTP para hacer peticiones web
import { provideHttpClient } from '@angular/common/http';

// provideAngularQuery: Configura TanStack Query en Angular
// QueryClient: Gestiona caché, reintentos, actualizaciones automáticas
import { provideAngularQuery, QueryClient } from '@tanstack/angular-query-experimental';

// Exporta la configuración de la aplicación
export const appConfig: ApplicationConfig = {
  providers: [
    // Escucha errores globales del navegador (como un sistema de seguridad)
    provideBrowserGlobalErrorListeners(),
    // Habilita HttpClient para hacer peticiones HTTP a APIs
    provideHttpClient(),
    // Configura TanStack Query con un QueryClient (el "administrador de caché")
    provideAngularQuery(new QueryClient()),
  ]
};
