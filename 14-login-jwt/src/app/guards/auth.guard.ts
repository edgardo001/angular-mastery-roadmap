// ============================================================================
// GUARDIAS DE AUTENTICACIÓN Y AUTORIZACIÓN (auth.guard.ts)
// ============================================================================
// Dos guardias diferentes:
// 1. authGuard: Verifica que el usuario esté autenticado (tiene token)
// 2. adminGuard: Verifica que el usuario tenga rol de administrador

import { inject } from '@angular/core';

// CanActivateFn: Tipo de guardia que controla el ACCESO a una ruta
// CanMatchFn: Tipo de guardia que controla si una ruta PUEDE coincidir
// Router: Para navegar entre rutas
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

// authGuard: Verifica que el usuario tenga token de autenticación
// Si NO está autenticado, lo redirige a /login
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.parseUrl('/login');
};

// adminGuard: Verifica que el usuario tenga rol de admin
// Si NO es admin, simplemente retorna false (la ruta no se carga)
// ANÁLOGÍA: authGuard es como el portero del edificio,
// adminGuard es como el guardia del piso de ejecutivos
export const adminGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  return auth.isAdmin();
};
