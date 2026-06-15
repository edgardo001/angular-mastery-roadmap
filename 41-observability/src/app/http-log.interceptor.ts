import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoggerService } from './logger.service';

let correlationIdCounter = 0;

export function nextCorrelationId(): string {
  return `corr-${++correlationIdCounter}-${Date.now()}`;
}

export const httpLogInterceptor: HttpInterceptorFn = (req, next) => {
  const logger = inject(LoggerService);
  const correlationId = nextCorrelationId();
  const cloned = req.clone({
    setHeaders: { 'X-Correlation-Id': correlationId },
  });
  logger.info(`HTTP ${req.method} ${req.url}`, { correlationId });
  return next(cloned);
};
