// BadgeComponent: componente para mostrar etiquetas de estado o categoría
// Un badge es como una etiqueta pegada: muestra información concisa (éxito, error, etc.)
import { Component, input } from '@angular/core';

// Tipo TypeScript que define los colores permitidos para el badge
// 'primary' | 'secondary' | ... significa que solo puede ser uno de esos valores
export type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

@Component({
  selector: 'app-badge', // Se usa como <app-badge> en templates
  standalone: true,
  template: `
    <!-- [class]: binding de clase CSS dinámico -->
    <!-- 'badge badge--' + color() construye clases como "badge badge--primary" -->
    <span [class]="'badge badge--' + color()">
      <!-- ng-content: proyecta el contenido hijo dentro de este componente -->
      <!-- Ejemplo: <app-badge>Texto aquí</app-badge> muestra "Texto aquí" -->
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
  // input<BadgeColor>('primary'): define una entrada con tipo y valor por defecto
  // El padre puede pasar: <app-badge color="success">
  readonly color = input<BadgeColor>('primary');
}
