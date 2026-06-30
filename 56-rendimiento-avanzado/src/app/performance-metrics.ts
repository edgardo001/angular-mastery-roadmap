// ============================================================
// performance-metrics.ts — Métricas Core Web Vitals
// ============================================================
// Core Web Vitals son métricas que Google usa para medir la calidad
// de la experiencia de usuario en tu sitio web:
// - FCP (First Contentful Paint): cuándo aparece el primer contenido
// - LCP (Largest Contentful Paint): cuándo carga el contenido principal
// - CLS (Cumulative Layout Shift): cuánto se mueve el layout inesperadamente
// - TTFB (Time to First Byte): cuánto tarda el servidor en responder

import { Component, OnInit, signal, WritableSignal } from '@angular/core';

// TitleCasePipe: un "pipe" de Angular que convierte texto a Title Case.
// Es como un filtro: transforma "hello world" en "Hello World".
import { TitleCasePipe } from '@angular/common';

// WebVital: define la forma de una métrica de rendimiento.
interface WebVital {
  name: string;    // Nombre de la métrica (FCP, LCP, etc.)
  value: string;   // Valor formateado (ej: "1200ms")
  rating: 'good' | 'needs-improvement' | 'poor';  // Calificación según Google
  description: string;  // Descripción de qué mide
}

@Component({
  selector: 'app-performance-metrics',
  standalone: true,

  // imports: necesitamos TitleCasePipe para usar | titlecase en el template.
  imports: [TitleCasePipe],

  template: `
    <section class="demo-section">
      <h2>Core Web Vitals</h2>
      <p class="note">Real-time performance metrics from the browser.</p>

      <div class="metrics-grid">
        <!-- @for itera sobre las métricas y muestra cada una en una tarjeta -->
        @for (vital of vitals(); track vital.name) {
          <!-- [class]="vital.rating" — agrega una clase CSS según la calificación -->
          <div class="metric-card" [class]="vital.rating">
            <div class="metric-header">
              <h3>{{ vital.name }}</h3>
              <!-- | titlecase — pipe que convierte "needs-improvement" a "Needs Improvement" -->
              <span class="badge">{{ vital.rating | titlecase }}</span>
            </div>
            <div class="metric-value">{{ vital.value }}</div>
            <p class="metric-desc">{{ vital.description }}</p>
          </div>
        }
      </div>

      <div class="custom-metrics">
        <h3>Additional Metrics</h3>
        <div class="custom-grid">
          <div class="custom-item">
            <span class="label">JS Heap Used</span>
            <span class="value">{{ jsHeap() }}</span>
          </div>
          <div class="custom-item">
            <span class="label">DOM Nodes</span>
            <span class="value">{{ domNodes() }}</span>
          </div>
          <div class="custom-item">
            <span class="label">Resource Size</span>
            <span class="value">{{ resourceSize() }}</span>
          </div>
          <div class="custom-item">
            <span class="label">Navigation Type</span>
            <span class="value">{{ navigationType() }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .demo-section { margin: 2rem 0; }
    h2 { color: #1e293b; margin-bottom: 0.5rem; }
    h3 { color: #475569; margin-bottom: 0.5rem; }
    .note { color: #64748b; font-size: 0.875rem; margin-bottom: 1rem; }
    .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .metric-card { background: white; padding: 1.25rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-top: 4px solid #e2e8f0; }
    .metric-card.good { border-top-color: #22c55e; }
    .metric-card.needs-improvement { border-top-color: #eab308; }
    .metric-card.poor { border-top-color: #ef4444; }
    .metric-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
    .metric-header h3 { margin: 0; font-size: 0.875rem; }
    .badge { font-size: 0.75rem; padding: 0.125rem 0.5rem; border-radius: 999px; background: #f1f5f9; }
    .good .badge { background: #dcfce7; color: #166534; }
    .needs-improvement .badge { background: #fef9c3; color: #854d0e; }
    .poor .badge { background: #fee2e2; color: #991b1b; }
    .metric-value { font-size: 2rem; font-weight: 700; color: #0f172a; margin-bottom: 0.25rem; }
    .metric-desc { font-size: 0.75rem; color: #94a3b8; }
    .custom-metrics { background: white; padding: 1.25rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .custom-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
    .custom-item { display: flex; justify-content: space-between; padding: 0.5rem; background: #f8fafc; border-radius: 6px; }
    .custom-item .label { font-size: 0.875rem; color: #64748b; }
    .custom-item .value { font-weight: 600; color: #0f172a; }
  `]
})
export class PerformanceMetricsComponent implements OnInit {
  // vitals: array de métricas Web Vitals que se muestran en pantalla.
  vitals: WritableSignal<WebVital[]> = signal([]);

