import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ExpensiveComponent } from './expensive.component';
import { StatsComponent } from './stats.component';
import { HeavyDataService } from './heavy-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe, ExpensiveComponent, StatsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app">
      <header class="header">
        <h1>Render Performance</h1>
        <p class="subtitle">OnPush, Signals &amp; &#64;defer — Angular 22</p>
      </header>

      <main class="main">
        <section class="card">
          <h2>Controls</h2>
          <div class="controls">
            <button class="btn btn-primary" (click)="service.generateItems(1000)">Load 1000 Items</button>
            <button class="btn btn-secondary" (click)="service.generateItems(50)">Load 50 Items</button>
            <button class="btn btn-secondary" (click)="service.generateItems(0)">Clear</button>
          </div>
        </section>

        <app-stats />

        <section class="card">
          <h2>&#64;defer (on interaction)</h2>
          @defer (on interaction) {
            <app-expensive />
          } @placeholder {
            <div class="placeholder">⬇ Click here to load expensive component</div>
          }
        </section>

        <section class="card">
          <h2>&#64;defer (on viewport)</h2>
          @defer (on viewport) {
            <app-expensive />
          } @placeholder {
            <div class="placeholder">⬇ Scroll here to load</div>
          } @loading {
            <div class="loading">Loading...</div>
          }
        </section>

        <section class="card">
          <h2>&#64;defer (on timer)</h2>
          @defer (on timer(3000)) {
            <app-expensive />
          } @placeholder {
            <div class="placeholder">⏳ Will load in 3 seconds...</div>
          } @loading {
            <div class="loading">⏳ Loading after timer...</div>
          }
        </section>

        <div class="spacer"></div>

        @defer (on viewport) {
          <section class="card">
            <h2>Bottom Section (lazy-viewport)</h2>
            <p class="timestamp">Loaded at: {{ now | date:'medium' }}</p>
          </section>
        } @placeholder {
          <div class="placeholder placeholder-lg">⬇ Keep scrolling to load bottom section...</div>
        }
      </main>

      <footer class="footer">
        <p>Total renders: {{ service.renderCount() }}</p>
      </footer>
    </div>
  `,
  styles: [`
    .app { max-width: 720px; margin: 0 auto; padding: 2rem 1rem; }
    .header { text-align: center; margin-bottom: 2rem; }
    .header h1 { font-size: 2rem; color: #1a1a2e; }
    .subtitle { color: #666; font-size: 0.9rem; margin-top: 0.25rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
    .card h2 { font-size: 1rem; font-weight: 600; margin-bottom: 0.75rem; color: #333; }
    .controls { display: flex; gap: 0.5rem; }
    .btn { padding: 0.5rem 1.25rem; border: none; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer; }
    .btn-primary { background: #4361ee; color: #fff; }
    .btn-primary:hover { background: #3a56d4; }
    .btn-secondary { background: #e2e5ea; color: #333; }
    .btn-secondary:hover { background: #d1d5db; }
    .placeholder { background: #f0f2f5; border-radius: 8px; padding: 2rem; text-align: center; color: #888; font-size: 0.9rem; cursor: pointer; }
    .placeholder-lg { padding: 5rem; }
    .loading { background: #fef9e7; border-radius: 8px; padding: 2rem; text-align: center; color: #b7950b; font-size: 0.9rem; }
    .spacer { height: 300px; }
    .timestamp { color: #555; font-size: 0.9rem; }
    .footer { text-align: center; color: #999; font-size: 0.85rem; padding: 2rem 0; }
  `],
})
export class AppComponent {
  service = inject(HeavyDataService);
  now = Date.now();
}
