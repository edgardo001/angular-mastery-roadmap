import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, delay, retry, tap, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry({
      count: 1,
      delay: (error, retryCount) => {
        console.warn(`[🔄] Reintento #${retryCount} para ${req.url} — ${error.status ?? error.message}`);
        return delay(1000)(throwError(() => error));
      },
    }),
    catchError((error) => {
      const status = error.status ?? 0;
      const message = error.message ?? 'Error desconocido';
      console.error(`[🚨] Error en ${req.method} ${req.url}: ${status} — ${message}`);
      return throwError(() => error);
    }),
  );
};
