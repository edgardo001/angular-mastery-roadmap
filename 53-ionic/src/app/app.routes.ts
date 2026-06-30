// ============================================================
// app.routes.ts — Rutas de navegación de la app Ionic
// ============================================================
// Las rutas definen a qué pantalla va el usuario según la URL.
// En Ionic, las rutas se combinan con tabs (pestañas) para
// crear una experiencia de navegación tipo app móvil.

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // path '' — cuando el usuario abre la app sin URL específica.
    path: '',
    // redirectTo: redirige automáticamente a '/home'.
    redirectTo: 'home',
    // pathMatch 'full' — solo redirige si la URL es exactamente ''.
    pathMatch: 'full'
  },
  {
    // path 'home' — la pantalla principal.
    path: 'home',
    // loadComponent: carga el componente HAGA CLIC en el tab.
    // La función import() carga el archivo solo cuando se necesita (lazy loading).
    // Es como abrir una caja solo cuando la necesitas, no todas a la vez.
    loadComponent: () => import('./home/home').then(m => m.HomePage)
  },
  {
    // path 'camera' — la pantalla de la cámara.
    path: 'camera',
    loadComponent: () => import('./camera/camera').then(m => m.CameraPage)
  },
  {
    // path 'gps' — la pantalla de geolocalización.
    path: 'gps',
    loadComponent: () => import('./gps/gps').then(m => m.GpsPage)
  }
];
