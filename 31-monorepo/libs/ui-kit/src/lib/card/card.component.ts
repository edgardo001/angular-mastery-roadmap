import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * CardComponent - Tarjeta reutilizable de la UI Kit
 *
 * Ejemplo de uso:
 * <ui-card [header]="true" [footer]="true">
 *   <div card-header>Título</div>
 *   Contenido de la tarjeta
 *   <div card-footer>Pie de página</div>
 * </ui-card>
 */
@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header" *ngIf="header">
        <ng-content select="[card-header]" />
      </div>
      <div class="card-body">
        <ng-content />
      </div>
      <div class="card-footer" *ngIf="footer">
        <ng-content select="[card-footer]" />
      </div>
    </div>
  `,
  styles: [`
    .card { border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
    .card-header { padding: 16px; background: #f8f9fa; border-bottom: 1px solid #e0e0e0; font-weight: 600; }
    .card-body { padding: 16px; }
    .card-footer { padding: 16px; background: #f8f9fa; border-top: 1px solid #e0e0e0; }
  `],
})
export class CardComponent {
  @Input() header = false;
  @Input() footer = false;
}
