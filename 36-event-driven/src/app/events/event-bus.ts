/**
 * Bus de Eventos Central (Event Bus).
 *
 * El EventBus es el "buzón central" donde se publican y reciben eventos.
 * Los componentes publican eventos sin saber quién los recibe (desacoplamiento).
 * Los suscriptores escuchan eventos sin saber quién los publica.
 *
 * Patrón: Pub-Sub (Publish-Subscribe).
 * Es como un canal de YouTube: el creador publica (publish) y los suscriptores
 * reciben (subscribe) las notificaciones.
 *
 * Subject de RxJS — Es un Observable que también puede emitir valores.
 * Es como un botón de radio双向: puedes hablar (next) y escuchar (subscribe).
 *
 * Middleware — Cadena de procesadores que se ejecutan antes de entregar el evento.
 * Es como una cadena de montaje: cada estación procesa el evento antes de pasar al siguiente.
 *
 * ngOnDestroy — Lifecycle hook que se ejecuta cuando el componente se destruye.
 * Completa el Subject para evitar memory leaks.
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, filter, map, pipe, UnaryFunction, pipe as rxPipe } from 'rxjs';
import { DomainEvent } from './domain-events';

/** Tipo de función que maneja un evento */
export type EventHandler<T extends DomainEvent> = (event: T) => void | Promise<void>;

/** Interfaz para middlewares que procesan eventos antes de entregarlos */
export interface EventBusMiddleware {
  handle<T extends DomainEvent>(event: T, next: () => void | Promise<void>): void | Promise<void>;
}

@Injectable({ providedIn: 'root' })
export class EventBusService implements OnDestroy {
  /** Subject que mantiene el flujo de eventos */
  private readonly events$ = new Subject<DomainEvent>();

  /** Lista de middlewares que procesan cada evento */
  private readonly middlewares: EventBusMiddleware[] = [];

  /** Agrega un middleware a la cadena de procesamiento */
  addMiddleware(middleware: EventBusMiddleware): void {
    this.middlewares.push(middleware);
  }

  /**
   * Publica un evento en el bus.
   * .next() emite el valor a todos los suscriptores.
   * Es como publicar un post en redes sociales: todos los que siguen la ven.
   */
  publish<T extends DomainEvent>(event: T): void {
    this.events$.next(event);
  }

  /**
   * Se suscribe a eventos de un tipo específico.
   * filter() solo deja pasar eventos del tipo indicado.
   * map() transforma el evento al tipo correcto.
   *
   * Uso: this.eventBus.on(OrderPlacedEvent).subscribe(event => ...)
   */
  on<T extends DomainEvent>(
    eventType: new (...args: never[]) => T,
  ): Observable<T> {
    return this.events$.pipe(
      this.runMiddleware(), // Ejecuta la cadena de middlewares
      filter((e): e is T => e instanceof eventType), // Solo eventos del tipo indicado
      map((e) => e as T), // Type assertion
    );
  }

  /**
   * Crea un operador que ejecuta la cadena de middlewares.
   * Cada middleware puede procesar el evento y pasar al siguiente con next().
   * Es como una cadena de producción: cada estación hace su trabajo
   * y pasa el producto al siguiente.
   */
  private runMiddleware(): UnaryFunction<Observable<DomainEvent>, Observable<DomainEvent>> {
    return pipe((source: Observable<DomainEvent>) =>
      new Observable<DomainEvent>(subscriber => {
        source.subscribe({
          next: async (event) => {
            // Cadena recursiva de middlewares
            const chain = async (index: number): Promise<void> => {
              if (index >= this.middlewares.length) {
                subscriber.next(event); // Todos los middlewares procesados
                return;
              }
              await this.middlewares[index].handle(event, () => chain(index + 1));
            };
            await chain(0);
          },
          error: (err) => subscriber.error(err),
          complete: () => subscriber.complete(),
        });
      }),
    );
  }

  /**
   * Lifecycle hook: Se ejecuta cuando el servicio se destruye.
   * Completa el Subject para liberar memoria.
   */
  ngOnDestroy(): void {
    this.events$.complete();
  }
}
