/**
 * Guard funcional que protege rutas que requieren autenticación.
 *
 * ANLOGÍA: Es como un guardia en la puerta de un club:
 * - Si tienes credenciales (isLoggedIn), te deja pasar → retorna true
 * - Si no, te redirige a la entrada (la ruta raíz) → retorna URL
 *
 * Los guards funcionales son la forma moderna de Angular 14+.
 * Antes se usaban clases con CanActivate, ahora son funciones simples.
 */

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

/**
 * authGuardFn: función guard que verifica si el usuario está autenticado.
 *
 * inject() obtiene las dependencias DENTRO del contexto de inyección.
 * Esto NO puede hacerse fuera de un componente o servicio.
 */
export const authGuardFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si está logueado, permite el acceso
  if (auth.isLoggedIn()) return true;

  // Si no, redirige a la ruta raíz "/"
  return router.parseUrl('/');
};
