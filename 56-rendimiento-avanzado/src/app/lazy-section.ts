import { Component } from '@angular/core';

@Component({
  selector: 'app-heavy-section',
  standalone: true,
  template: `
    <div class="heavy-content">
      <h3>Heavy Deferred Section</h3>
      <p>This content was loaded lazily using &#64;defer with a placeholder and loading state.</p>
      <div class="stats">
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
  items = [
    { value: '12K', label: 'Users' },
    { value: '3.4K', label: 'Posts' },
    { value: '891', label: 'Comments' },
    { value: '47', label: 'Articles' }
  ];
}

@Component({
  selector: 'app-lazy-section',
  standalone: true,
  imports: [HeavySectionComponent],
  template: `
    <section class="demo-section">
      <h2>&#64;defer (Deferred Loading)</h2>
      <p class="note">Scroll or interact to trigger lazy loading of content below.</p>

      <div class="placeholder" #trigger>
        <p>Scroll here to load deferred content...</p>
      </div>

      @defer (on viewport(trigger)) {
        <app-heavy-section />
      } @placeholder {
        <div class="ph-box">
          <p>Placeholder — content will appear when visible</p>
        </div>
      } @loading {
        <div class="loading-box">
          <p>Loading deferred content...</p>
        </div>
      } @error {
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
