import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, filter, map, pipe, UnaryFunction, pipe as rxPipe } from 'rxjs';
import { DomainEvent } from './domain-events';

export type EventHandler<T extends DomainEvent> = (event: T) => void | Promise<void>;

export interface EventBusMiddleware {
  handle<T extends DomainEvent>(event: T, next: () => void | Promise<void>): void | Promise<void>;
}

@Injectable({ providedIn: 'root' })
export class EventBusService implements OnDestroy {
  private readonly events$ = new Subject<DomainEvent>();
  private readonly middlewares: EventBusMiddleware[] = [];

  addMiddleware(middleware: EventBusMiddleware): void {
    this.middlewares.push(middleware);
  }

  publish<T extends DomainEvent>(event: T): void {
    this.events$.next(event);
  }

  on<T extends DomainEvent>(
    eventType: new (...args: never[]) => T,
  ): Observable<T> {
    return this.events$.pipe(
      this.runMiddleware(),
      filter((e): e is T => e instanceof eventType),
      map((e) => e as T),
    );
  }

  private runMiddleware(): UnaryFunction<Observable<DomainEvent>, Observable<DomainEvent>> {
    return pipe((source: Observable<DomainEvent>) =>
      new Observable<DomainEvent>(subscriber => {
        source.subscribe({
          next: async (event) => {
            const chain = async (index: number): Promise<void> => {
              if (index >= this.middlewares.length) {
                subscriber.next(event);
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

  ngOnDestroy(): void {
    this.events$.complete();
  }
}
