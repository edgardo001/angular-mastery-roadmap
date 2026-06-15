import { Component, inject, signal, ElementRef, viewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, DatePipe],
  template: `
    <div class="chat">
      <div class="header">
        <span>WebSocket Chat</span>
        <span class="status" [class.connected]="status() === 'connected'" [class.connecting]="status() === 'connecting'">
          ● {{ status() }}
        </span>
      </div>

      <div class="messages" #messagesContainer>
        @for (msg of messages(); track $index) {
          <div class="msg" [class.mine]="msg.user === 'Yo'">
            <strong>{{ msg.user }}</strong>
            <p>{{ msg.text }}</p>
            <small>{{ msg.timestamp | date:'HH:mm:ss' }}</small>
          </div>
        } @empty {
          <p class="empty">Esperando mensajes...</p>
        }
      </div>

      <div class="input-row">
        <input
          [(ngModel)]="newMessage"
          (keyup.enter)="send()"
          placeholder="Escribe un mensaje..."
          [disabled]="status() !== 'connected'"
          aria-label="Mensaje"
        />
        <button (click)="send()" [disabled]="status() !== 'connected' || !newMessage().trim()">
          Enviar
        </button>
        <button class="secondary" (click)="disconnect()" [disabled]="status() === 'disconnected'">
          Desconectar
        </button>
      </div>

      <p class="hint">
        Conectado a <code>{{ WS_URL }}</code> — Reintento automático cada 3s (5 intentos)
      </p>
    </div>
  `,
  styles: [`
    .chat { max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; background: #fff; }
    .header { display: flex; justify-content: space-between; align-items: center; padding: .75rem 1rem; background: #1a73e8; color: #fff; font-weight: 600; }
    .status { font-size: .8rem; }
    .status.connected { color: #81c784; }
    .status.connecting { color: #ffd54f; }
    .messages { height: 320px; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: .5rem; }
    .msg { background: #f0f2f5; padding: .5rem .75rem; border-radius: 8px; max-width: 80%; }
    .msg.mine { align-self: flex-end; background: #e3f2fd; }
    .msg strong { font-size: .8rem; color: #1a73e8; }
    .msg p { margin: .25rem 0; font-size: .9rem; }
    .msg small { font-size: .7rem; color: #999; }
    .empty { color: #aaa; text-align: center; margin-top: 6rem; }
    .input-row { display: flex; gap: .5rem; padding: .75rem 1rem; border-top: 1px solid #eee; }
    .input-row input { flex: 1; padding: .5rem; border: 1px solid #ddd; border-radius: 6px; font-size: .9rem; }
    .input-row button { padding: .5rem 1rem; background: #1a73e8; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; }
    .input-row button:disabled { opacity: .5; cursor: not-allowed; }
    .input-row .secondary { background: #e8e8e8; color: #333; }
    .hint { padding: .5rem 1rem; font-size: .75rem; color: #999; background: #fafafa; border-top: 1px solid #eee; }
    .hint code { background: #e8e8e8; padding: 0 4px; border-radius: 3px; }
  `]
})
export class ChatComponent {
  private chatService = inject(ChatService);
  readonly messages = this.chatService.messages;
  readonly status = this.chatService.connectionStatus;
  readonly newMessage = signal('');
  readonly messagesContainer = viewChild<ElementRef>('messagesContainer');

  readonly WS_URL = 'wss://echo.websocket.org';

  constructor() {
    this.chatService.connect(this.WS_URL);
  }

  send(): void {
    const text = this.newMessage().trim();
    if (!text) return;
    this.chatService.send({ user: 'Yo', text });
    this.newMessage.set('');

    setTimeout(() => {
      const el = this.messagesContainer()?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  disconnect(): void {
    this.chatService.disconnect();
  }
}
