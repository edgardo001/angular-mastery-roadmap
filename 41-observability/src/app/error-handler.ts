/**
 * ARCHIVO: error-handler.ts - Manejador global de errores de Angular
 *
 * Angular tiene un sistema de manejo de errores que atrapa errores no capturados
 * en componentes, pipes y directivas. Este archivo define un manejador personalizado
 * que reemplaza al manejador por defecto de Angular.
 *
 * Cuando ocurre un error en cualquier parte de la aplicación, Angular lo envía
 * aquí automáticamente. Esto permite registrar errores en un servicio de monitoreo
 * como Sentry, Datadog o Azure Monitor.
 *
 * Analogía: Es como un "seguro de vida" para la aplicación. Si algo falla
 * inesperadamente, este manejador lo atrapa y registra para que puedas
 * investigar qué salió mal sin que la aplicación se crashee completamente.
 */

// ErrorHandler: Interfaz de Angular que define cómo manejar errores no capturados.
// Injectable: Decorador de Angular que marca una clase como "servicio" inyectable.
// inject: Función para obtener dependencias (servicios) sin usar constructores.
import { ErrorHandler, Injectable, inject } from '@angular/core';

// Importamos el servicio de logging para registrar los errores.
import { LoggerService } from './logger.service';

/**
 * @Injectable({ providedIn: 'root' }): Este servicio está disponible en toda la aplicación.
 *
 * AppErrorHandler implementa la interfaz ErrorHandler de Angular.
 * Angular llamará a handleError() cada vez que ocurra un error no capturado.
 */
@Injectable({ providedIn: 'root' })
export class AppErrorHandler implements ErrorHandler {
  /**
   * inject(): Obtiene el servicio LoggerService sin necesidad de un constructor.
   * Esto es la forma moderna de inyectar dependencias en Angular.
   */
  private readonly logger = inject(LoggerService);

  /**
   * handleError: Método que Angular llama automáticamente cuando ocurre un error.
   *
   * Flujo:
   * 1. Recibe el error (puede ser cualquier tipo: Error, string, objeto, etc.)
   * 2. Intenta extraer el mensaje de error de forma segura
   * 3. Registra el error en el servicio de logging
   *
   * En producción, aquí también enviarías el error a Sentry, Datadog, etc.
   */
  handleError(error: unknown): void {
    // Verificamos si el error es una instancia de Error para extraer el mensaje.
    // Si no lo es, convertimos el valor a string (String(error)).
    const message = error instanceof Error ? error.message : String(error);
    this.logger.error('Global error caught', { error, message });
  }
}
