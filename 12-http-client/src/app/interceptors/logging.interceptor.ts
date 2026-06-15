import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const start = performance.now();
  const method = req.method;
  const url = req.urlWithParams;

  console.log(`[➡️] ${method} ${url}`);

  return next(req).pipe(
    tap({
      next: () => {
        const elapsed = (performance.now() - start).toFixed(2);
        console.log(`[✅] ${method} ${url} — ${elapsed}ms`);
      },
      error: (err) => {
        const elapsed = (performance.now() - start).toFixed(2);
        console.error(`[❌] ${method} ${url} — ${elapsed}ms — ${err.status ?? err.message}`);
      },
    }),
  );
};
