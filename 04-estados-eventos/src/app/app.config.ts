/**
 * ============================================================
 * app.config.ts — Configuración de la aplicación Angular
 * ============================================================
 *
 * Este archivo define los servicios y configuraciones que toda
 * la aplicación necesita. Es como la "lista de compras" antes
 * de cocinar: sin ella, no sabrías qué ingredientes (servicios)
 * necesitas tener disponibles.
 *
 * Analogía: Es como el panel de control de un edificio.
 * Desde aquí se activan o desactivan servicios como:
 *   - Elevadores (Router para navegación)
 *   - Aire acondicionado (HttpClient para peticiones web)
 *   - Alarmas (Animaciones, etc.)
 */

// ApplicationConfig: Tipo de TypeScript que define la estructura
// de configuración de una aplicación Angular.
// Es como un "molde" que dice qué campos puede tener la config.
import { ApplicationConfig } from '@angular/core';

/**
 * appConfig — Objeto de configuración exportado
 *
 * "export" significa que otros archivos pueden importar esta variable.
 * Es como publicar una receta en un libro: cualquiera puede usarla.
 *
 * providers: Array de servicios que Angular debe conocer.
 *   - Si está vacío ([]), la app no tiene servicios especiales.
 *   - Ejemplos comunes:
 *     provideRouter(routes)     → Para navegación entre páginas
 *     provideHttpClient()       → Para hacer peticiones HTTP
 *     provideAnimations()       → Para animaciones en la UI
 *
 * En este ejemplo simple, no necesitamos servicios externos,
 * por eso el array está vacío. Es como un auto básico sin
 * extras: no tiene GPS ni aire acondicionado, pero funciona.
 */
export const appConfig: ApplicationConfig = {
  providers: [],
};
