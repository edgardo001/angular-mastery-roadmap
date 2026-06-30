// ============================================================================
// INTERCEPTOR DE ERRORES (error.interceptor.ts)
// ============================================================================
// Este interceptor maneja errores HTTP y reintenta las peticiones fallidas.
// Es como un "mecánico de emergencia" que intenta arreglar el problema antes de reportarlo.

import { HttpInterceptorFn } from '@angular/common/http';

// Operators de RxJS:
// - retry: Reintenta una petición fallida automáticamente
// - delay: Espera un tiempo antes de reintentar
// - catchError: Captura errores y permite transformarlos o re-lanzarlos
// - throwError: Crea un Observable que lanza un error
import { catchError, delay, retry, tap, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    // retry: Si la petición falla, reintenta 1 vez después de 1 segundo.
    // ANÁLOGÍA: Si el internet se corta momentáneamente, intentas de nuevo.
    retry({
      count: 1,  // Número máximo de reintentos
      delay: (error, retryCount) => {
        console.warn(`[🔄] Reintento #${retryCount} para ${req.url} — ${error.status ?? error.message}`);
        // delay(1000): Espera 1 segundo antes de reintentar
        // throwError: Si el reintento también falla, lanza el error original
        return delay(1000)(throwError(() => error));
      },
    }),
    // catchError: Si después del reintento sigue fallando, captura el error
    // y lo re-lanza para que el componente que hizo la petición lo maneje
    catchError((error) => {
      const status = error.status ?? 0;
      const message = error.message ?? 'Error desconocido';
      console.error(`[🚨] Error en ${req.method} ${req.url}: ${status} — ${message}`);
      return throwError(() => error);  // Re-lanza el error para que el componente lo maneje
    }),
  );
};
