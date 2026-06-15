import { Injectable, signal } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { retry, catchError, timeout, of } from 'rxjs';

export interface ChatMessage {
  user: string;
  text: string;
  timestamp: Date;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  readonly messages = signal<ChatMessage[]>([]);
  readonly connectionStatus = signal<'connected' | 'disconnected' | 'connecting'>('disconnected');

  private socket$: WebSocketSubject<ChatMessage> | null = null;

  connect(url: string): void {
    this.connectionStatus.set('connecting');

    this.socket$ = webSocket<ChatMessage>({
      url,
      openObserver: { next: () => this.connectionStatus.set('connected') },
      closeObserver: { next: () => this.connectionStatus.set('disconnected') },
    });

    this.socket$
      .pipe(
        timeout(10000),
        retry({ count: 5, delay: 3000 }),
        catchError(() => {
          this.connectionStatus.set('disconnected');
          return of(null);
        }),
      )
      .subscribe((msg) => {
        if (msg) {
          this.messages.update((list) => [...list, { ...msg, timestamp: new Date() }]);
        }
      });
  }

  send(msg: { user: string; text: string }): void {
    if (this.socket$) {
      this.socket$.next({ ...msg, timestamp: new Date() });
    }
  }

  disconnect(): void {
    this.socket$?.complete();
    this.socket$ = null;
    this.connectionStatus.set('disconnected');
  }
}
