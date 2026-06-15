import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

interface WebVital {
  name: string;
  value: string;
  rating: 'good' | 'needs-improvement' | 'poor';
  description: string;
}

@Component({
  selector: 'app-performance-metrics',
  standalone: true,
  imports: [TitleCasePipe],
  template: `
    <section class="demo-section">
      <h2>Core Web Vitals</h2>
      <p class="note">Real-time performance metrics from the browser.</p>

      <div class="metrics-grid">
        @for (vital of vitals(); track vital.name) {
          <div class="metric-card" [class]="vital.rating">
            <div class="metric-header">
              <h3>{{ vital.name }}</h3>
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
  vitals: WritableSignal<WebVital[]> = signal([]);
  jsHeap: WritableSignal<string> = signal('N/A');
  domNodes: WritableSignal<string> = signal('0');
  resourceSize: WritableSignal<string> = signal('0 KB');
  navigationType: WritableSignal<string> = signal('navigate');
  private observer: PerformanceObserver | null = null;

  ngOnInit() {
    this.collectMetrics();
    this.observePerformance();
  }

  private collectMetrics() {
    const vitals: WebVital[] = [];

    const paint = performance.getEntriesByType('paint');
    const fcp = paint.find(e => e.name === 'first-contentful-paint');
    if (fcp) {
      vitals.push(this.makeVital('FCP', fcp.startTime, 1800, 3000, 'First Contentful Paint'));
    }

    const lcpEntry = performance.getEntriesByType('largest-contentful-paint');
    if (lcpEntry.length) {
      vitals.push(this.makeVital('LCP', lcpEntry[lcpEntry.length - 1].startTime, 2500, 4000, 'Largest Contentful Paint'));
    }

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

    const ttfb = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (ttfb) {
      vitals.push(this.makeVital('TTFB', ttfb.responseStart - ttfb.requestStart, 800, 1800, 'Time to First Byte'));
    }

    if ((performance as any).memory) {
      const mem = (performance as any).memory;
      this.jsHeap.set(`${Math.round(mem.usedJSHeapSize / 1024 / 1024)} MB`);
    }

    this.domNodes.set(document.querySelectorAll('*').length.toString());
    this.navigationType.set(ttfb?.type || 'navigate');

    const resources = performance.getEntriesByType('resource');
    const totalSize = resources.reduce((sum, r) => sum + ((r as any).transferSize || 0), 0);
    this.resourceSize.set(`${Math.round(totalSize / 1024)} KB`);

    this.vitals.set(vitals);
  }

  private observePerformance() {
    try {
      const lcpObserver = new PerformanceObserver(() => {});
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {}
  }

  private makeVital(name: string, value: number, good: number, poor: number, description: string): WebVital {
    const rating = value <= good ? 'good' : value <= poor ? 'needs-improvement' : 'poor';
    const formatted = name === 'CLS' ? (value / 100).toFixed(2) : `${Math.round(value)}ms`;
    return { name, value: formatted, rating, description };
  }
}
