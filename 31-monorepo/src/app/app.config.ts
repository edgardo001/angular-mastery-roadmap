// =============================================================================
// ARCHIVO: app.config.ts
// PROPÓSITO: Configuración mínima de la app Angular para monorepo
// =============================================================================
//
// Esta configuración es intencionalmente simple porque el foco de este
// proyecto es la ESTRUCTURA del monorepo, no funcionalidades avanzadas.
//
// En un monorepo real, esta configuración podría incluir:
// - provideRouter() para rutas
// - provideHttpClient() para llamadas HTTP
// - Servicios compartidos de librerías del monorepo
// =============================================================================

// ApplicationConfig: Tipo del objeto de configuración
import { ApplicationConfig } from '@angular/core';

// Configuración vacía: el foco está en la estructura del monorepo,
// no en funcionalidades de la app.
export const appConfig: ApplicationConfig = { providers: [] };
