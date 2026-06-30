// ============================================================================
// CONFIGURACIÓN DE LA APLICACIÓN (app.config.ts)
// ============================================================================
// Configuración mínima para una app standalone sin rutas ni HttpClient.

import { ApplicationConfig } from '@angular/core';

// providers: Array vacío porque este ejemplo solo usa signals y computed
// No necesita servicios externos como HttpClient o Router
export const appConfig: ApplicationConfig = {
  providers: [],
};
