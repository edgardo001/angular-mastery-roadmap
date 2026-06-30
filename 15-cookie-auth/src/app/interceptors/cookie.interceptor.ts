// ============================================================================
// INTERCEPTOR DE COOKIES (cookie.interceptor.ts)
// ============================================================================
// Este interceptor agrega withCredentials: true a cada petición HTTP.
// Esto le dice al navegador que envíe las cookies HttpOnly al servidor.

import { HttpInterceptorFn } from '@angular/common/http';

// inject: Para obtener servicios (aunque no se usa aquí, está disponible)
import { inject } from '@angular/core';

// Router: Para navegar entre rutas (disponible para manejo de errores)
import { Router } from '@angular/router';

// ANÁLOGÍA: withCredentials: true es como decir al navegador:
// "Cuando hagas una petición a este servidor, también envía las galletas (cookies)
// que ese servidor te dio antes". Sin esto, las cookies NO se envían automáticamente.

// cookieInterceptor: Agrega withCredentials a TODA petición
export const cookieInterceptor: HttpInterceptorFn = (req, next) => {
  // Clonamos la petición y agregamos withCredentials: true
  // Esto hace que el navegador envíe las cookies HttpOnly al servidor
  const cloned = req.clone({ withCredentials: true });
  return next(cloned);
};

// authErrorInterceptor: Placeholder para manejo de errores 401
// Podría redirigir a login si la sesión expira
export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    // Error handling for 401 could be added here
  );
};
