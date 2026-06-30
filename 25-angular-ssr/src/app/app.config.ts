// =============================================================================
// ARCHIVO: app.config.ts
// PROPÓSITO: Configuración de la aplicación Angular (lado del navegador)
// =============================================================================
//
// En Angular moderno (standalone), la configuración se define como un objeto
// en lugar de un módulo NgModule. Es como el "manual de instrucciones" que le
// dice a Angular qué servicios están disponibles en toda la aplicación.
//
// Este objeto se pasa a bootstrapApplication() en main.ts.
// Cada "provider" es como un empleado especializado que hace un trabajo:
// - Router: maneja la navegación entre páginas
// - ClientHydration: sincroniza el HTML del servidor con el navegador
// =============================================================================

// ApplicationConfig es el tipo TypeScript que define la forma del objeto
// de configuración. provideBrowserGlobalErrorListeners es un provider
// que captura errores no manejados en el navegador (como errores de JavaScript).
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

// provideClientHydration habilita la "hidratación" del cliente.
// ¿Qué es la hidratación? Después de que el servidor renderiza el HTML,
// el navegador "toma posesión" de ese HTML y lo hace interactivo.
// Es como darle vida a una marioneta: el servidor la construye,
// y la hidratación la hace moverse y reaccionar.
//
// Sin hidratación, Angular destruiría todo el HTML del servidor
// y lo volvería a renderizar desde cero (desperdiciando trabajo).
import { provideClientHydration } from '@angular/platform-browser';

// provideRouter configura el sistema de rutas de Angular.
// Es como poner letreros en un edificio: le dice a Angular qué componente
// mostrar cuando el usuario visita una URL específica.
import { provideRouter } from '@angular/router';

// Las rutas definidas en app.routes.ts
import { routes } from './app.routes';

// Exporta la configuración como constante para que pueda ser importada.
export const appConfig: ApplicationConfig = {
  providers: [
    // Captura errores globales del navegador
    provideBrowserGlobalErrorListeners(),
    // Habilita la hidratación SSR (el navegador reutiliza el HTML del servidor)
    provideClientHydration(),
    // Configura el sistema de rutas con las rutas definidas
    provideRouter(routes)
  ]
};
