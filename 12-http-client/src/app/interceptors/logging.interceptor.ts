// ============================================================================
// INTERCEPTOR DE LOGGING (logging.interceptor.ts)
// ============================================================================
// Este interceptor registra cada petición HTTP en la consola del navegador.
// Es como un "cuaderno de bitácora" que anota cada viaje de un barco.

// HttpInterceptorFn: Tipo de función interceptor moderna de Angular.
// Un interceptor es una función que recibe la petición (req) y la función next
// que continúa con el siguiente interceptor o la petición real.
import { HttpInterceptorFn } from '@angular/common/http';

// tap: Operador de RxJS que ejecuta un efecto secundario sin modificar los datos.
// Es como "mirar" algo sin tocarlo.
import { tap } from 'rxjs/operators';

// El interceptor es una función flecha que recibe:
// - req: La petición HTTP que se va a enviar
// - next: Función que continúa con el siguiente paso
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  // Guardamos el tiempo de inicio para medir cuánto tarda la petición
  const start = performance.now();
  const method = req.method;   // GET, POST, PUT, DELETE, etc.
  const url = req.urlWithParams;  // URL completa con parámetros

  // Registramos que la petición está saliendo
  console.log(`[➡️] ${method} ${url}`);

  // next(req): Envía la petición al siguiente interceptor o al servidor.
  // .pipe(tap(...)): Cuando llega la respuesta (o error), registramos el resultado.
  return next(req).pipe(
    tap({
      // next: La petición fue exitosa (status 200-299)
      next: () => {
        const elapsed = (performance.now() - start).toFixed(2);
        console.log(`[✅] ${method} ${url} — ${elapsed}ms`);
      },
      // error: La petición falló (status 400, 404, 500, etc.)
      error: (err) => {
        const elapsed = (performance.now() - start).toFixed(2);
        console.error(`[❌] ${method} ${url} — ${elapsed}ms — ${err.status ?? err.message}`);
      },
    }),
  );
};
