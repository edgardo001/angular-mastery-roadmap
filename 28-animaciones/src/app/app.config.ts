// =============================================================================
// ARCHIVO: app.config.ts
// PROPÓSITO: Configuración de la app con provideAnimations habilitado
// =============================================================================
//
// Este archivo es CRÍTICO para que las animaciones funcionen.
// Sin provideAnimations(), Angular ignoraría todas las animaciones
// definidas en los componentes. Es como tener un televisor sin enchufarlo:
// el hardware está ahí, pero no funciona.
//
// provideAnimations() registra el BrowserAnimationsModule que
// procesa las directivas [@trigger] en los templates.
// =============================================================================

// ApplicationConfig: Tipo de la configuración
// provideBrowserGlobalErrorListeners: Captura errores del navegador
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

// provideAnimations: ¡HABILITA las animaciones en la app!
// Sin esto, todas las animaciones [@fadeIn], [@slideIn], etc.
// simplemente no harían nada. Es el "switch maestro" de las animaciones.
import { provideAnimations } from '@angular/platform-browser/animations';

// provideRouter: Configura el sistema de rutas
import { provideRouter } from '@angular/router';

// Las rutas definidas
import { routes } from './app.routes';

// Configuración completa de la aplicación
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // ¡Este provider es lo que hace que las animaciones funcionen!
    provideAnimations(),
    provideRouter(routes)
  ]
};
