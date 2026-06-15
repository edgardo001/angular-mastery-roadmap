import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { HeavyDataService } from './heavy-data.service';

@Component({
  selector: 'app-expensive',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="expensive">
      <h3>Expensive Component</h3>
      <p class="meta">Simulates heavy rendering — OnPush strategy</p>
      <div class="stats-bar">
        <span>Items: {{ service.itemsSignal().length }}</span>
        <span>Render #: {{ service.renderCount() }}</span>
      </div>
      <div class="item-list">
        @for (item of service.itemsSignal(); track item.id) {
          <div class="item" [style.background]="getColor(item.value)">
            <span class="item-id">#{{ item.id }}</span>
            <span class="item-label">{{ item.label }}</span>
            <span class="item-value">{{ item.value | number:'1.0-0' }}</span>
            <span class="item-time">{{ item.timestamp | date:'HH:mm:ss' }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .expensive { background: #1a1a2e; color: #eee; border-radius: 12px; padding: 1.25rem; }
    .expensive h3 { margin-bottom: 0.25rem; color: #fff; }
    .meta { font-size: 0.8rem; color: #888; margin-bottom: 0.75rem; }
    .stats-bar { display: flex; gap: 1rem; font-size: 0.8rem; margin-bottom: 0.75rem; color: #a8b2d1; }
    .item-list { max-height: 400px; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; }
    .item { display: flex; gap: 0.75rem; padding: 0.35rem 0.5rem; border-radius: 4px; font-size: 0.8rem; align-items: center; }
    .item-id { color: #64ffda; font-weight: 600; min-width: 2.5rem; }
    .item-label { flex: 1; }
    .item-value { font-family: monospace; min-width: 3rem; text-align: right; }
    .item-time { font-family: monospace; color: #a8b2d1; min-width: 4rem; text-align: right; }
  `],
})
export class ExpensiveComponent {
  service = inject(HeavyDataService);

  getColor(value: number): string {
    const intensity = Math.min(0.15, (value / 1000) * 0.15);
    return `rgba(100, 255, 218, ${intensity})`;
  }
}