  // Métricas adicionales del navegador.
  jsHeap: WritableSignal<string> = signal('N/A');
  domNodes: WritableSignal<string> = signal('0');
  resourceSize: WritableSignal<string> = signal('0 KB');
  navigationType: WritableSignal<string> = signal('navigate');

  // observer: PerformanceObserver para monitorear cambios en métricas.
  private observer: PerformanceObserver | null = null;

  // ngOnInit: se ejecuta cuando el componente está listo.
  ngOnInit() {
    this.collectMetrics();
    this.observePerformance();
  }

  // collectMetrics: recopila todas las métricas de rendimiento del navegador.
  private collectMetrics() {
    const vitals: WebVital[] = [];

    // performance.getEntriesByType('paint'): obtiene eventos de pintura del navegador.
    const paint = performance.getEntriesByType('paint');
    // FCP: cuándo se pintó el primer contenido visible.
    const fcp = paint.find(e => e.name === 'first-contentful-paint');
    if (fcp) {
      vitals.push(this.makeVital('FCP', fcp.startTime, 1800, 3000, 'First Contentful Paint'));
    }

    // LCP: cuándo cargó el elemento más grande visible.
    const lcpEntry = performance.getEntriesByType('largest-contentful-paint');
    if (lcpEntry.length) {
      vitals.push(this.makeVital('LCP', lcpEntry[lcpEntry.length - 1].startTime, 2500, 4000, 'Largest Contentful Paint'));
    }

    // CLS: cuánto se movió el layout de forma inesperada.
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'layout-shift') {
          const cls = (entry as any).value || 0;
          vitals.push(this.makeVital('CLS', cls * 100, 0.1, 0.25, 'Cumulative Layout Shift'));
        }
      }
    });
    observer.observe({ type: 'layout-shift', buffered: true });
    this.observer = observer;

    // TTFB: cuánto tardó el servidor en enviar la primera respuesta.
    const ttfb = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (ttfb) {
      vitals.push(this.makeVital('TTFB', ttfb.responseStart - ttfb.requestStart, 800, 1800, 'Time to First Byte'));
    }

    // memory: API no estándar que muestra uso de memoria (solo Chrome).
    if ((performance as any).memory) {
      const mem = (performance as any).memory;
      this.jsHeap.set(`${Math.round(mem.usedJSHeapSize / 1024 / 1024)} MB`);
    }

    // Cuenta todos los nodos DOM de la página.
    this.domNodes.set(document.querySelectorAll('*').length.toString());
    this.navigationType.set(ttfb?.type || 'navigate');

    // Calcula el tamaño total de recursos descargados.
    const resources = performance.getEntriesByType('resource');
    const totalSize = resources.reduce((sum, r) => sum + ((r as any).transferSize || 0), 0);
    this.resourceSize.set(`${Math.round(totalSize / 1024)} KB`);

    this.vitals.set(vitals);
  }

  // observePerformance: configura observers para métricas futuras.
  private observePerformance() {
    try {
      const lcpObserver = new PerformanceObserver(() => {});
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {}
  }

  // makeVital: crea un objeto WebVital con la calificación correcta.
  private makeVital(name: string, value: number, good: number, poor: number, description: string): WebVital {
    // Clasifica el valor como good, needs-improvement o poor según los umbrales de Google.
    const rating = value <= good ? 'good' : value <= poor ? 'needs-improvement' : 'poor';
    const formatted = name === 'CLS' ? (value / 100).toFixed(2) : `${Math.round(value)}ms`;
    return { name, value: formatted, rating, description };
  }
}
