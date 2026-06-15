import { HttpInterceptorFn } from '@angular/common/http';
import { signal } from '@angular/core';
import { SKIP_AUTH } from './skip-auth.context';

export const authToken = signal<string>('');

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_AUTH)) {
    return next(req);
  }

  const token = authToken();
  if (!token) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(cloned);
};
