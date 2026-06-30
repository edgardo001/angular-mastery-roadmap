// =============================================================================
// ARCHIVO: button.component.ts
// PROPÓSITO: Componente reutilizable de botón documentado con Storybook
// =============================================================================
//
// Componente de UI puro que renderiza un botón con dos variantes de estilo.
// Está diseñado para ser usado tanto en la app como documentado en Storybook.
//
// ¿Qué hace este componente?
// Recibe un texto (label) y un estilo (variant), y muestra un botón.
// Cuando el usuario hace clic, emite un evento (clicked) al padre.
//
// Patrón "Presentational Component":
// - No tiene lógica de negocio
// - Solo maneja UI y eventos
// - El padre decide qué hacer cuando se hace clic
// =============================================================================

// Component: Decorador de Angular
// input: Para recibir datos del padre (props reactivas)
// output: Para emitir eventos al padre
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,

  template: `
    <button
      <!--
        [class]="variant()": Binding de clase dinámico.
        Si variant() es 'primary', el botón tiene la clase CSS "primary".
        Si es 'secondary', tiene la clase "secondary".
        Las clases definen los colores: primary = azul, secondary = gris.
      -->
      [class]="variant()"
      
      <!--
        [attr.aria-label]: Binding de atributo para accesibilidad.
        aria-label le dice a los lectores de pantalla (para personas
        con discapacidad visual) qué hace este botón.
        Es como poner un letrero en Braille en la puerta.
      -->
      [attr.aria-label]="'Botón: ' + label()"
      
      <!--
        (click)="clicked.emit()": Event Binding.
        Cuando el usuario hace clic, emite el evento "clicked" al padre.
        El padre puede escucharlo así:
        <app-button (clicked)="miMetodo()" />
      -->
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
  // input(): Propiedad de entrada (prop) con valor por defecto.
  // El padre puede sobreescribirlo: <app-button label="Guardar" />
  // Si no se pasa, usa el valor por defecto: 'Button'
  readonly label = input('Button');

  // input() con tipo genérico: solo acepta 'primary' | 'secondary'.
  // TypeScript garantiza que no se pueda pasar un valor inválido.
  // Es como un menú con solo 2 opciones: no puedes pedir algo que no existe.
  readonly variant = input<'primary' | 'secondary'>('primary');

  // output(): Crea un evento que el componente puede emitir al padre.
  // El padre lo escucha con (clicked)="miMetodo()".
  //
  // void significa que el evento no carries datos adicionales.
  // Es como un timbre: solo suena (evento), no lleva información附加.
  // Si necesitaras datos, usarías output<string>() o similar.
  readonly clicked = output<void>();
}
