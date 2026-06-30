/**
 * CONFIGURACIÓN DE LA APLICACIÓN (app.config.ts)
 * ================================================
 *
 * Este archivo define la configuración de la aplicación Angular.
 * Aquí se declaran los "providers" (proveedores) que Angular usará
 * para crear servicios y funcionalidades.
 *
 * ANÁLOGÍA: Es como el manual de instrucciones de una casa.
 * Le dice a Angular qué servicios están disponibles y cómo crearlos.
 *
 * PALABRAS CLAVE:
 * - ApplicationConfig: Tipo que define la estructura de configuración
 * - provideHttpClient(): Habilita el servicio HTTP para hacer peticiones web
 * - providers: Array de servicios que Angular debe crear y gestionar
 */

// ApplicationConfig: Tipo de TypeScript que define la forma de la configuración
import { ApplicationConfig } from '@angular/core';

// provideHttpClient(): Función que habilita el módulo HTTP en la aplicación
// Sin esto, no podríamos hacer peticiones a servidores web
import { provideHttpClient } from '@angular/common/http';

// Exporta la configuración de la aplicación
// Es como un "menú" que le dice a Angular qué servicios están disponibles
export const appConfig: ApplicationConfig = {
  // providers: Lista de servicios que Angular debe crear
  // provideHttpClient(): Habilita HttpClient para hacer peticiones HTTP
  providers: [provideHttpClient()],
};
