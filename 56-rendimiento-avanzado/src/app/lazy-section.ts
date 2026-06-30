// ============================================================
// lazy-section.ts — Carga diferida con @defer
// ============================================================
// @defer es una directiva de Angular 22+ que carga componentes de forma
// lazy (diferida). En lugar de cargar todo el JavaScript al inicio,
// solo carga lo que el usuario necesita ver. Es como un restaurante
// que prepara los platos solo cuando el cliente los pide, no todos de antemano.

import { Component } from '@angular/core';

// ============================================================
// HeavySectionComponent — Contenido pesado que se carga bajo demanda
// ============================================================
// Este componente representa contenido que es "pesado" (muchos datos,
// gráficos, etc.) y que solo queremos cargar cuando el usuario lo necesite.
@Component({
  selector: 'app-heavy-section',
  standalone: true,
  template: `
    <div class="heavy-content">
      <h3>Heavy Deferred Section</h3>
      <p>This content was loaded lazily using &#64;defer with a placeholder and loading state.</p>
      <div class="stats">
        <!-- @for itera sobre los items y muestra cada estadística -->
        @for (item of items; track item) {
          <div class="stat-card">
            <span class="number">{{ item.value }}</span>
            <span class="label">{{ item.label }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .heavy-content { background: white; border-radius: 8px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    h3 { color: #1e293b; margin-bottom: 0.5rem; }
    p { color: #64748b; margin-bottom: 1rem; }
    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; }
    .stat-card { text-align: center; padding: 1rem; background: #f8fafc; border-radius: 6px; }
    .number { display: block; font-size: 1.5rem; font-weight: 700; color: #3b82f6; }
    .label { display: block; font-size: 0.75rem; color: #94a3b8; margin-top: 0.25rem; }
  `]
})
export class HeavySectionComponent {
  // Datos de ejemplo: estadísticas que se muestran en la sección.
  items = [
    { value: '12K', label: 'Users' },
    { value: '3.4K', label: 'Posts' },
    { value: '891', label: 'Comments' },
    { value: '47', label: 'Articles' }
  ];
}

// ============================================================
// LazySectionComponent — Demostración de @defer
// ============================================================
// Este componente usa @defer para cargar HeavySectionComponent
// solo cuando el usuario hace scroll hasta ella.
@Component({
  selector: 'app-lazy-section',
  standalone: true,

  // imports: necesitamos HeavySectionComponent para poder mostrarlo.
  imports: [HeavySectionComponent],

  template: `
    <section class="demo-section">
      <h2>&#64;defer (Deferred Loading)</h2>
      <p class="note">Scroll or interact to trigger lazy loading of content below.</p>

      <!-- #trigger — referencia local: el elemento que activa la carga -->
      <div class="placeholder" #trigger>
        <p>Scroll here to load deferred content...</p>
      </div>

      <!-- @defer: carga el contenido cuando #trigger es visible en el viewport -->
      <!-- (on viewport(trigger)) — se activa cuando el elemento trigger aparece en pantalla -->
      @defer (on viewport(trigger)) {
        <app-heavy-section />
      } @placeholder {
        <!-- @placeholder: lo que se muestra ANTES de que se cargue el contenido -->
        <div class="ph-box">
          <p>Placeholder — content will appear when visible</p>
        </div>
      } @loading {
        <!-- @loading: lo que se muestra MIENTRAS se carga el contenido -->
        <div class="loading-box">
          <p>Loading deferred content...</p>
        </div>
      } @error {
        <!-- @error: lo que se muestra si falla la carga -->
        <div class="error-box">
          <p>Failed to load content</p>
        </div>
      }
    </section>
  `,
  styles: [`
    .demo-section { margin: 2rem 0; }
    h2 { color: #1e293b; margin-bottom: 0.5rem; }
    .note { color: #64748b; font-size: 0.875rem; margin-bottom: 1rem; }
    .placeholder { height: 100px; background: #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
    .ph-box, .loading-box, .error-box { padding: 2rem; text-align: center; background: #f8fafc; border-radius: 8px; border: 2px dashed #cbd5e1; color: #94a3b8; }
    .loading-box { border-color: #3b82f6; }
    .error-box { border-color: #ef4444; color: #ef4444; }
  `]
})
export class LazySectionComponent {}
