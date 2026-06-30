/**
 * Configuración de la Remote App.
 *
 * La Remote App no necesita proveedores de router porque no tiene
 * navegación propia — se ejecuta dentro del Shell. Solo necesita
 * los providers básicos de Angular para funcionar como componente standalone.
 *
 * provideZoneChangeDetection — Requerido para que Angular detecte
 *   cambios en la UI. Sin esto, la app no respondería a interacciones.
 */
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
