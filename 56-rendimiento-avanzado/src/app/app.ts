// ============================================================
// app.ts — Componente raíz de la app de rendimiento
// ============================================================
// Este componente es el "contenedor principal" que muestra todos los
// ejemplos de optimización de rendimiento: imágenes, carga diferida,
// scroll virtual y métricas Web Vitals.

import { Component } from '@angular/core';

// Importamos los componentes de cada técnica de optimización.
import { OptimizedImageComponent } from './optimized-image';
import { LazySectionComponent } from './lazy-section';
import { VirtualScrollComponent } from './virtual-scroll';
import { PerformanceMetricsComponent } from './performance-metrics';

@Component({
  selector: 'app-root',
  standalone: true,

  // imports: todos los componentes que usamos en el template.
  imports: [
    OptimizedImageComponent,
    LazySectionComponent,
    VirtualScrollComponent,
    PerformanceMetricsComponent
  ],

  template: `
    <header>
      <h1>Angular Performance Optimization</h1>
      <p>Showcasing ngOptimizedImage, &#64;defer, virtual scrolling, and Core Web Vitals</p>
    </header>

    <main>
      <!-- Cada componente muestra una técnica diferente de optimización -->
      <app-optimized-image />
      <app-lazy-section />
      <app-virtual-scroll />
      <app-performance-metrics />
    </main>

    <footer>
      <p>Bundle Budgets: initial ≤ 500kB | total ≤ 1MB</p>
    </footer>
  `,
  styles: [`
    header { background: linear-gradient(135deg, #0f172a, #1e293b); color: white; padding: 2rem; text-align: center; }
    header h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
    header p { color: #94a3b8; }
    main { max-width: 1000px; margin: 2rem auto; padding: 0 1rem; }
    footer { text-align: center; padding: 2rem; color: #94a3b8; font-size: 0.875rem; border-top: 1px solid #e2e8f0; margin-top: 2rem; }
  `]
})
export class App {}
