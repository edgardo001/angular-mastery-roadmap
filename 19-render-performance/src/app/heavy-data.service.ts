/**
 * SERVICIO DE DATOS PESADOS (HeavyDataService)
 * ==============================================
 *
 * Este servicio simula el manejo de grandes cantidades de datos.
 * Demuestra cómo las SIGNALS ayudan a controlar el rendimiento.
 *
 * ANÁLOGÍA: Es como un almacén de datos. Guarda información y cuenta
 * cuántas veces se ha actualizado (para medir rendimiento).
 *
 * PALABRAS CLAVE:
 * - signal(): Variable reactiva que Angular vigila automáticamente
 * - asReadonly(): Convierte la signal en solo lectura desde fuera
 * - .set(): Actualiza el valor completo de la signal
 * - .update(): Actualiza el valor basándose en el valor anterior
 * - Array.from(): Crea un array a partir de un objeto iterable
 *
 * ¿POR QUÉ IMPORTA EL RENDIMIENTO?
 * - Sin OnPush, Angular revisa TODOS los componentes en cada cambio
 * - Con OnPush + Signals, Angular solo revisa donde hubo cambios
 * - Esto es como tener un semáforo inteligente que solo para el tráfico necesario
 */

// Injectable: Marca esta clase como servicio que Angular puede inyectar
import { Injectable, signal } from '@angular/core';

// Interfaz que define la estructura de cada elemento de datos
export interface DataItem {
  id: number;      // Identificador único
  label: string;   // Nombre descriptivo
  value: number;   // Valor numérico
  timestamp: number; // Marca de tiempo (cuándo se creó)
}

// providedIn: 'root': Singleton global - UNA sola instancia para toda la app
@Injectable({ providedIn: 'root' })
export class HeavyDataService {
  // Signal privada que almacena los elementos
  // Los componentes NO pueden modificarla directamente
  private items = signal<DataItem[]>([]);

  // itemsSignal: Versión solo lectura de la signal items
  // Los componentes pueden LEER pero no ESCRIBIR
  // Es como un libro en vitrina: puedes verlo, pero no tocarlo
  readonly itemsSignal = this.items.asReadonly();

  // Signal que cuenta cuántas veces se han generado datos
  // Útil para medir el rendimiento
  readonly renderCount = signal(0);

  // Método que genera una cantidad específica de elementos
  // count: Cuántos elementos crear
  generateItems(count: number): void {
    // Incrementa el contador de renderizados
    // .update() toma el valor anterior y retorna el nuevo
    this.renderCount.update((c) => c + 1);

    // Array.from(): Crea un array con "count" elementos
    // { length: count }: Objeto con propiedad length
    // (_, i): Parámetros: _ = valor (no usado), i = índice
    const data: DataItem[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      label: `Item #${i}`,
      value: Math.random() * 1000,  // Valor aleatorio entre 0 y 1000
      timestamp: Date.now(),        // Marca de tiempo actual
    }));

    // .set(): Reemplaza TODOS los elementos con los nuevos
    // Es como vaciar un armario y llenarlo con ropa nueva
    this.items.set(data);
  }
}
