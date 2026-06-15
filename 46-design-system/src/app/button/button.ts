import { Component, input, output } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [class]="'btn btn--' + variant() + ' btn--' + size()"
      [disabled]="disabled()"
      (click)="onClick.emit()">
      <ng-content />
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: var(--spacing-xs);
      border: 2px solid transparent; border-radius: var(--radius-md); cursor: pointer;
      font-family: var(--font-family); font-weight: 600; transition: all 0.2s ease;
    }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn--sm { padding: var(--spacing-xs) var(--spacing-sm); font-size: var(--font-size-sm); }
    .btn--md { padding: var(--spacing-sm) var(--spacing-md); font-size: var(--font-size-base); }
    .btn--lg { padding: var(--spacing-md) var(--spacing-lg); font-size: var(--font-size-lg); }
    .btn--primary { background: var(--color-primary); color: #fff; }
    .btn--primary:hover:not(:disabled) { background: var(--color-primary-hover); }
    .btn--secondary { background: var(--color-secondary); color: #fff; }
    .btn--secondary:hover:not(:disabled) { background: var(--color-secondary-hover); }
    .btn--outline { background: transparent; color: var(--color-primary); border-color: var(--color-primary); }
    .btn--outline:hover:not(:disabled) { background: var(--color-primary); color: #fff; }
    .btn--ghost { background: transparent; color: var(--color-text); }
    .btn--ghost:hover:not(:disabled) { background: var(--color-surface-secondary); }
  `]
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input(false);
  readonly onClick = output<void>();
}
