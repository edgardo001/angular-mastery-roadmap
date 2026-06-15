import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card">
      @if (imageUrl()) {
        <img [src]="imageUrl()" [alt]="title()" />
      }
      <h3>{{ title() }}</h3>
      <p>{{ description() }}</p>
      <ng-content />
    </div>
  `,
  styles: [`
    .card { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,.08); }
    img { width: 100%; border-radius: 4px; margin-bottom: .75rem; }
    h3 { margin: 0 0 .25rem; font-size: 1.1rem; }
    p { color: #555; font-size: .875rem; line-height: 1.5; }
  `]
})
export class CardComponent {
  readonly title = input('');
  readonly description = input('');
  readonly imageUrl = input('');
}
