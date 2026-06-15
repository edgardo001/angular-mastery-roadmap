import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="input-group" [class.input-group--error]="error()">
      <label class="input-group__label" [for]="id()">{{ label() }}</label>
      <input
        [id]="id()"
        class="input-group__field"
        [type]="type()"
        [placeholder]="placeholder()"
        [value]="value()"
        (input)="onInput($event)"
      />
      @if (error()) {
        <span class="input-group__error">{{ error() }}</span>
      }
      @if (helperText() && !error()) {
        <span class="input-group__helper">{{ helperText() }}</span>
      }
    </div>
  `,
  styles: [`
    .input-group { display: flex; flex-direction: column; gap: var(--spacing-xs); }
    .input-group__label { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text); }
    .input-group__field {
      padding: var(--spacing-sm) var(--spacing-md); border: 2px solid var(--color-border);
      border-radius: var(--radius-md); font-family: var(--font-family); font-size: var(--font-size-base);
      transition: border-color 0.2s; outline: none;
    }
    .input-group__field:focus { border-color: var(--color-primary); }
    .input-group--error .input-group__field { border-color: var(--color-error); }
    .input-group__error { font-size: var(--font-size-sm); color: var(--color-error); }
    .input-group__helper { font-size: var(--font-size-sm); color: var(--color-text-secondary); }
  `]
})
export class InputComponent {
  readonly id = input(''); readonly label = input('');
  readonly placeholder = input(''); readonly type = input('text');
  readonly error = input(''); readonly helperText = input('');
  readonly value = model('');
  onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
