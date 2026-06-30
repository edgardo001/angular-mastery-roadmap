/**
 * ARCHIVO: jwt.interceptor.ts - Interceptor HTTP para autenticación JWT
 *
 * Un interceptor es como un "filtra-todo" que revisa cada petición HTTP
 * que sale de la aplicación antes de que llegue al servidor.
 *
 * En este caso, el interceptor agrega el token JWT al header de cada petición.
 * Así el servidor sabe quién está haciendo la petición sin tener que pedir
 * las credenciales en cada llamada.
 *
 * Analogía: Es como llevar tu credencial de empleado colgada del cuello.
 * No necesitas mostrarla cada vez que entras a una habitación; simplemente
 * la traes y el sistema te reconoce automáticamente.
 */

// HttpInterceptorFn: Tipo de función que Angular usa para interceptar peticiones HTTP.
// Es una función que recibe la petición (req) y la función para pasarla al siguiente
// interceptor o al servidor (next).
import { HttpInterceptorFn } from '@angular/common/http';

/**
 * jwtInterceptor: Interceptor que agrega el token JWT a las peticiones HTTP.
 *
 * Flujo:
 * 1. Recibe una petición HTTP (req)
 * 2. Busca el token en localStorage (almacenamiento local del navegador)
 * 3. Si existe el token, clona la petición y agrega el header Authorization
 * 4. Pasa la petición (original o modificada) al siguiente paso
 */
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // localStorage: Almacenamiento del navegador que persiste datos aunque se cierre.
  // getItem('token'): Busca un valor guardado con la clave 'token'.
  const token = localStorage.getItem('token');

  // Si el usuario tiene un token guardado, lo agregamos a la petición.
  if (token) {
    // req.clone(): Las peticiones HTTP son inmutables (no se pueden modificar directamente).
    // Por eso debemos "clonar" la petición y agregar el header en la copia.
    // setHeaders: { Authorization: 'Bearer TOKEN' } es el formato estándar de autenticación.
    // "Bearer" significa "portador" en inglés: el servidor acepta a quien porte este token.
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  // Pasamos la petición al siguiente interceptor o al servidor real.
  return next(req);
};
