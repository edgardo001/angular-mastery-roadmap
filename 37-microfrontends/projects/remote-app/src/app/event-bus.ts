/**
 * Bus de Eventos para la Microaplicación Remota.
 *
 * Implementa el mismo patrón que el Shell App para comunicación bidireccional.
 * La Remote App puede publicar eventos que el Shell escuche, y viceversa.
 *
 * En producción, el EventBus se compartaría como un paquete npm
 * o se usaría un patrón de comunicación cross-origin (postMessage, BroadcastChannel).
 *
 * Aquí se duplica para simplificar el ejemplo educativo.
 */
import { Subject, Observable, filter } from 'rxjs';

/** Formato de cada evento */
export interface MfeEvent {
  type: string;     // Tipo del evento
  payload: unknown; // Datos del evento
}

/**
 * AppEventBus — Bus de eventos estático para la Remote App.
 * Mismo patrón que el Shell: Subject + métodos estáticos.
 */
export class AppEventBus {
  private static readonly events$ = new Subject<MfeEvent>();

  /** Publica un evento en el bus */
  static publish(type: string, payload: unknown): void {
    this.events$.next({ type, payload });
  }

  /** Se suscribe a eventos de un tipo específico */
  static on(type: string): Observable<MfeEvent> {
    return this.events$.pipe(
      filter(e => e.type === type),
    );
  }

  /** Retorna todos los eventos sin filtrar */
  static all(): Observable<MfeEvent> {
    return this.events$.asObservable();
  }
}
