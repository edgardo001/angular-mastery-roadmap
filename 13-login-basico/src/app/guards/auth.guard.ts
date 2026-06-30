// ============================================================================
// GUARDIA DE AUTENTICACIÓN (auth.guard.ts)
// ============================================================================
// Una guardia protege rutas verificando si el usuario tiene permiso para acceder.
// Es como un "portero" que verifica tu credencial antes de dejarte entrar.

// inject: Para obtener servicios dentro de la guardia (sin constructor)
import { inject } from '@angular/core';

// Router: Servicio para navegar entre rutas programáticamente
import { Router } from '@angular/router';

// AuthService: Servicio que maneja el estado de autenticación
import { AuthService } from '../services/auth.service';

// authGuardFn: Guardia de ruta tipo función (moderna, sin clase)
// Se ejecuta ANTES de que el usuario acceda a una ruta protegida.
// Retorna true si puede acceder, o una URL de redirección si no puede.
export const authGuardFn = () => {
  // inject(): Obtenemos los servicios que necesitamos
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si el usuario está autenticado, permitimos el acceso
  if (auth.isLoggedIn()) return true;

  // Si NO está autenticado, lo redirigimos a la página de login
  // ANÁLOGÍA: El portero te dice "no puedes pasar, ve a la recepción a registrarte"
  return router.parseUrl('/login');
};
