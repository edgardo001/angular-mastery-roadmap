/**
 * ARCHIVO: app.ts - Componente raíz de la aplicación de Observabilidad
 *
 * Este componente muestra un panel de control de observabilidad que permite:
 * - Ver y generar logs de diferentes niveles (debug, info, warn, error)
 * - Ver métricas Web Vitals (LCP, CLS, FID) en tiempo real
 * - Disparar errores globales para probar el manejador de errores
 *
 * Analogía: Es como el tablero de instrumentos de un avión. Muestra al piloto
 * (desarrollador) toda la información importante sobre el estado del sistema
 * en un solo lugar.
 */

// Component: Decorador de Angular que define las propiedades de un componente.
// inject: Función para obtener servicios sin constructores.
import { Component, inject } from '@angular/core';

// Pipes predefinidos de Angular para formatear datos en el template.
// DatePipe: Formatea fechas. Ejemplo: {{日期 | date:'short'}}
// UpperCasePipe: Convierte texto a mayúsculas. Ejemplo: {{ texto | uppercase }}
// DecimalPipe: Formatea números decimales. Ejemplo: {{ 3.14 | number:'1.2-2' }}
import { DatePipe, UpperCasePipe, DecimalPipe } from '@angular/common';

// Servicios de logging y métricas de rendimiento.
import { LoggerService } from './logger.service';
import { WebVitalsService } from './web-vitals.service';

@Component({
  selector: 'app-root',
  // imports: Lista de pipes/componentes/directivas que este componente usa en su template.
  imports: [DatePipe, UpperCasePipe, DecimalPipe],
  templateUrl: './app.html', // Template HTML externo
  styleUrl: './app.css',     // Estilos CSS externos
})
export class App {
  /**
   * inject(): Obtiene el servicio LoggerService.
   * Este servicio registra mensajes de log en la consola y en un array interno.
   */
  private readonly logger = inject(LoggerService);

  /**
   * webVitals: Servicio que mide métricas de rendimiento Web Vitals.
   * Está expuesto como readonly para que el template pueda acceder a él.
   */
  readonly webVitals = inject(WebVitalsService);

  /**
   * Métodos para generar logs de diferentes niveles.
   * Cada método llama al servicio de logging con un nivel específico.
   */
  logDebug(): void {
    this.logger.debug('Debug message', { key: 'value' });
  }

  logInfo(): void {
    this.logger.info('Info message', { user: 'test' });
  }

  logWarn(): void {
    this.logger.warn('Warning message', { threshold: 0.9 });
  }

  logError(): void {
    this.logger.error('Error message', { code: 500 });
  }

  /**
   * triggerGlobalError: Lanza un error intencional para probar
   * el manejador global de errores (AppErrorHandler).
   *
   * Cuando se ejecuta, Angular captura el error y lo envía
   * automáticamente al AppErrorHandler que lo registra en el log.
   */
  triggerGlobalError(): void {
    throw new Error('Simulated error for Sentry');
  }

  /**
   * logs: Getter que devuelve la lista de logs almacenados.
   * En el template se usa como {{ logs }} para mostrar todos los registros.
   */
  get logs() {
    return this.logger.getAll();
  }
}
