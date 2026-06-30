// CardComponent: contenedor visual con sombra, borde y secciones
// Una card es como una tarjeta: agrupa información relacionada visualmente
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card">
      <!-- @if: control flow moderno de Angular (reemplaza *ngIf) -->
      <!-- Muestra el header solo si la propiedad header es true -->
      @if (header) {
        <div class="card__header">
          <!-- select="[card-header]": proyecta solo contenido con atributo card-header -->
          <!-- Ejemplo: <div card-header>Título</div> se muestra aquí -->
          <ng-content select="[card-header]" />
        </div>
      }
      <!-- card__body: contenido principal de la card (siempre se muestra) -->
      <div class="card__body">
        <!-- ng-content sin select: proyecta todo el contenido que no tiene selector -->
        <ng-content />
      </div>
      @if (footer) {
        <div class="card__footer">
          <!-- select="[card-footer]": proyecta contenido con atributo card-footer -->
          <ng-content select="[card-footer]" />
        </div>
      }
    </div>
  `,
  styles: [`
    .card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); overflow: hidden; }
    .card__header { padding: var(--spacing-md) var(--spacing-md) 0; font-size: var(--font-size-lg); font-weight: 700; }
    .card__body { padding: var(--spacing-md); }
    .card__footer { padding: 0 var(--spacing-md) var(--spacing-md); border-top: 1px solid var(--color-border); padding-top: var(--spacing-md); }
  `]
})
export class CardComponent {
  // Propiedades que controlan si se muestran header y footer
  // El padre puede sobrescribir: <app-card [header]="false">
  header = true;
  footer = true;
}
