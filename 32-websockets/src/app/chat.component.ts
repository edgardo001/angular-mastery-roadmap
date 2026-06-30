/**
 * Componente de Chat — La interfaz de usuario para chatear por WebSockets.
 *
 * Un componente Angular es como una pieza de LEGO: tiene su template (HTML),
 * sus estilos (CSS) y su lógica (TypeScript) encapsulados juntos.
 *
 * Imports usados:
 * - Component: Decorador que define un componente Angular
 * - inject: Función para obtener dependencias (servicios) de forma moderna
 * - signal: Contenedor reactivo de datos (se actualiza solo en la pantalla)
 * - ElementRef: Referencia directa a un elemento del DOM (HTML)
 * - viewChild: Decorador para obtener referencia a un elemento hijo del template
 * - DatePipe: Pipe de Angular para formatear fechas en el template
 * - FormsModule: Módulo para formularios con [(ngModel)] (two-way binding)
 */
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
        <!-- [class.connected] y [class.connecting] agregan/quitan clases CSS condicionalmente -->
        <span class="status" [class.connected]="status() === 'connected'" [class.connecting]="status() === 'connecting'">
          ● {{ status() }}
        </span>
      </div>

      <div class="messages" #messagesContainer>
        <!-- @for: Nuevo control flow de Angular 17+ para iterar sobre arrays -->
        <!-- track $index: Le dice a Angular cómo rastrear cada elemento para optimizar re-renders -->
        @for (msg of messages(); track $index) {
          <!-- [class.mine]: Agrega la clase 'mine' solo si el usuario es 'Yo' -->
          <div class="msg" [class.mine]="msg.user === 'Yo'">
            <strong>{{ msg.user }}</strong>
            <p>{{ msg.text }}</p>
            <!-- | date:'HH:mm:ss': Pipe que formatea la fecha como hora:minuto:segundo -->
            <small>{{ msg.timestamp | date:'HH:mm:ss' }}</small>
          </div>
        } @empty {
          <!-- @empty se muestra cuando el array está vacío (como un "else" del @for) -->
          <p class="empty">Esperando mensajes...</p>
        }
      </div>

      <div class="input-row">
        <!--
          [(ngModel)] — Two-way data binding: enlaza el valor del input con la signal 'newMessage'.
          Cuando el usuario escribe, newMessage se actualiza. Cuando newMessage cambia, el input se actualiza.
          Es como un espejo: lo que pasa en un lado, se refleja en el otro.
        -->
        <!-- (keyup.enter): Evento que se dispara al presionar Enter -->
        <input
          [(ngModel)]="newMessage"
          (keyup.enter)="send()"
          placeholder="Escribe un mensaje..."
          [disabled]="status() !== 'connected'"
          aria-label="Mensaje"
        />
        <!-- [disabled] deshabilita el botón si no hay conexión o no hay texto -->
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
  /**
   * inject() — Forma moderna de obtener dependencias (reemplaza el constructor).
   * Es como pedir herramientas a un cajero automático: le dices qué necesitas
   * y te lo da sin tener que construirlo tú mismo.
   */
  private chatService = inject(ChatService);

  /**
   * Lecturas directas de las signals del servicio.
   * Al ser signals, cuando el servicio las actualice, este componente se re-renderiza solo.
   */
  readonly messages = this.chatService.messages;
  readonly status = this.chatService.connectionStatus;

  /**
   * Signal local para el texto del input de nuevo mensaje.
   * El componente tiene su propio estado que controla el formulario.
   */
  readonly newMessage = signal('');

  /**
   * viewChild() obtiene una referencia al elemento del DOM con el template reference #messagesContainer.
   * Es como poner una etiqueta en una caja (#messagesContainer) y luego pedir la caja por su nombre.
   * Nos permite hacer scroll automático cuando llegan mensajes nuevos.
   */
  readonly messagesContainer = viewChild<ElementRef>('messagesContainer');

  // URL del servidor WebSocket de prueba (eco: devuelve lo que le envíes)
  readonly WS_URL = 'wss://echo.websocket.org';

  constructor() {
    // Al crear el componente, nos conectamos automáticamente al servidor
    this.chatService.connect(this.WS_URL);
  }

  /**
   * Envía un mensaje al chat.
   * .trim() elimina espacios en blanco al inicio y final.
   * setTimeout() ejecuta el scroll después de que Angular actualice el DOM.
   */
  send(): void {
    const text = this.newMessage().trim();
    if (!text) return; // No enviamos mensajes vacíos
    this.chatService.send({ user: 'Yo', text });
    this.newMessage.set(''); // Limpiamos el input

    // Esperamos al siguiente ciclo de renderizado para hacer scroll
    setTimeout(() => {
      const el = this.messagesContainer()?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight; // Scroll al fondo
    });
  }

  /**
   * Desconecta del servidor WebSocket.
   */
  disconnect(): void {
    this.chatService.disconnect();
  }
}
