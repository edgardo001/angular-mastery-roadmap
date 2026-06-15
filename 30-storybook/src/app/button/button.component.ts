import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [class]="variant()"
      [attr.aria-label]="'Botón: ' + label()"
      (click)="clicked.emit()"
    >
      {{ label() }}
    </button>
  `,
  styles: [`
    button { padding: .6rem 1.2rem; border: none; border-radius: 6px; cursor: pointer; font-size: .95rem; font-weight: 500; transition: opacity .2s; }
    button:hover { opacity: .85; }
    .primary { background: #1a73e8; color: #fff; }
    .secondary { background: #e8e8e8; color: #333; }
  `]
})
export class ButtonComponent {
  readonly label = input('Button');
  readonly variant = input<'primary' | 'secondary'>('primary');
  readonly clicked = output<void>();
}
