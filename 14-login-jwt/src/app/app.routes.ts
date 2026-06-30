// ============================================================================
// DEFINICIÓN DE RUTAS (app.routes.ts)
// ============================================================================
// Rutas protegidas con guards de autenticación y autorización por roles.

import { Routes } from '@angular/router';

// authGuard: Verifica que el usuario esté autenticado
// adminGuard: Verifica que el usuario tenga rol de administrador
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/auth.guard';

// ANÁLOGÍA: Las rutas son como las habitaciones de un edificio.
// Cada habitación puede tener un guardia (guard) que verifica tu credencial.
export const routes: Routes = [
  {
    // Ruta de login: no requiere autenticación
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    // Ruta protegida: solo usuarios autenticados
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],  // Guardia de autenticación
  },
  {
    // Ruta admin: requiere autenticación Y rol de admin
    // canActivate: Verifica que esté logueado
    // canMatch: Verifica que tenga permisos de admin (doble verificación)
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard],
    canMatch: [adminGuard],
  },
  {
    // Ruta de perfil: solo usuarios autenticados
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard],
  },
  // Redirección: si la URL es vacía, redirige a /dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // Ruta comodín: cualquier URL no definida redirige a /dashboard
  { path: '**', redirectTo: '/dashboard' },
];
