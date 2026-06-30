import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ButtonComponent - Botón reutilizable de la UI Kit
 *
 * Ejemplo de uso en cualquier app del monorepo:
 * <ui-button variant="primary" size="md" (onClick)="handleClick()">Click me</ui-button>
 */
@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="'btn btn--' + variant + ' btn--' + size"
      [disabled]="disabled"
      (click)="onClick.emit($event)">
      <ng-content />
    </button>
  `,
  styles: [`
    .btn { border: none; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.2s; }
    .btn--primary { background: #1a73e8; color: white; }
    .btn--secondary { background: #5f6368; color: white; }
    .btn--sm { padding: 6px 12px; font-size: 12px; }
    .btn--md { padding: 8px 16px; font-size: 14px; }
    .btn--lg { padding: 12px 24px; font-size: 16px; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn:hover:not(:disabled) { filter: brightness(1.1); }
  `],
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<Event>();
}
