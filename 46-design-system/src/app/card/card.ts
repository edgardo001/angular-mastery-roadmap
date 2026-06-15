import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card">
      @if (header) {
        <div class="card__header">
          <ng-content select="[card-header]" />
        </div>
      }
      <div class="card__body">
        <ng-content />
      </div>
      @if (footer) {
        <div class="card__footer">
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
  header = true;
  footer = true;
}
