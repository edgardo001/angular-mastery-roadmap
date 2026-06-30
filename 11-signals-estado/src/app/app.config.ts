// ============================================================================
// CONFIGURACIÓN DE LA APLICACIÓN (app.config.ts)
// ============================================================================
// Este archivo define los "providers" de la aplicación.
// Un provider es un servicio o funcionalidad que Angular puede inyectar.
// Es como el "menú de opciones" que le dice a Angular qué herramientas están disponibles.

// ApplicationConfig: Tipo que define la estructura de configuración de la app.
// Es como el plano de construcción de la aplicación.
import { ApplicationConfig } from '@angular/core';

// providers: Array vacío porque este ejemplo NO necesita servicios externos.
// Solo usamos signals y computed, que son parte del core de Angular.
// Si necesitáramos HttpClient o Router, los agregaríamos aquí.
export const appConfig: ApplicationConfig = {
  providers: [],
};
