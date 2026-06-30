/**
 * Bus de Eventos para Microfrontends (Shell App).
 *
 * Permite la comunicación entre microaplicaciones sin acoplamiento directo.
 * Cada microfrontend puede publicar y escuchar eventos sin conocer a los demás.
 *
 * Es como un canal de radio: el Shell tiene una frecuencia compartida
 * donde todas las microaplicaciones pueden hablar y escuchar.
 *
 * Subject de RxJS — Emite valores y permite suscribirse a ellos.
 * static — Los métodos son estáticos: no necesitas crear una instancia.
 *   Puedes llamar AppEventBus.publish() directamente sin crear un objeto.
 *
 * MfeEvent — Interfaz que define la forma de cada evento:
 *   - type: Identificador del tipo de evento (ej: 'shell:notification')
 *   - payload: Datos del evento (cualquier tipo con unknown)
 *
 * Analogía: Es como un tablero de anuncios digital. Cualquiera puede
 * pegar un anuncio (publish) y cualquiera puede leer los anuncios (on/all).
 */
import { Subject, Observable, filter, map } from 'rxjs';

/** Formato de cada evento que viaja por el bus */
export interface MfeEvent {
  type: string;     // Tipo de evento (ej: 'shell:notification', 'remote:user-action')
  payload: unknown; // Datos del evento (puede ser cualquier cosa)
}

/**
 * AppEventBus — Bus de eventos estático para comunicación entre microfrontends.
 *
 * Usa un Subject como central de eventos. Los componentes publican eventos
 * y se suscriben a los que les interesan.
 */
export class AppEventBus {
  /** Subject que mantiene el flujo de eventos. static = compartido por todos. */
  private static readonly events$ = new Subject<MfeEvent>();

  /**
   * Publica un evento en el bus.
   * @param type - Tipo del evento (identificador)
   * @param payload - Datos del evento
   */
  static publish(type: string, payload: unknown): void {
    this.events$.next({ type, payload });
  }

  /**
   * Se suscribe a eventos de un tipo específico.
   * filter() solo deja pasar eventos cuyo type coincida.
   */
  static on(type: string): Observable<MfeEvent> {
    return this.events$.pipe(
      filter(e => e.type === type),
    );
  }

  /**
   * Retorna TODOS los eventos (sin filtrar).
   * Útil para logging o depuración.
   */
  static all(): Observable<MfeEvent> {
    return this.events$.asObservable();
  }
}
