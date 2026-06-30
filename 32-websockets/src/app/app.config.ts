/**
 * Configuración de la aplicación Angular.
 *
 * ApplicationConfig define los "proveedores" (providers) de la aplicación.
 * Un proveedor es como una fábrica: le dice a Angular QUÉ crear y CÓMO crearlo
 * cuando alguien lo pida (inyección de dependencias).
 *
 * En este ejemplo simple no necesitamos proveedores especiales porque
 * los WebSockets se manejan directamente con RxJS, no con HttpClient.
 */
import { ApplicationConfig } from '@angular/core';

// Objeto de configuración vacío: la app funciona sin proveedores adicionales
export const appConfig: ApplicationConfig = { providers: [] };
