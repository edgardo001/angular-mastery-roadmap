// ============================================================================
// DEFINICIÓN DE RUTAS (app.routes.ts)
// ============================================================================
// Este archivo define qué componente se muestra en cada URL.
// Es como un "mapa" que le dice al navegador qué página mostrar según la dirección.

// Routes: Tipo que define la estructura de las rutas
import { Routes } from '@angular/router';

// authGuard: Guardia de ruta que protege rutas privadas
import { authGuardFn } from './guards/auth.guard';

// ANÁLOGÍA: Las rutas son como las páginas de un libro.
// Cada capítulo (ruta) tiene su propio contenido (componente).
export const routes: Routes = [
  {
    // Ruta principal: '/' — muestra la página de inicio
    path: '',
    // loadComponent: Carga el componente de forma "lazy" (solo cuando se visita).
    // Es como abrir un capítulo del libro solo cuando lo necesitas.
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    // Ruta de login: '/login' — formulario de inicio de sesión
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    // Ruta protegida: '/dashboard' — solo usuarios autenticados
    // canActivate: array de guardias que verifican si el usuario puede acceder
    // Si el usuario NO está autenticado, el guardia lo redirige a '/login'
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuardFn],
  },
  {
    // Ruta comodín: '**' — captura cualquier URL no definida y redirige a '/'
    // Es como decir "si no sabes dónde ir, vuelve al inicio"
    path: '**', redirectTo: '',
  },
];
