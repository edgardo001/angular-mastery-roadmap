/**
 * ARCHIVO: web-vitals.service.ts - Servicio de métricas Web Vitals
 *
 * Web Vitals son métricas estándar que miden la experiencia real del usuario
 * al interactuar con una página web. Google las usa para evaluar la calidad
 * de las páginas web.
 *
 * Las 3 métricas principales que medimos aquí:
 * - LCP (Largest Contentful Paint): Cuánto tiempo tarda en cargarse el contenido principal.
 *   - Bueno: ≤ 2.5 segundos
 *   - Necesita mejora: ≤ 4 segundos
 *   - Malo: > 4 segundos
 *
 * - CLS (Cumulative Layout Shift): Cuánto se "mueven" los elementos inesperadamente.
 *   - Bueno: ≤ 0.1
 *   - Necesita mejora: ≤ 0.25
 *   - Malo: > 0.25
 *
 * - FID (First Input Delay): Cuánto tiempo tarda en responder al primer clic del usuario.
 *   - Bueno: ≤ 100ms
 *   - Necesita mejora: ≤ 300ms
 *   - Malo: > 300ms
 *
 * Analogía: Es como un podómetro para tu sitio web. Mide qué tan "en forma"
 * está tu aplicación en términos de velocidad y estabilidad visual.
 */

// Injectable: Decorador de Angular que marca una clase como "servicio" que puede
// ser inyectada (suministrada) a otros componentes o servicios.
import { Injectable, signal } from '@angular/core';

// Funciones de la librería 'web-vitals' que miden las métricas de rendimiento.
// onLCP: Observa el Largest Contentful Paint.
// onCLS: Observa el Cumulative Layout Shift.
// onFID: Observa el First Input Delay.
import { onLCP, onCLS, onFID } from 'web-vitals';

/**
 * Interfaz que define la estructura de una métrica Web Vital.
 * Cada métrica tiene un nombre, un valor numérico y una clasificación.
 */
export interface WebVitalMetric {
  name: string;  // Nombre de la métrica: 'LCP', 'CLS' o 'FID'
  value: number; // Valor numérico de la métrica
  rating: 'good' | 'needs-improvement' | 'poor'; // Clasificación según los estándares de Google
}

/**
 * Función auxiliar que clasifica el valor de una métrica en una categoría.
 *
 * Para CLS se usan umbrales diferentes (0.1, 0.25) porque mide cambios
 * de diseño acumulados, no tiempo en milisegundos.
 */
function rating(value: number, name: string): WebVitalMetric['rating'] {
  if (name === 'CLS') {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }
  // Para LCP y FID se usan los mismos umbrales (en milisegundos).
  if (value <= 2500) return 'good';
  if (value <= 4000) return 'needs-improvement';
  return 'poor';
}

@Injectable({ providedIn: 'root' })
export class WebVitalsService {
  /**
   * metrics: Signal que contiene la lista de métricas recolectadas.
   * Es un array que se actualiza cada vez que una nueva métrica está disponible.
   */
  readonly metrics = signal<WebVitalMetric[]>([]);

  constructor() {
    // onLCP, onCLS, onFID: Registran callbacks que se ejecutan cuando
    // el navegador reporta cada métrica. El navegador mide automáticamente
    // y nos avisa cuando tiene el dato listo.
    onLCP((m) => this.addMetric('LCP', m.value));
    onCLS((m) => this.addMetric('CLS', m.value));
    onFID((m) => this.addMetric('FID', m.value));
  }

  /**
   * addMetric: Agrega o actualiza una métrica en la lista.
   *
   * Si ya existe una métrica con el mismo nombre, la reemplaza.
   * Si no existe, la agrega al final del array.
   *
   * El operador spread (...) crea un nuevo array con los filtros aplicados,
   * preservando la inmutabilidad (importante para signals).
   */
  private addMetric(name: string, value: number): void {
    this.metrics.update((prev) => [
      ...prev.filter((m) => m.name !== name), // Elimina la versión anterior
      { name, value, rating: rating(value, name) }, // Agrega la nueva versión
    ]);
  }
}
