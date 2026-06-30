/**
 * COMPONENTE EXPENSIVO (ExpensiveComponent)
 * ==========================================
 *
 * Simula un componente "costoso" que renderiza muchos elementos.
 * Demuestra cómo OnPush + @for optimizan el rendimiento.
 *
 * ANÁLOGÍA: Es como una tabla de Excel con miles de filas.
 * Sin optimización, se recalcularía TODO en cada cambio.
 * Con OnPush, solo se recalcula lo que realmente cambió.
 *
 * PALABRAS CLAVE:
 * - @for: Nuevo syntax de Angular 17+ para iterar arrays
 * - track: Obligatorio en @for - ayuda a Angular a identificar cambios
 * - NumberPipe (| number): Transforma números para mostrarlos
 * - DatePipe (| date): Transforma fechas para mostrarlas
 * - [style.background]: Binding de estilos - cambia el color dinámicamente
 *
 * REGLA DE ORO PARA @for:
 * Siempre usa track con un identificador único (id, index, etc.)
 * Sin track, Angular no puede detectar eficientemente qué cambió
 */

// Component: Decorador del componente
// ChangeDetectionStrategy.OnPush: Solo re-renderiza cuando cambian signals/inputs
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

// DatePipe y DecimalPipe: Pipes que transforman datos para mostrarlos
// date:'HH:mm:ss': Muestra hora en formato 24 horas
// number:'1.0-0': Muestra número sin decimales
import { DatePipe, DecimalPipe } from '@angular/common';

// Servicio que contiene los datos a mostrar
import { HeavyDataService } from './heavy-data.service';

@Component({
  selector: 'app-expensive',
  standalone: true,
  // Importa los pipes que usa el template
  imports: [DatePipe, DecimalPipe],
  // OnPush: Optimización - solo re-renderiza cuando cambian signals
  changeDetection: ChangeDetectionStrategy.OnPush,

  template: `
    <div class="expensive">
      <h3>Expensive Component</h3>
      <p class="meta">Simulates heavy rendering — OnPush strategy</p>
      <div class="stats-bar">
        <span>Items: {{ service.itemsSignal().length }}</span>
        <span>Render #: {{ service.renderCount() }}</span>
      </div>
      <!-- @for: Itera sobre la lista de items -->
      <!-- track item.id: Obligatorio - le dice a Angular cómo identificar cada item -->
      <div class="item-list">
        @for (item of service.itemsSignal(); track item.id) {
          <!-- [style.background]: Binding dinámico de estilo -->
          <!-- getColor() retorna un color basado en el valor -->
          <div class="item" [style.background]="getColor(item.value)">
            <span class="item-id">#{{ item.id }}</span>
            <span class="item-label">{{ item.label }}</span>
            <!-- | number:'1.0-0': Pipe que formatea números -->
            <!-- 1.0-0 significa: mínimo 1 dígito, 0-0 decimales -->
            <span class="item-value">{{ item.value | number:'1.0-0' }}</span>
            <!-- | date:'HH:mm:ss': Pipe que formatea fechas -->
            <span class="item-time">{{ item.timestamp | date:'HH:mm:ss' }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .expensive { background: #1a1a2e; color: #eee; border-radius: 12px; padding: 1.25rem; }
    .expensive h3 { margin-bottom: 0.25rem; color: #fff; }
    .meta { font-size: 0.8rem; color: #888; margin-bottom: 0.75rem; }
    .stats-bar { display: flex; gap: 1rem; font-size: 0.8rem; margin-bottom: 0.75rem; color: #a8b2d1; }
    .item-list { max-height: 400px; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; }
    .item { display: flex; gap: 0.75rem; padding: 0.35rem 0.5rem; border-radius: 4px; font-size: 0.8rem; align-items: center; }
    .item-id { color: #64ffda; font-weight: 600; min-width: 2.5rem; }
    .item-label { flex: 1; }
    .item-value { font-family: monospace; min-width: 3rem; text-align: right; }
    .item-time { font-family: monospace; color: #a8b2d1; min-width: 4rem; text-align: right; }
  `],
})
export class ExpensiveComponent {
  // Obtiene el servicio con datos pesados
  service = inject(HeavyDataService);

  // Método que genera un color basado en el valor del item
  // Valores más altos = color más intenso
  getColor(value: number): string {
    // Calcula la intensidad (máximo 0.15 para no ser demasiado brillante)
    const intensity = Math.min(0.15, (value / 1000) * 0.15);
    // Retorna un color RGBA (Red, Green, Blue, Alpha/Opacidad)
    // rgb(100, 255, 218) es un color verde-azulado
    return `rgba(100, 255, 218, ${intensity})`;
  }
}
