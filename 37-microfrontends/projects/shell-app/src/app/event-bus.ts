import { Subject, Observable, filter, map } from 'rxjs';

export interface MfeEvent {
  type: string;
  payload: unknown;
}

export class AppEventBus {
  private static readonly events$ = new Subject<MfeEvent>();

  static publish(type: string, payload: unknown): void {
    this.events$.next({ type, payload });
  }

  static on(type: string): Observable<MfeEvent> {
    return this.events$.pipe(
      filter(e => e.type === type),
    );
  }

  static all(): Observable<MfeEvent> {
    return this.events$.asObservable();
  }
}
