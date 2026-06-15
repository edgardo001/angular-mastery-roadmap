import { HttpInterceptorFn } from '@angular/common/http';

function sanitizeValue(value: unknown): unknown {
  if (typeof value === 'string') {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }
  return value;
}

function sanitizeBody(body: unknown): unknown {
  if (body === null || body === undefined) return body;
  if (Array.isArray(body)) return body.map(sanitizeBody);
  if (typeof body === 'object') {
    return Object.fromEntries(
      Object.entries(body as Record<string, unknown>).map(([k, v]) => [
        k,
        sanitizeBody(v),
      ]),
    );
  }
  return sanitizeValue(body);
}

export const xssProtectionInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    body: req.body ? sanitizeBody(req.body) : req.body,
  });
  return next(cloned);
};
