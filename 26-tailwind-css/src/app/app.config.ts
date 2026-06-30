// =============================================================================
// ARCHIVO: app.config.ts
// PROPÓSITO: Configuración de la aplicación Angular (providers y servicios)
// =============================================================================
//
// Este objeto de configuración le dice a Angular qué servicios están
// disponibles en toda la aplicación. Es como una lista de empleados
// contratados: cada "provider" tiene un trabajo específico.
//
// En este proyecto solo necesitamos el Router y los listeners de errores,
// ya que el focus está en Tailwind CSS, no en funcionalidad Angular avanzada.
// =============================================================================

// ApplicationConfig: Tipo que define la forma del objeto de configuración.
// provideBrowserGlobalErrorListeners: Captura errores no manejados en el navegador.
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

// provideRouter: Configura el sistema de rutas de Angular.
import { provideRouter } from '@angular/router';

// Las rutas definidas (array vacío en este proyecto)
import { routes } from './app.routes';

// Exporta la configuración completa de la aplicación.
export const appConfig: ApplicationConfig = {
  providers: [
    // Captura errores de JavaScript no manejados (como window.onerror)
    provideBrowserGlobalErrorListeners(),
    // Configura el sistema de rutas (aunque esté vacío)
    provideRouter(routes)
  ]
};
