/**
 * ARCHIVO: app.config.ts - Configuración de la aplicación Angular (Observabilidad)
 *
 * Este archivo configura los providers necesarios para la aplicación de observabilidad:
 * - ErrorHandler personalizado para atrapar errores globales
 * - Cliente HTTP con interceptor de logging
 * - Inicialización de Sentry para monitoreo de errores
 *
 * Analogía: Es como el panel de configuración de un sistema de seguridad.
 * Configuras qué cámaras (interceptores), qué alarmas (error handler)
 * y a qué servicio de monitoreo (Sentry) enviar las alertas.
 */

// ApplicationConfig: Tipo que define la estructura de la configuración.
// ErrorHandler: Interfaz para manejar errores globales.
import { ApplicationConfig, ErrorHandler } from '@angular/core';

// provideHttpClient: Configura el cliente HTTP.
// withInterceptors: Permite agregar interceptores a las peticiones HTTP.
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// Sentry: Librería de monitoreo de errores en producción.
// init: Inicializa Sentry con la URL de ingestión y la tasa de muestreo.
import * as Sentry from '@sentry/angular';

// Importamos el manejador de errores personalizado.
import { AppErrorHandler } from './error-handler';

// Importamos el interceptor de logging HTTP.
import { httpLogInterceptor } from './http-log.interceptor';

// Importamos el interceptor de OpenTelemetry para instrumentar peticiones HTTP con trazas.
import { otelInterceptor } from './otel.interceptor';

/**
 * Sentry.init: Inicializa el SDK de Sentry para Angular.
 *
 * Propiedades:
 * - dsn: URL de ingestión de Sentry donde se envían los errores.
 *   En producción, esta URL es real. Aquí es un placeholder.
 * - tracesSampleRate: Porcentaje de trazas que se envían (1.0 = 100%).
 *   En producción, se usa un valor menor para reducir costos.
 */
Sentry.init({
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  tracesSampleRate: 1.0,
});

/**
 * appConfig: Configuración de la aplicación.
 *
 * providers:
 * 1. ErrorHandler personalizado: Reemplaza al handler por defecto de Angular.
 *    Cuando ocurra un error, se ejecutará AppErrorHandler.handleError().
 * 2. Cliente HTTP con interceptor de logging: Cada petición HTTP pasará
 *    por httpLogInterceptor que agregará correlation IDs y registrará logs.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // provide: Especifica qué clase usar para el servicio ErrorHandler.
    // useClass: Indica que se debe usar AppErrorHandler como implementación.
    { provide: ErrorHandler, useClass: AppErrorHandler },
    // Configuramos el cliente HTTP con dos interceptores:
    // 1. otelInterceptor: Crea spans de OpenTelemetry para cada petición HTTP
    // 2. httpLogInterceptor: Registra logs y agrega correlation IDs
    //
    // El orden importa: los interceptores se ejecutan en el orden que se listan.
    // OpenTelemetry va primero para capturar la petición completa antes de que
    // el interceptor de logging la modifique (agregue headers).
    provideHttpClient(withInterceptors([otelInterceptor, httpLogInterceptor])),
  ],
};
