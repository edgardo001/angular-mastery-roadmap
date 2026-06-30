/**
 * INTERCEPTOR DE AUTENTICACIÓN (authInterceptor)
 * ================================================
 *
 * Intercepta las peticiones HTTP para agregar el token de autenticación.
 * Es como un "cartero" que siempre lleva tu identificación en cada carta.
 *
 * ANÁLOGÍA: Es como un seguro de envío:
 * - Antes de enviar cada carta, verifica si hay token
 * - Si hay token, lo agrega a la carta
 * - Si no hay token, envía la carta sin identificación
 *
 * PALABRAS CLAVE:
 * - HttpInterceptorFn: Tipo de interceptor funcional (forma nueva)
 * - req.clone(): Crea una copia de la petición con modificaciones
 * - setHeaders: Agrega headers personalizados a la petición
 * - next(): Envía la petición al siguiente interceptor o al servidor
 *
 * FLUJO:
 * 1. El componente hace una petición HTTP
 * 2. El interceptor intercepta la petición
 * 3. Si hay token, lo agrega al header Authorization
 * 4. Envía la petición modificada al servidor
 * 5. El servidor recibe la petición con el token
 */

// HttpInterceptorFn: Tipo de interceptor funcional (forma moderna)
import { HttpInterceptorFn } from '@angular/common/http';

// authInterceptor: Interceptor que agrega token de autenticación
// (req, next): req = petición original, next = envía al siguiente paso
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtiene el token del localStorage
  const token = localStorage.getItem('token');

  // Si hay token, lo agrega a la petición
  if (token) {
    // req.clone(): Crea una copia de la petición con el header Authorization
    // Nunca modifiques la petición original, siempre clonala
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    // next(): Envía la petición clonada al siguiente interceptor o al servidor
    return next(cloned);
  }

  // Si no hay token, envía la petición original sin modificar
  return next(req);
};
