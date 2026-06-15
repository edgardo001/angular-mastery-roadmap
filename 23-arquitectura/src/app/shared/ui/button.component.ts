import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button [class]="variant()" (click)="onClick.emit()">
      <ng-content />
    </button>
  `,
  styles: [`
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .primary { background: #c3002f; color: white; }
    .secondary { background: #e5e7eb; color: #111; }
    .ghost { background: transparent; color: #c3002f; }
  `]
})
export class ButtonComponent {
  readonly variant = input<'primary' | 'secondary' | 'ghost'>('primary');
  readonly onClick = output<void>();
}
