// ============================================================================
// CONFIGURACIÓN DE LA APLICACIÓN (app.config.ts)
// ============================================================================
// Configuración mínima para una app standalone simple sin servicios externos.

import { ApplicationConfig } from '@angular/core';

// providers: Array vacío porque este ejemplo solo tiene un componente simple
// No necesita HttpClient, Router ni otros servicios
export const appConfig: ApplicationConfig = {
  providers: [],
};
