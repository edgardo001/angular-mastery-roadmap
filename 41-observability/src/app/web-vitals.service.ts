import { Injectable, signal } from '@angular/core';
import { onLCP, onCLS, onFID } from 'web-vitals';

export interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

function rating(value: number, name: string): WebVitalMetric['rating'] {
  if (name === 'CLS') {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }
  if (value <= 2500) return 'good';
  if (value <= 4000) return 'needs-improvement';
  return 'poor';
}

@Injectable({ providedIn: 'root' })
export class WebVitalsService {
  readonly metrics = signal<WebVitalMetric[]>([]);

  constructor() {
    onLCP((m) => this.addMetric('LCP', m.value));
    onCLS((m) => this.addMetric('CLS', m.value));
    onFID((m) => this.addMetric('FID', m.value));
  }

  private addMetric(name: string, value: number): void {
    this.metrics.update((prev) => [
      ...prev.filter((m) => m.name !== name),
      { name, value, rating: rating(value, name) },
    ]);
  }
}
