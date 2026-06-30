/**
 * CONFIGURACIÓN DE LA APLICACIÓN (app.config.ts)
 * ================================================
 *
 * Define los providers (servicios) que Angular usará en esta aplicación.
 * Esta app es simple, así que no necesita providers especiales.
 *
 * ANÁLOGÍA: Es como el manual de instrucciones de una casa.
 * Le dice a Angular qué servicios están disponibles.
 */

// ApplicationConfig: Tipo que define la estructura de configuración
import { ApplicationConfig } from '@angular/core';

// Exporta la configuración de la aplicación
// providers: [] vacío significa que no hay servicios especiales que configurar
export const appConfig: ApplicationConfig = {
  providers: [],
};
