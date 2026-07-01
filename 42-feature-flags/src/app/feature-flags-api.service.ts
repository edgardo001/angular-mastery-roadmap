/**
 * ARCHIVO: feature-flags-api.service.ts - Servicio API de Feature Flags
 *
 * Este servicio simula la comunicación con un backend remoto para obtener
 * feature flags. En producción, esto se conectaría a un servicio real como
 * LaunchDarkly, ConfigCat, Firebase Remote Config, o tu propio API.
 *
 * ¿Por qué simular? Porque para aprender el patrón no necesitas un servidor real.
 * El patrón es: servicio inyectable que retorna Observable<boolean[]>.
 * Cuando tengas un backend real, solo cambias este servicio por uno que haga
 * HttpClient.get() a tu API.
 *
 * Analogía: Imagina que eres un gerente de tienda que necesita saber
 * qué productos están en oferta. En lugar de ir físicamente al almacén
 * cada vez, llamas por teléfono y te dan la lista. Este servicio es
 * esa llamada telefónica simulada con un pequeño retraso artificial
 * (como si la señal tardara en llegar).
 */

// Injectable: Decorador que permite inyectar este servicio en otros componentes/servicios.
import { Injectable } from '@angular/core';

// HttpClient: Herramienta de Angular para hacer peticiones HTTP a servidores.
// Nota: Aunque aquí no usamos HttpClient directamente, lo incluimos como
// referencia de que en producción SÍ lo usarías.
import { HttpClient } from '@angular/common/http';

// of: Crea un Observable que emite valores determinados y luego se completa.
// Es como crear un "cauce" con agua prellenada en lugar de abrir un grifo.
import { of } from 'rxjs';

// delay: Operador de RxJS que agrega un retraso artificial a la emisión.
// Útil para simular latencia de red (el tiempo que tarda un paquete de
// datos en viajar por internet desde tu servidor hasta el navegador).
import { delay } from 'rxjs/operators';

// FeatureFlagKey: Tipo que define las claves válidas de feature flags.
// Lo importamos para mantener consistencia con el servicio principal.
import { FeatureFlagKey } from './feature-flags.service';

/**
 * RemoteFlag: Interfaz que define la estructura de cada flag que viene del "servidor".
 *
 * Una interfaz es como un contrato: define qué propiedades debe tener un objeto.
 * Aquí decimos que cada flag remota debe tener:
 * - key: el nombre de la flag (ej: 'newCheckout')
 * - enabled: si está activada o no (true/false)
 * - percentage: porcentaje de usuarios que la ven (0-100), opcional
 */
export interface RemoteFlag {
  key: FeatureFlagKey;
  enabled: boolean;
  percentage?: number; // Opcional: para rollout gradual en el futuro
}

/**
 * ¿Por qué providedIn: 'root'?
 * Esto registra el servicio en el inyector raíz de la aplicación.
 * Significa que Angular crea UNA SOLA instancia del servicio (singleton)
 * que se comparte en toda la aplicación.
 *
 * Analogía: Es como tener UNA sola caja de herramientas en la casa.
 * Si necesitas un destornillador, no compras uno nuevo; vas a la caja
 * compartida. Todos los componentes usan la misma instancia.
 */
@Injectable({ providedIn: 'root' })
export class FeatureFlagsApiService {
  /**
   * Simulación de flags remotas.
   *
   * En un escenario real, esto sería la respuesta de tu API:
   *
   *   return this.http.get<RemoteFlag[]>('/api/feature-flags');
   *
   * Aquí simulamos una respuesta JSON que incluye:
   * - newCheckout: desactivado por defecto
   * - darkMode: desactivado por defecto
   * - betaSearch: activado solo para 50% de los usuarios (rollout gradual)
   *
   * Nota: 'percentage' es un campo opcional que representa el porcentaje
   * de usuarios que ven esta feature. Lo usamos para simular rollout gradual.
   * En una app real, el backend decidiría qué porcentaje de usuarios
   * recibe cada flag basándose en reglas de targeting.
   */
  private readonly remoteFlags: RemoteFlag[] = [
    { key: 'newCheckout', enabled: false, percentage: 0 },
    { key: 'darkMode', enabled: false, percentage: 100 },
    { key: 'betaSearch', enabled: true, percentage: 50 }, // Solo 50% de usuarios ven esta feature
  ];

  /**
   * constructor: Angular inyecta automáticamente el HttpClient.
   *
   * En producción, necesitarías provideHttpClient() en app.config.ts
   * para que Angular sepa cómo crear instancias de HttpClient.
   *
   * Lo declaramos aquí como referencia, aunque en esta simulación
   * no lo usamos directamente (porque no hay servidor real).
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * getFlags: Simula una petición GET a un API remoto.
   *
   * Flujo en producción:
   * 1. El componente llama a getFlags()
   * 2. El servicio hace HTTP GET a /api/feature-flags
   * 3. El servidor responde con un JSON de flags
   * 4. El componente recibe las flags y actualiza su estado
   *
   * Flujo en esta simulación:
   * 1. El componente llama a getFlags()
   * 2. of() crea un Observable con los datos predefinidos
   * 3. delay(300) agrega un retraso de 300ms (simula latencia de red)
   * 4. El componente recibe las flags como si vinieran de un servidor
   *
   * ¿Por qué retornamos Observable en lugar de Promise?
   * Porque Angular y RxJS están diseñados para trabajar con Observables.
   * Un Observable puede emitir múltiples valores (útil para polling/websockets),
   * se puede cancelar, y tiene operadores útiles como delay, retry, debounce.
   *
   * of(...items): Crea un Observable que emite cada item y luego se completa.
   * Es como un "paquete postal" que ya tiene todo dentro, listo para enviar.
   *
   * .pipe(delay(300)): Agrega un retraso de 300 milisegundos antes de emitir.
   * Esto simula el tiempo que tarda un paquete de datos en viajar por internet.
   *
   * @returns Observable<RemoteFlag[]> - Observable que emite la lista de flags remotas
   */
  getFlags() {
    return of(this.remoteFlags).pipe(delay(300));
  }
}
