import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  template: `
    <div class="stat-card">
      <span class="label">{{ label() }}</span>
      <span class="value">{{ value() }}</span>
    </div>
  `,
  styles: [`
    .stat-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
    }
    .label { display: block; font-size: 0.8rem; color: #6b7280; margin-bottom: 0.5rem; }
    .value { font-size: 2rem; font-weight: bold; color: #c3002f; }
  `]
})
export class StatCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<number>();
}
