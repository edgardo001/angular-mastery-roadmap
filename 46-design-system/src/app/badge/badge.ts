import { Component, input } from '@angular/core';

export type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `
    <span [class]="'badge badge--' + color()">
      <ng-content />
    </span>
  `,
  styles: [`
    .badge {
      display: inline-flex; align-items: center; padding: 2px var(--spacing-sm);
      border-radius: 999px; font-size: var(--font-size-sm); font-weight: 600;
    }
    .badge--primary { background: #eef2ff; color: var(--color-primary); }
    .badge--secondary { background: #fdf2f8; color: var(--color-secondary); }
    .badge--success { background: #f0fdf4; color: var(--color-success); }
    .badge--warning { background: #fffbeb; color: var(--color-warning); }
    .badge--error { background: #fef2f2; color: var(--color-error); }
  `]
})
export class BadgeComponent {
  readonly color = input<BadgeColor>('primary');
}
