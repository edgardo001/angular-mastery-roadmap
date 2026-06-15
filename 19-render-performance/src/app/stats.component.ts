import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { HeavyDataService } from './heavy-data.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stats">
      <div class="stat">
        <span class="stat-value">{{ service.itemsSignal().length }}</span>
        <span class="stat-label">Items Loaded</span>
      </div>
      <div class="stat">
        <span class="stat-value">{{ service.renderCount() }}</span>
        <span class="stat-label">Renders</span>
      </div>
      <div class="stat">
        <span class="stat-value">{{ lastUpdate }}</span>
        <span class="stat-label">Last Update</span>
      </div>
    </div>
  `,
  styles: [`
    .stats { display: flex; justify-content: space-around; padding: 1rem; background: #fff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); margin-bottom: 1rem; }
    .stat { display: flex; flex-direction: column; align-items: center; }
    .stat-value { font-size: 1.5rem; font-weight: 700; color: #4361ee; }
    .stat-label { font-size: 0.8rem; color: #888; }
  `],
})
export class StatsComponent {
  service = inject(HeavyDataService);

  get lastUpdate(): string {
    const items = this.service.itemsSignal();
    return items.length > 0 ? new Date(items[0].timestamp).toLocaleTimeString() : '—';
  }
}
