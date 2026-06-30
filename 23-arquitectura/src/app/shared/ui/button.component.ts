/**
 * COMPONENTE BUTTON COMPARTIDO (ButtonComponent)
 * ================================================
 *
 * Componente reutilizable de botón con diferentes variantes visuales.
 * Es como un "kit de botones" que puedes usar en toda la aplicación.
 *
 * ANÁLOGÍA: Es como un set de botones de colores:
 * - primary: Botón principal (rojo Angular)
 * - secondary: Botón secundario (gris)
 * - ghost: Botón transparente (solo texto)
 *
 * PALABRAS CLAVE:
 * - input(): Signal de entrada (nueva forma de recibir datos)
 * - output(): Signal de salida (nueva forma de emitir eventos)
 * - input.required<type>(): Signal requerida (obligatoria)
 * - (click)="onClick.emit()": Emite el evento cuando se hace clic
 *
 * DIFERENCIA ENTRE @Input() E input():
 * - @Input() es la forma antigua (decoradores)
 * - input() es la forma nueva (signals) - más rápida y tipada
 */

// Component: Decorador del componente
// input, output: Herramientas nuevas de Angular para entradas y salidas
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <!-- [class]="variant()": Aplica la clase CSS según la variante -->
    <!-- (click)="onClick.emit()": Emite el evento al hacer clic -->
    <button [class]="variant()" (click)="onClick.emit()">
      <!-- ng-content: Inserta el texto del botón desde el padre -->
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
  // input(): Signal de entrada con valor por defecto
  // 'primary' | 'secondary' | 'ghost': Tipo unión - solo acepta estos valores
  // Es como un selector con opciones limitadas
  readonly variant = input<'primary' | 'secondary' | 'ghost'>('primary');

  // output(): Signal de salida que emite eventos
  // void: No envía datos, solo notifica que algo pasó
  // Es como un botón de alarma: solo avisa, no envía información
  readonly onClick = output<void>();
}
