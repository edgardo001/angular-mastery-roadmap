/**
 * ARCHIVO: logger.service.ts - Servicio de logging personalizado
 *
 * Este servicio registra mensajes de diferentes niveles (debug, info, warn, error)
 * tanto en la consola del navegador como en un array interno que puede consultarse.
 *
 * En producción, los logs se enviarían a un servicio externo como Sentry, Datadog
 * o Azure Monitor para monitorear la aplicación en tiempo real.
 *
 * Analogía: Es como el cuaderno de bitácora de un avión. Registra todo lo que
 * sucede durante el vuelo para que si algo sale mal, puedas revisar qué pasó.
 */

// Injectable: Decorador de Angular que marca una clase como "servicio" inyectable.
// Inject y Optional son utilidades para inyección de dependencias.
import { Injectable, Inject, Optional } from '@angular/core';

/**
 * LogLevel: Tipo que define los niveles de log disponibles.
 * De menos severo a más severo: debug → info → warn → error
 *
 * Analogía: Es como el nivel de urgencia de una notificación.
 * - debug: Detalles técnicos para desarrolladores
 * - info: Información general sobre el funcionamiento
 * - warn: Advertencias que podrían causar problemas
 * - error: Errores que necesitan atención inmediata
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Interfaz que define la estructura de una entrada de log.
 * Cada entrada tiene: timestamp (cuándo), level (nivel), message (mensaje) y data (datos extra).
 */
export interface LogEntry {
  timestamp: Date;   // Fecha y hora exacta del log
  level: LogLevel;   // Nivel de severidad
  message: string;   // Mensaje descriptivo del log
  data?: unknown;    // Datos adicionales opcionales (objeto, array, etc.)
}

@Injectable({ providedIn: 'root' })
export class LoggerService {
  /**
   * entries: Array interno que almacena todas las entradas de log.
   * En producción, aquí podrías enviar los logs a un servicio externo.
   */
  private readonly entries: LogEntry[] = [];

  /**
   * Métodos públicos para registrar logs de cada nivel.
   * Cada uno llama al método privado `log` con el nivel correspondiente.
   */
  debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  error(message: string, data?: unknown): void {
    this.log('error', message, data);
  }

  /**
   * getAll: Devuelve una copia del array de logs.
   * Se usa [...this.entries] para devolver un nuevo array (inmutabilidad)
   * y evitar que se modifique el array original desde fuera del servicio.
   */
  getAll(): LogEntry[] {
    return [...this.entries];
  }

  /**
   * clear: Elimina todos los logs almacenados.
   * entries.length = 0 es una forma eficiente de vaciar un array.
   */
  clear(): void {
    this.entries.length = 0;
  }

  /**
   * log: Método privado que crea la entrada de log y la guarda.
   *
   * Flujo:
   * 1. Crea un objeto LogEntry con timestamp, nivel, mensaje y datos
   * 2. Lo agrega al array de entradas
   * 3. Selecciona la función de consola adecuada según el nivel:
   *    - error → console.error (aparece en rojo en la consola)
   *    - warn → console.warn (aparece en amarillo)
   *    - info → console.info
   *    - debug → console.debug (solo visible con nivel de logs adecuado)
   * 4. Imprime el mensaje en la consola con el formato [NIVEL] mensaje
   */
  private log(level: LogLevel, message: string, data?: unknown): void {
    const entry: LogEntry = { timestamp: new Date(), level, message, data };
    this.entries.push(entry);
    const fn = level === 'error' ? console.error
      : level === 'warn' ? console.warn
      : level === 'info' ? console.info
      : console.debug;
    fn(`[${level.toUpperCase()}] ${message}`, data);
  }
}
