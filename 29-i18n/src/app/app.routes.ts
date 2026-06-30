// =============================================================================
// ARCHIVO: app.routes.ts
// PROPÓSITO: Define las rutas de navegación de la aplicación i18n
// =============================================================================
//
// Este proyecto de i18n no usa rutas de navegación interna.
// El cambio de idioma se hace recargando la página en una ruta diferente.
//
// Sin embargo, el archivo existe porque Angular standalone lo requiere.
// En una app i18n real, las rutas podrían incluir prefijos de idioma:
// - /en/blog
// - /es/blog
// - /fr/blog
// =============================================================================

// Routes: Tipo que define la estructura de rutas de Angular
import { Routes } from '@angular/router';

// Array vacío: la app es de una sola página con cambio de idioma por recarga
export const routes: Routes = [];
