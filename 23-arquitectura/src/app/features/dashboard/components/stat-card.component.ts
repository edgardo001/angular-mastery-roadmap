/**
 * COMPONENTE DE TARJETA DE ESTADÍSTICA (StatCardComponent)
 * ========================================================
 *
 * Muestra una estadística individual con etiqueta y valor.
 * Es como un "medidor" en un panel de control.
 *
 * ANÁLOGÍA: Es como un reloj en el salpicadero de un auto:
 * - Muestra una medida específica (velocidad, gasolina, etc.)
 * - Tiene una etiqueta que explica qué muestra
 * - Tiene un valor numérico grande y visible
 *
 * PALABRAS CLAVE:
 * - input.required<string>(): Signal de entrada obligatoria de tipo string
 * - input.required<number>(): Signal de entrada obligatoria de tipo number
 * - label(): Lee el valor de la signal label
 * - value(): Lee el valor de la signal value
 *
 * ¿POR QUÉ input.required()?
 * - Obliga al componente padre a pasar los datos
 * - Si no los pasa, Angular lanza un error claro
 * - Es más seguro que input() con valor por defecto
 */

// Component: Decorador del componente
// input: Herramienta nueva para recibir datos del componente padre
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  template: `
    <div class="stat-card">
      <!-- label(): Lee el valor de la signal label -->
      <span class="label">{{ label() }}</span>
      <!-- value(): Lee el valor de la signal value -->
      <span class="value">{{ value() }}</span>
    </div>
  `,
  styles: [`
    .stat-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
    }
    .label { display: block; font-size: 0.8rem; color: #6b7280; margin-bottom: 0.5rem; }
    .value { font-size: 2rem; font-weight: bold; color: #c3002f; }
  `]
})
export class StatCardComponent {
  // input.required<string>(): Signal de entrada OBLIGATORIA de tipo string
  // Es la etiqueta que describe la estadística (ej: "Usuarios")
  readonly label = input.required<string>();

  // input.required<number>(): Signal de entrada OBLIGATORIA de tipo number
  // Es el valor numérico de la estadística (ej: 150)
  readonly value = input.required<number>();
}
