/**
 * Servicio de Logging condicional.
 *
 * - info(): solo escribe en consola si config.debug es true
 * - warn(): siempre escribe (advertencia)
 * - error(): siempre escribe (error)
 *
 * ANLOGÍA: Es como un periodista que solo escribe artículos
 * detallados cuando le pagan por ello (debug mode).
 * Las advertencias y errores siempre los reporta.
 */

import { Injectable, inject } from '@angular/core';
import { APP_CONFIG } from '../config';

/**
 * @Injectable({ providedIn: 'root' }) crea un singleton global.
 * Angular crea UNA SOLA instancia y la reutiliza en toda la app.
 */
@Injectable({ providedIn: 'root' })
export class LoggerService {
  /**
   * inject(APP_CONFIG) obtiene la configuración InjectionToken.
   * Es como pedir el "menú del día" al restaurante.
   */
  private config = inject(APP_CONFIG);

  /**
   * Log condicional: solo se muestra si debug está activado.
   * Es como un interruptor de luz — si está apagado, no ves nada.
   */
  info(msg: string): void {
    if (this.config.debug) {
      console.log(\`[INFO] \${msg}\`);
    }
  }

  /** Log de advertencia: siempre visible */
  warn(msg: string): void {
    console.warn(\`[WARN] \${msg}\`);
  }

  /** Log de error: siempre visible */
  error(msg: string): void {
    console.error(\`[ERROR] \${msg}\`);
  }
}
