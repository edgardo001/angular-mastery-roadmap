// Componente de input reutilizable para un design system
// Permite crear campos de formulario con label, placeholder, errores y ayuda
import { Component, input, model } from '@angular/core';
// FormsModule habilita formularios reactivos y directivas ngModel
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input', // Se usa como <app-input> en templates
  standalone: true, // Componente standalone (no necesita NgModule)
  imports: [FormsModule], // Importamos FormsModule para formularios
  template: `
    <!-- input-group: contenedor del campo con su label y mensajes -->
    <!-- [class.input-group--error]: agrega clase CSS condicionalmente si hay error -->
    <div class="input-group" [class.input-group--error]="error()">
      <!-- label: etiqueta del campo, [for] vincula con el input por id -->
      <label class="input-group__label" [for]="id()">{{ label() }}</label>
      <!-- input: campo de entrada con propiedades reactivas -->
      <!-- [id], [type], [placeholder], [value]: bindings que leen valores de signals -->
      <!-- (input): evento que se dispara cuando el usuario escribe -->
      <input
        [id]="id()"
        class="input-group__field"
        [type]="type()"
        [placeholder]="placeholder()"
        [value]="value()"
        (input)="onInput($event)"
      />
      <!-- @if: nueva sintaxis de control flow (Angular 17+) para condicionales -->
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
  // input(): define una propiedad de entrada reactiva (similar a @Input pero con signals)
  // Cada input tiene un valor por defecto entre paréntesis
  readonly id = input('');
  readonly label = input('');
  readonly placeholder = input('');
  readonly type = input('text');
  readonly error = input('');
  readonly helperText = input('');
  
  // model(): crea una propiedad de dos vías (lectura y escritura)
  // El componente padre puede leer y escribir este valor
  readonly value = model('');
  
  // Maneja el evento input del campo HTML
  // Actualiza el signal value con lo que el usuario escribió
  onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
