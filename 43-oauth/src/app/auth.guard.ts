/**
 * ARCHIVO: auth.guard.ts - Guard de autenticación OAuth2
 *
 * Un "guard" (guardián) en Angular es un mecanismo que protege rutas.
 * Antes de que el usuario pueda navegar a una ruta protegida, el guard
 * verifica si tiene permiso para acceder.
 *
 * En este caso, el guard verifica que el usuario esté autenticado.
 * Si no lo está, lo redirige al proveedor de identidad para que haga login.
 *
 * Analogía: Es como un guardia de seguridad en la entrada de un edificio.
 * Si tienes credencial (autenticado), te deja pasar. Si no la tienes,
 * te envía a la oficina de recepción (login) para que te la den.
 */

// CanActivateFn: Tipo de función que Angular usa para proteger rutas.
// Router: Servicio de Angular para navegar entre rutas programáticamente.
import { CanActivateFn, Router } from '@angular/router';

// inject: Función para obtener servicios sin constructores.
import { inject } from '@angular/core';

// OidcSecurityService: Servicio de autenticación OIDC.
import { OidcSecurityService } from 'angular-auth-oidc-client';

// map: Operador de RxJS que transforma los datos que fluyen por un Observable.
import { map } from 'rxjs';

/**
 * authGuard: Guard de autenticación funcional.
 *
 * Angular moderno (v15+) usa "functional guards" en lugar de clases.
 * Esto significa que el guard es una función simple, no una clase.
 *
 * Flujo:
 * 1. Obtiene el servicio OIDC y el router
 * 2. Consulta si el usuario está autenticado
 * 3. Si está autenticado → permite el acceso (return true)
 * 4. Si NO está autenticado → inicia el login y bloquea el acceso (return false)
 */
export const authGuard: CanActivateFn = () => {
  // Obtenemos los servicios necesarios mediante inyección de dependencias.
  const oidc = inject(OidcSecurityService);
  const router = inject(Router);

  /**
   * isAuthenticated$: Observable que emite el estado de autenticación.
   * Usamos pipe(map(...)) para transformar la respuesta en un booleano.
   */
  return oidc.isAuthenticated$.pipe(
    map((isAuth) => {
      if (!isAuth) {
        // Si el usuario NO está autenticado, iniciamos el proceso de login.
        // authorize(): Redirige al usuario al proveedor de identidad.
        oidc.authorize();
        // Return false bloquea la navegación a la ruta protegida.
        return false;
      }
      // Si el usuario SÍ está autenticado, permitimos el acceso.
      return true;
    }),
  );
};
