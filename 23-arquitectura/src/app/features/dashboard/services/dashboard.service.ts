/**
 * SERVICIO DEL DASHBOARD (DashboardService)
 * ==========================================
 *
 * Gestiona las estadísticas del dashboard.
 * Proporciona datos como usuarios, productos e ingresos.
 *
 * ANÁLOGÍA: Es como un "tablero de control" de una empresa:
 * - Muestra cuántos usuarios hay
 * - Muestra cuántos productos hay
 * - Muestra cuánto dinero se ha ganado
 *
 * PALABRAS CLAVE:
 * - signal(): Variable reactiva que Angular vigila
 * - asReadonly(): Signal solo lectura desde fuera
 * - .set(): Actualiza el valor completo de la signal
 *
 * PATRÓN DE SEGURIDAD:
 * - _stats: Signal privada (solo modificable internamente)
 * - stats: Signal pública solo lectura (los componentes solo leen)
 */

// Injectable, signal: Herramientas de Angular
import { Injectable, signal } from '@angular/core';

// providedIn: 'root': Singleton global
@Injectable({ providedIn: 'root' })
export class DashboardService {
  // Signal privada con las estadísticas
  private readonly _stats = signal({
    users: 0,
    products: 0,
    revenue: 0,
  });

  // Signal pública solo lectura
  readonly stats = this._stats.asReadonly();

  // loadStats(): Carga las estadísticas (simula una petición HTTP)
  loadStats(): void {
    // .set(): Reemplaza TODOS los valores con los nuevos
    this._stats.set({ users: 150, products: 42, revenue: 12500 });
  }
}
