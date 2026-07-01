/**
 * ARCHIVO: feature-flags.service.ts - Servicio de Feature Flags
 *
 * Este servicio centraliza el manejo de feature flags (interruptores de funcionalidad).
 * Permite activar, desactivar y consultar el estado de cada feature flag.
 *
 * Cada feature flag se almacena como un signal, lo que permite que los componentes
 * que usan una flag se actualicen automáticamente cuando cambia su estado.
 *
 * Este servicio ahora integra carga remota: al iniciar, obtiene las flags
 * desde un "servidor" simulado (FeatureFlagsApiService). También permite
 * refrescar las flags manualmente para sincronizar con el estado remoto.
 *
 * Analogía: Es como un panel de control con interruptores que se sincronizan
 * con el panel central de la casa. Cada vez que refrescas, recibes el estado
 * más reciente del servidor. También puedes encender/apagar interruptores
 * localmente, pero al refrescar se sobreescriben con los valores del servidor.
 */

// Injectable: Decorador de Angular que marca una clase como "servicio" inyectable.
// signal: Función de Angular para crear valores reactivos (cajas que notifican cambios).
// WritableSignal: Tipo de signal que se puede modificar externamente.
import { Injectable, signal, WritableSignal } from '@angular/core';

// Inject: Función de Angular para obtener servicios dentro de constructores/efectos.
import { inject } from '@angular/core';

// FeatureFlagsApiService: Servicio que simula la comunicación con un API remoto.
import { FeatureFlagsApiService } from './feature-flags-api.service';

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
   * apiService: Referencia al servicio que se comunica con el backend remoto.
   * Lo inyectamos usando la función inject() de Angular.
   *
   * inject(): Es la forma moderna de inyectar dependencias en Angular.
   * Antes se usaba el constructor, pero inject() es más limpio y funciona
   * en effect() y otros contextos donde el constructor no está disponible.
   */
  private readonly apiService = inject(FeatureFlagsApiService);

  /**
   * constructor: Se ejecuta una vez cuando se crea el servicio.
   *
   * Flujo:
   * 1. Inicializa las flags con valores por defecto (para que la UI no esté vacía)
   * 2. Luego carga los valores remotos del servidor
   * 3. Los valores remotos sobreescriben los valores por defecto
   *
   * ¿Por qué inicializar antes de cargar remotamente?
   * Para que la interfaz de usuario muestre algo inmediatamente,
   * sin esperar la respuesta del servidor. Es como mostrar un
   * "cargando..." mientras llegan los datos reales.
   */
  constructor() {
    this.initFlag('newCheckout', false); // Valor por defecto local
    this.initFlag('darkMode', false);    // Valor por defecto local
    this.initFlag('betaSearch', false);  // Valor por defecto local
    this.loadRemoteFlags();              // Sobreescribe con valores del servidor
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
   * loadRemoteFlags: Carga las feature flags desde el API remoto (simulado).
   *
   * Este método se llama automáticamente al iniciar el servicio.
   * Flujo:
   * 1. apiService.getFlags() retorna un Observable con las flags del servidor
   * 2. .subscribe() "escucha" ese Observable cuando emite los datos
   * 3. Para cada flag remota, actualiza el signal local con el valor del servidor
   *
   * ¿Qué es subscribe?
   * Es como suscribirse a un canal de YouTube: cuando el canal publica
   * un video nuevo (emite un valor), tú lo recibes automáticamente.
   * Sin subscribe, el Observable no hace nada (es "lazy" - perezoso).
   *
   * ¿Por qué usamos forEach con subscribe?
   * Porque getFlags() retorna un array de RemoteFlag[]. Recorremos cada
   * flag y actualizamos su signal correspondiente.
   */
  private loadRemoteFlags(): void {
    this.apiService.getFlags().subscribe((remoteFlags) => {
      remoteFlags.forEach((remoteFlag) => {
        // Solo actualizamos si la flag ya existe en nuestro mapa
        if (this.flags.has(remoteFlag.key)) {
          this.flags.get(remoteFlag.key)!.set(remoteFlag.enabled);
        }
      });
    });
  }

  /**
   * refreshFlags: Método público para recargar flags desde el API remoto.
   *
   * Se puede llamar desde un botón "Actualizar" en la UI para sincronizar
   * el estado local con el servidor. Es como presionar el botón de
   * "refrescar" en tu navegador para obtener la versión más reciente.
   *
   * ¿Cuándo usar refreshFlags()?
   * - Cuando el usuario hace clic en "Sincronizar con servidor"
   * - Cuando hay un cambio de configuración en el backend
   * - Después de un tiempo sin actualizar (polling automático)
   *
   * refreshFlags() llama internamente a loadRemoteFlags(), que
   * sobreescribe todos los valores locales con los del servidor.
   * Esto significa que si el usuario cambió algo localmente,
   * esa cambio se pierde al refrescar (los valores del servidor tienen prioridad).
   */
  refreshFlags(): void {
    this.loadRemoteFlags();
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
