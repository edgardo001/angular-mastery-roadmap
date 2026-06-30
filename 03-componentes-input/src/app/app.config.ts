// ──────────────────────────────────────────────
// app.config.ts — Configuración de la aplicación
// ──────────────────────────────────────────────
//
// Este archivo define la configuración global de la app Angular.
// Es donde declaras los "providers" (servicios) que toda la app puede usar.
//
// Analogía: Imagina que estás montando un restaurante.
// app.config.ts es como la cocina central donde guardas:
//   - Los ingredientes (servicios)
//   - Las herramientas (herramientas de configuración)
//   - Las reglas (validadores, interceptores, etc.)
//
// En Angular moderno (standalone), NO usas módulos NgModule.
// En su lugar, configuras todo aquí con providers.

// import: trae el tipo ApplicationConfig de Angular
// ApplicationConfig es una interfaz TypeScript que define qué propiedades
// puede tener la configuración (providers, animations, etc.)
import { ApplicationConfig } from '@angular/core';

// export: hace que appConfig esté disponible para otros archivos
// const: declara una constante (un valor que NO cambia)
// appConfig: nombre de nuestra configuración
// ApplicationConfig: tipo TypeScript (le dice al editor qué estructura tiene)
// { providers: [] }: el objeto de configuración
//
// providers: [] → array vacío significa que NO hay servicios configurados
// En apps reales, aquí iría algo como:
//   providers: [
//     provideHttpClient(),        // para hacer peticiones HTTP
//     provideRouter(routes),      // para navegación
//     provideAnimations(),        // para animaciones
//   ]
export const appConfig: ApplicationConfig = { providers: [] };
