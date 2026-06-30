/**
 * ARCHIVO: feature-flags.service.ts - Servicio de Feature Flags
 *
 * Este servicio centraliza el manejo de feature flags (interruptores de funcionalidad).
 * Permite activar, desactivar y consultar el estado de cada feature flag.
 *
 * Cada feature flag se almacena como un signal, lo que permite que los componentes
 * que usan una flag se actualicen automáticamente cuando cambia su estado.
 *
 * Analogía: Es como un panel de control con interruptores. Cada interruptor
 * (feature flag) controla si una funcionalidad está encendida o apagada.
 * Cuando cambias un interruptor, todas las luces (componentes) que dependen
 * de él se encienden o apagan automáticamente.
 */

// Injectable: Decorador de Angular que marca una clase como "servicio" inyectable.
// signal: Función de Angular para crear valores reactivos (cajas que notifican cambios).
// WritableSignal: Tipo de signal que se puede modificar externamente.
import { Injectable, signal, WritableSignal } from '@angular/core';

/**
 * FeatureFlagKey: Tipo que define las claves válidas de feature flags.
 * TypeScript obliga a que solo se usen los valores definidos en la unión.
 *
 * Esto evita errores como escribir 'newchekout' en lugar de 'newCheckout'.
 * El compilador detectará el error antes de que ejecutes el código.
 */
export type FeatureFlagKey = 'newCheckout' | 'darkMode' | 'betaSearch';

@Injectable({ providedIn: 'root' })
export class FeatureFlagsService {
  /**
   * flags: Mapa (diccionario) que almacena cada feature flag.
   *
   * Map es una estructura de datos que almacena pares clave-valor.
   * La clave es el nombre de la feature flag (FeatureFlagKey).
   * El valor es un signal boolean que indica si está activada (true) o desactivada (false).
   */
  private readonly flags = new Map<FeatureFlagKey, WritableSignal<boolean>>();

  /**
   * constructor: Se ejecuta una vez cuando se crea el servicio.
   * Aquí inicializamos todas las feature flags con sus valores por defecto.
   */
  constructor() {
    this.initFlag('newCheckout', false); // Nuevo checkout desactivado por defecto
    this.initFlag('darkMode', false);    // Modo oscuro desactivado por defecto
    this.initFlag('betaSearch', false);  // Búsqueda beta desactivada por defecto
  }

  /**
   * isEnabled: Consulta si una feature flag está activada.
   *
   * @param key - Clave de la feature flag a consultar
   * @returns true si está activada, false si no
   *
   * ¿Qué es el operador ?. (optional chaining)?
   * Si this.flags.get(key) es undefined, en lugar de fallar con un error,
   * devuelve undefined. El operador ?? (nullish coalescing) entonces
   * devuelve false como valor por defecto.
   */
  isEnabled(key: FeatureFlagKey): boolean {
    return this.flags.get(key)?.() ?? false;
  }

  /**
   * getSignal: Devuelve el signal de una feature flag específica.
   *
   * Este método se usa en las directivas (ffShow, ffHide) para crear
   * effects que reaccionen a cambios en la feature flag.
   *
   * Si la flag no existe, la crea automáticamente con valor false.
   */
  getSignal(key: FeatureFlagKey): WritableSignal<boolean> {
    if (!this.flags.has(key)) {
      this.initFlag(key, false);
    }
    return this.flags.get(key)!;
  }

  /**
   * setFlag: Establece el valor de una feature flag.
   *
   * @param key - Clave de la feature flag
   * @param value - true para activar, false para desactivar
   */
  setFlag(key: FeatureFlagKey, value: boolean): void {
    this.getSignal(key).set(value);
  }

  /**
   * toggle: Invierte el estado de una feature flag.
   *
   * Si estaba activada (true), la desactiva (false) y viceversa.
   *
   * signal.update(fn): Actualiza el valor del signal usando una función.
   * La función recibe el valor actual (v) y retorna el nuevo valor.
   */
  toggle(key: FeatureFlagKey): void {
    const sig = this.getSignal(key);
    sig.update((v) => !v);
  }

  /**
   * allFlags: Devuelve un array con todas las feature flags y sus valores.
   *
   * Se usa en el template para mostrar el estado de cada flag en la UI.
   *
   * Array.from(): Convierte un Map a un array de pares [clave, valor].
   * map(): Transforma cada par en un objeto { key, value }.
   */
  allFlags(): Array<{ key: FeatureFlagKey; value: boolean }> {
    return Array.from(this.flags.entries()).map(([key, sig]) => ({
      key,
      value: sig(), // Lee el valor actual del signal
    }));
  }

  /**
   * initFlag: Método privado que crea una nueva feature flag con un valor por defecto.
   *
   * signal(defaultValue): Crea un signal con el valor inicial.
   * El signal se puede leer con sig() y modificar con sig.set() o sig.update().
   */
  private initFlag(key: FeatureFlagKey, defaultValue: boolean): void {
    this.flags.set(key, signal(defaultValue));
  }
}
