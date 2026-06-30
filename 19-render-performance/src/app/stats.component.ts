/**
 * COMPONENTE DE ESTADÍSTICAS (StatsComponent)
 * =============================================
 *
 * Muestra estadísticas sobre los datos cargados y el rendimiento.
 * Usa ChangeDetectionStrategy.OnPush para optimizar re-renders.
 *
 * ANÁLOGÍA: Es como un panel de control de un auto. Muestra información
 * importante (velocidad, gasolina, temperatura) pero solo se actualiza
 * cuando algo cambia, no constantemente.
 *
 * PALABRAS CLAVE:
 * - ChangeDetectionStrategy.OnPush: Solo re-renderiza cuando sus inputs cambian
 *   Sin esto, Angular revisa este componente en CADA cambio de la app
 * - inject(): Obtiene servicios de forma moderna (sin constructor)
 * - get lastUpdate(): Getter que calcula un valor cada vez que se accede
 *
 * ¿POR QUÉ OnPush?
 * - Default: Angular revisa el componente en cada ciclo de detección
 * - OnPush: Angular SOLO revisa cuando:
 *   1. Una signal que usa cambia de valor
 *   2. Un @Input() cambia
 *   3. Se llama markForCheck()
 * - Resultado: MENOS trabajo para Angular = MÁS rendimiento
 */

// Component: Decorador que define un componente Angular
// ChangeDetectionStrategy.OnPush: Estrategia de optimización de rendimiento
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

// Servicio que contiene los datos y estadísticas
import { HeavyDataService } from './heavy-data.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],

  // OnPush: Estrategia de detección de cambios optimizada
  // Solo re-renderiza cuando cambian signals o inputs
  // Es como un semáforo inteligente que solo cambia cuando hay tráfico
  changeDetection: ChangeDetectionStrategy.OnPush,

  // Template que muestra las estadísticas
  template: `
    <div class="stats">
      <div class="stat">
        <!-- itemsSignal().length: Lee la cantidad de items de la signal -->
        <span class="stat-value">{{ service.itemsSignal().length }}</span>
        <span class="stat-label">Items Loaded</span>
      </div>
      <div class="stat">
        <!-- renderCount(): Cantidad de veces que se generaron datos -->
        <span class="stat-value">{{ service.renderCount() }}</span>
        <span class="stat-label">Renders</span>
      </div>
      <div class="stat">
        <!-- lastUpdate: Getter que calcula la hora del último item -->
        <span class="stat-value">{{ lastUpdate }}</span>
        <span class="stat-label">Last Update</span>
      </div>
    </div>
  `,
  styles: [`
    .stats { display: flex; justify-content: space-around; padding: 1rem; background: #fff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); margin-bottom: 1rem; }
    .stat { display: flex; flex-direction: column; align-items: center; }
    .stat-value { font-size: 1.5rem; font-weight: 700; color: #4361ee; }
    .stat-label { font-size: 0.8rem; color: #888; }
  `],
})
export class StatsComponent {
  // inject(): Obtiene el servicio HeavyDataService
  service = inject(HeavyDataService);

  // Getter: Calcula un valor cada vez que se accede
  // No es una propiedad, es una función que se ejecuta bajo demanda
  // Es como una calculadora que solo funciona cuando la presionas
  get lastUpdate(): string {
    // Lee el valor actual de la signal itemsSignal
    const items = this.service.itemsSignal();
    // Si hay items, convierte el timestamp a hora local
    // Si no hay items, retorna "—" (guión)
    return items.length > 0 ? new Date(items[0].timestamp).toLocaleTimeString() : '—';
  }
}
