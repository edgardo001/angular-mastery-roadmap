/**
 * SERVICIO DE LOGGING (LoggerService)
 * =====================================
 *
 * Servicio para registrar mensajes de información, advertencia y error.
 * Es como un "diario" de la aplicación que registra qué pasa.
 *
 * ANÁLOGÍA: Es como una cámara de seguridad que graba todo:
 * - info(): Registra información normal
 * - warn(): Registra advertencias
 * - error(): Registra errores
 *
 * PALABRAS CLAVE:
 * - @Injectable({ providedIn: 'root' }): Singleton global
 * - console.log: Muestra mensajes en la consola del navegador
 * - console.warn: Muestra advertencias en amarillo
 * - console.error: Muestra errores en rojo
 *
 * ¿POR QUÉ UN SERVICIO SEPARADO?
 * - Centraliza el logging (fácil de cambiar implementación)
 * - Permite agregar funcionalidad (enviar logs a servidor)
 * - Facilita las pruebas (mockear el logger)
 */

// Injectable: Permite que Angular inyecte este servicio
import { Injectable } from '@angular/core';

// providedIn: 'root': Singleton global - UNA sola instancia para toda la app
@Injectable({ providedIn: 'root' })
export class LoggerService {
  // info(): Registra mensajes de información
  // Es como un "aviso normal" en el diario
  info(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  // error(): Registra errores
  // Es como un "incidente grave" en el diario
  error(message: string): void {
    console.error(`[ERROR] ${message}`);
  }

  // warn(): Registra advertencias
  // Es como una "alerta" en el diario
  warn(message: string): void {
    console.warn(`[WARN] ${message}`);
  }
}
