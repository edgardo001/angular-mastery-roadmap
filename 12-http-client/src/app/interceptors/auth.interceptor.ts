// ============================================================================
// INTERCEPTOR DE AUTENTICACIÓN (auth.interceptor.ts)
// ============================================================================
// Este interceptor agrega el token de autenticación a cada petición HTTP.
// Es como el "control de seguridad" que verifica tu credencial antes de entrar.

import { HttpInterceptorFn } from '@angular/common/http';

// signal: Para guardar el token de autenticación de forma reactiva
import { signal } from '@angular/core';

// Importamos el token de contexto para saber cuándo saltarse la autenticación
import { SKIP_AUTH } from './skip-auth.context';

// Signal global que contiene el token de autenticación.
// Cuando cambia, todas las peticiones nuevas usarán el nuevo valor.
export const authToken = signal<string>('');

// El interceptor es una función que se ejecuta en CADA petición HTTP
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Verificamos si la petición tiene el flag SKIP_AUTH = true.
  // Si lo tiene, la dejamos pasar sin agregar token (es como un "pase libre").
  if (req.context.get(SKIP_AUTH)) {
    return next(req);
  }

  // Si no hay token configurado, dejamos pasar la petición sin modificar
  const token = authToken();
  if (!token) {
    return next(req);
  }

  // Clonamos la petición original y le agregamos el header Authorization.
  // NO se puede modificar req directamente (es inmutable).
  // ANÁLOGÍA: Es como fotocopiar un documento y agregar un sello, el original queda intacto.
  const cloned = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(cloned);
};
