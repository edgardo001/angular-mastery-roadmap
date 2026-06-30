/**
 * Servicio abstracto de Analytics con dos implementaciones.
 *
 * Patrón: Abstract Class + useClass provider.
 * - AnalyticsService: la "interfaz" (qué hace)
 * - ConsoleAnalyticsService: implementación real
 * - MockAnalyticsService: implementación falsa para tests/desarrollo
 *
 * ANLOGÍA: Es como un enchufe eléctrico (AnalyticsService):
 * - Puedes conectar una lámpara real (ConsoleAnalytics)
 * - O una lámpara de juguete para probar (MockAnalytics)
 * - El enchufe no cambia — solo cambias el aparato que conectas
 */

import { Injectable } from '@angular/core';

/**
 * Clase abstracta: define el CONTRATO que toda implementación debe cumplir.
 * No se puede instanciar directamente — solo las clases hijas.
 */
export abstract class AnalyticsService {
  abstract track(event: string, data?: Record<string, unknown>): void;
}

/**
 * Implementación CONSOLE: escribe eventos en la consola del navegador.
 * Es como un "diario" que registra todo lo que haces.
 */
@Injectable()
export class ConsoleAnalyticsService extends AnalyticsService {
  override track(event: string, data?: Record<string, unknown>): void {
    console.log(\`[Analytics] \${event}\`, data ?? {});
  }
}

/**
 * Implementación MOCK: simula el tracking pero no hace nada real.
 * Útil para tests y desarrollo sin enviar datos a un servidor.
 *
 * ANLOGÍA: Es como un "cajero automático de juguete" —
 * funciona igual pero no mueve dinero real.
 */
@Injectable()
export class MockAnalyticsService extends AnalyticsService {
  override track(_event: string, _data?: Record<string, unknown>): void {
    console.log(\`[MockAnalytics] \${_event} (not tracked)\`);
  }
}
