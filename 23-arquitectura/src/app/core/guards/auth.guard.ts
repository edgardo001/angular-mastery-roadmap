/**
 * GUARD DE AUTENTICACIÓN (authGuard)
 * ====================================
 *
 * Protege rutas que requieren autenticación.
 * Si el usuario no está logueado, lo redirige al login.
 *
 * ANÁLOGÍA: Es como un guardia de seguridad en un edificio:
 * - Si tienes credenciales, te deja pasar
 * - Si no las tienes, te envía a la recepción
 *
 * PALABRAS CLAVE:
 * - inject(): Obtiene servicios del contenedor de inyección
 * - Router: Servicio para navegar entre rutas
 * - return true: Permite el acceso a la ruta
 * - return router.parseUrl(): Redirige a otra ruta
 *
 * ¿CÓMO FUNCIONA?
 * 1. Angular quiere acceder a una ruta protegida
 * 2. Ejecuta el guard antes de mostrar la ruta
 * 3. El guard verifica si el usuario está logueado
 * 4. Si está logueado: permite el acceso (return true)
 * 5. Si NO está logueado: redirige al login
 */

// inject: Obtiene servicios sin usar constructor
import { inject } from '@angular/core';

// Router: Servicio para navegar entre rutas programáticamente
import { Router } from '@angular/router';

// AuthService: Servicio que verifica si el usuario está logueado
import { AuthService } from '../services/auth.service';

// authGuard: Guard funcional (forma moderna de Angular)
// Retorna true si el usuario puede acceder, o una URL de redirección
export const authGuard = () => {
  // Obtiene el servicio de autenticación
  const auth = inject(AuthService);
  // Obtiene el servicio de rutas
  const router = inject(Router);

  // Verifica si el usuario está logueado
  if (auth.isLoggedIn()) return true; // Permite el acceso

  // Si NO está logueado, redirige al login
  // parseUrl(): Convierte una URL string en un UrlTree
  return router.parseUrl('/auth/login');
};
