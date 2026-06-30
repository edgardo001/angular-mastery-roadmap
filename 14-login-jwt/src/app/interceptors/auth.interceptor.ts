// ============================================================================
// INTERCEPTOR DE AUTENTICACIÓN JWT (auth.interceptor.ts)
// ============================================================================
// Este interceptor agrega el token JWT a cada petición HTTP.
// Si recibe un error 401 (token expirado), intenta refrescar el token automáticamente.

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';

// inject: Para obtener el AuthService dentro del interceptor
import { inject } from '@angular/core';

// catchError: Para manejar errores HTTP
// switchMap: Para encadenar Observables (refrescar token → reintentar petición)
// throwError: Para re-lanzar errores
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

// ANÁLOGÍA: Este interceptor es como un "asistente personal" que:
// 1. Siempre lleva tu credencial (token) cuando vas a algún lugar
// 2. Si te rechazan (401), intenta obtener una credencial nueva (refresh)
// 3. Si la credencial nueva tampoco funciona, te saca del edificio (logout)
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getAccessToken();

  // Si hay token, lo agrega al header Authorization de la petición
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el error es 401 (No autorizado) Y no es una petición de refresh
      if (error.status === 401 && !req.url.includes('/auth/refresh')) {
        // Intentar refrescar el token
        return auth.refreshTokens().pipe(
          switchMap(() => {
            // Si el refresh fue exitoso, reintentar la petición original con el nuevo token
            const newToken = auth.getAccessToken();
            const cloned = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` },
            });
            return next(cloned);
          }),
          catchError((refreshError) => {
            // Si el refresh también falló, cerrar sesión
            auth.logout();
            return throwError(() => refreshError);
          }),
        );
      }
      // Para otros errores (400, 404, 500, etc.), re-lanzar el error
      return throwError(() => error);
    }),
  );
};
