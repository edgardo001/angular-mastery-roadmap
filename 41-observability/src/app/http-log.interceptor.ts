/**
 * ARCHIVO: http-log.interceptor.ts - Interceptor HTTP con logging y correlation IDs
 *
 * Este interceptor hace dos cosas importantes:
 * 1. Registra cada petición HTTP que sale de la aplicación (logging)
 * 2. Agrega un "correlation ID" único a cada petición para rastrearla de extremo a extremo
 *
 * Un correlation ID es como un número de seguimiento de un paquete.
 * Cuando envías un paquete, te dan un número. Si hay problemas, puedes
 * rastrear el paquete usando ese número. Lo mismo aplica a las peticiones HTTP.
 *
 * Analogía: Es como el número de orden en un restaurante. Cuando pides
 * comida, te dan un número. Puedes usar ese número para preguntar por
 * tu pedido sin confundirlo con los de otros clientes.
 */

// HttpInterceptorFn: Tipo de función que Angular usa para interceptar peticiones HTTP.
import { HttpInterceptorFn } from '@angular/common/http';

// inject: Función de Angular para obtener dependencias (servicios) dentro de interceptores.
import { inject } from '@angular/core';

// Importamos el servicio de logging para registrar las peticiones HTTP.
import { LoggerService } from './logger.service';

/**
 * correlationIdCounter: Contador que genera IDs únicos secuenciales.
 * Se usa let en lugar de const porque su valor cambia con cada llamada.
 */
let correlationIdCounter = 0;

/**
 * nextCorrelationId: Genera un ID de correlación único.
 *
 * Formato: "corr-{número}-{timestamp}"
 * Ejemplo: "corr-42-1706145600000"
 *
 * El timestamp garantiza unicidad incluso si se reinicia el contador.
 */
export function nextCorrelationId(): string {
  return `corr-${++correlationIdCounter}-${Date.now()}`;
}

/**
 * httpLogInterceptor: Interceptor que registra cada petición HTTP y agrega un correlation ID.
 *
 * Flujo:
 * 1. Obtiene el servicio de logging mediante inject()
 * 2. Genera un correlation ID único
 * 3. Clona la petición y agrega el header X-Correlation-Id
 * 4. Registra la petición en el log
 * 5. Pasa la petición modificada al siguiente paso
 */
export const httpLogInterceptor: HttpInterceptorFn = (req, next) => {
  // inject(): Forma moderna de obtener servicios en Angular.
  // Solo funciona dentro de constructores o funciones de interceptores.
  const logger = inject(LoggerService);

  // Generamos un correlation ID único para esta petición.
  const correlationId = nextCorrelationId();

  // Clonamos la petición y agregamos el header X-Correlation-Id.
  // El servidor puede usar este header para identificar la petición en sus logs.
  const cloned = req.clone({
    setHeaders: { 'X-Correlation-Id': correlationId },
  });

  // Registramos la petición en el log con el correlation ID para rastreo.
  logger.info(`HTTP ${req.method} ${req.url}`, { correlationId });

  // Pasamos la petición modificada al siguiente interceptor o al servidor.
  return next(cloned);
};
