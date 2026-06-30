// ButtonComponent: botón reutilizable con variantes de estilo y tamaño
// Un botón es como un interruptor: el usuario hace clic para ejecutar una acción
import { Component, input, output } from '@angular/core';

// Tipos para las variantes visuales del botón
// primary: botón principal (llamativo), secondary: secundario, outline: borde, ghost: transparente
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
// Tamaños del botón
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <!-- button: elemento HTML estándar -->
    <!-- [class]: clases CSS dinámicas basadas en variant y size -->
    <!-- [disabled]: deshabilita el botón cuando es true -->
    <!-- (click): evento que se dispara al hacer clic -->
    <button
      [class]="'btn btn--' + variant() + ' btn--' + size()"
      [disabled]="disabled()"
      (click)="onClick.emit()">
      <!-- ng-content: proyecta el texto o contenido del botón -->
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
  // input(): propiedades que el padre puede pasar al componente
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input(false);
  
  // output(): evento que el componente emite al padre
  // El padre escucha con (onClick)="miMetodo()" en el template
  readonly onClick = output<void>();
}
