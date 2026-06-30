/**
 * ARCHIVO: app.routes.ts - Definición de rutas de la aplicación
 *
 * Las rutas le dicen a Angular qué componente mostrar cuando el usuario
 * navega a una URL específica.
 *
 * Analogía: Es como un mapa de carreteras. Cada ruta es un camino que
 * lleva a un destino (componente). Cuando escribes una URL en el navegador,
 * Angular sigue el camino hasta encontrar el componente correcto.
 *
 * Lazy Loading (carga diferida):
 * Usamos loadComponent en lugar de importar directamente el componente.
 * Esto significa que el componente NO se carga hasta que el usuario
 * visita esa ruta. Esto mejora el rendimiento de la aplicación inicial.
 */

// Routes: Tipo de Angular que define la estructura de las rutas.
import { Routes } from '@angular/router';

/**
 * routes: Array de rutas de la aplicación.
 *
 * Cada ruta tiene:
 * - path: La URL que el usuario visita (ej: 'countries')
 * - loadComponent: Función que carga el componente cuando se visita la ruta
 *
 * El path vacío '' redirige a '/countries' como página por defecto.
 */
export const routes: Routes = [
  // Redirigir la raíz a /countries
  { path: '', redirectTo: 'countries', pathMatch: 'full' },
  // Ruta de países: carga CountriesComponent cuando el usuario visita /countries
  {
    path: 'countries',
    loadComponent: () =>
      import('./countries/countries.component').then(m => m.CountriesComponent),
  },
];
