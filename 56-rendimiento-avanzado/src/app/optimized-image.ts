import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-optimized-image',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <section class="demo-section">
      <h2>Optimized Images (ngOptimizedImage)</h2>
      <div class="image-grid">
        <div class="image-card">
          <h3>Lazy Loaded</h3>
          <img
            [ngSrc]="'https://picsum.photos/seed/a/400/300'"
            width="400"
            height="300"
            priority
            alt="Priority image"
          />
        </div>
        <div class="image-card">
          <h3>Priority</h3>
          <img
            [ngSrc]="'https://picsum.photos/seed/b/400/300'"
            width="400"
            height="300"
            loading="lazy"
            alt="Lazy loaded image"
          />
        </div>
      </div>
    </section>
  `,
  styles: [`
    .demo-section { margin: 2rem 0; }
    h2 { color: #1e293b; margin-bottom: 1rem; }
    .image-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; }
    .image-card { background: white; border-radius: 8px; padding: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .image-card h3 { font-size: 1rem; color: #64748b; margin-bottom: 0.75rem; }
    img { border-radius: 4px; width: 100%; height: auto; }
  `]
})
export class OptimizedImageComponent {}
