// ============================================================
// chat.ts — Componente de chat con IA (OpenAI)
// ============================================================
// Este componente muestra una interfaz de chat tipo ChatGPT.
// El usuario escribe un mensaje, se envía a la API de OpenAI,
// y la respuesta aparece en tiempo real (streaming).
// Es como tener una conversación con una IA dentro de Angular.

import { Component, OnInit, effect } from '@angular/core';

// FormsModule: habilita [(ngModel)] para双向数据绑定 (two-way data binding).
// Es como un espejo: el usuario escribe en el input y Angular captura el valor.
import { FormsModule } from '@angular/forms';

// ChatService: el servicio que maneja la comunicación con la API de IA.
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,

  // FormsModule es necesario para usar ngModel (enlazar input con variable).
  imports: [FormsModule],

  // template: la interfaz del chat con mensajes, input y botones.
  template: `
    <div class="chat-container">
      <div class="messages" #scrollContainer>
        <!-- @for — directiva de Angular 22+ para iterar sobre arrays. -->
        <!-- track msg — le dice a Angular cómo identificar cada mensaje único. -->
        <!-- let i = $index — guarda el índice del mensaje actual. -->
        @for (msg of chatService.messages(); track msg; let i = $index) {
          <!-- [class.user]="msg.role === 'user'" — agrega la clase CSS 'user' si es mensaje del usuario -->
          <div class="message" [class.user]="msg.role === 'user'" [class.assistant]="msg.role === 'assistant'">
            <div class="role">{{ msg.role === 'user' ? 'You' : 'AI' }}</div>
            <!-- [innerHTML] — inserta HTML renderizado (no texto plano). -->
            <!-- renderMarkdown convierte texto markdown en HTML. -->
            <div class="content" [innerHTML]="renderMarkdown(msg.content)"></div>
          </div>
        }
        <!-- Muestra el contenido mientras la IA responde (streaming) -->
        @if (chatService.streamingContent()) {
          <div class="message assistant streaming">
            <div class="role">AI</div>
            <div class="content" [innerHTML]="renderMarkdown(chatService.streamingContent())"></div>
            <span class="cursor">|</span>
          </div>
        }
      </div>
      <div class="input-bar">
        <!-- [(ngModel)]="input" — two-way binding: escribe en el input, Angular guarda en 'input' -->
        <!-- (keydown.enter)="send()" — al presionar Enter, ejecuta send() -->
        <input [(ngModel)]="input" (keydown.enter)="send()" placeholder="Type your message..." [disabled]="isLoading" />
        <button (click)="send()" [disabled]="isLoading || !input.trim()">Send</button>
        @if (isLoading) {
          <!-- Botón para cancelar el streaming de la IA -->
          <button class="stop" (click)="chatService.cancelStream()">Stop</button>
        }
      </div>
      <div class="footer">
        <!-- Muestra cuántos tokens se han usado (las "palabras" que cuenta la IA) -->
        <span>Tokens: {{ chatService.tokens() }}</span>
      </div>
    </div>
  `,
  // styles: CSS del chat. Los estilos con ::ng-deep aplican a elementos hijos internos.
  styles: [`
    .chat-container { display: flex; flex-direction: column; height: 80vh; max-width: 800px; margin: 0 auto; padding: 1rem; }
    .messages { flex: 1; overflow-y: auto; padding: 1rem; background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .message { margin-bottom: 1rem; padding: 0.75rem; border-radius: 8px; }
    .message.user { background: #eff6ff; }
    .message.assistant { background: #f0fdf4; }
    .message.streaming { border-left: 3px solid #22c55e; }
    .role { font-weight: 600; font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem; }
    .content ::ng-deep p { margin-bottom: 0.5rem; }
    .content ::ng-deep code { background: #f3f4f6; padding: 0.125rem 0.375rem; border-radius: 4px; font-size: 0.875rem; }
    .content ::ng-deep pre { background: #1f2937; color: #f9fafb; padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 0.5rem 0; }
    .content ::ng-deep pre code { background: transparent; padding: 0; color: inherit; }
    .cursor { animation: blink 0.8s infinite; }
    @keyframes blink { 50% { opacity: 0; } }
    .input-bar { display: flex; gap: 0.5rem; margin-top: 0.75rem; }
    .input-bar input { flex: 1; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; }
    .input-bar button { padding: 0.75rem 1.5rem; background: #1e40af; color: white; border: none; border-radius: 8px; cursor: pointer; }
    .input-bar button:disabled { opacity: 0.5; }
    .input-bar .stop { background: #dc2626; }
    .footer { margin-top: 0.5rem; text-align: right; color: #6b7280; font-size: 0.875rem; }
  `]
})
export class ChatComponent implements OnInit {
  // input: el texto que el usuario escribe en el campo de entrada.
  input = '';

  // isLoading: indica si se está esperando respuesta de la IA.
  isLoading = false;

  // apiKey: clave de API de OpenAI que el usuario debe ingresar.
  apiKey = '';

  // endpoint: URL de la API de OpenAI para completar texto.
  endpoint = 'https://api.openai.com/v1/chat/completions';

  // constructor: se ejecuta al crear el componente.
  // effect() — watcher de Angular signals: se ejecuta cuando cambia streamingContent().
  // Es como un "sensor" que detecta cambios automáticamente.
  constructor(public chatService: ChatService) {
    effect(() => {
      // Si hay contenido streaming, estamos cargando. Si no, no.
      this.isLoading = this.chatService.streamingContent() !== '' || false;
    });
  }

  // ngOnInit: se ejecuta una vez que el componente está listo en pantalla.
  // Pide la API key al usuario (en producción, esto se haría de forma más segura).
  ngOnInit() {
    this.apiKey = prompt('Enter your OpenAI API key:') || '';
  }

  // send: envía el mensaje del usuario a la IA.
  async send() {
    if (!this.input.trim()) return;
    // Llama al servicio con el mensaje, la API key y el endpoint.
    await this.chatService.sendMessage(this.input.trim(), this.apiKey, this.endpoint);
    this.input = '';
  }

  // renderMarkdown: convierte texto markdown simple en HTML.
  // No es un parser completo, pero maneja lo básico: negritas, código, listas.
  renderMarkdown(text: string): string {
    // Primero escapa caracteres HTML peligrosos (prevenir XSS).
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Convierte bloques de código (```lang\ncode```) en <pre><code>
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<pre><code class="lang-${lang}">${escaped}</code></pre>`;
    });

    // Convierte inline code, headers, negritas, cursivas y listas.
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/### (.+)/g, '<h3>$1</h3>');
    html = html.replace(/## (.+)/g, '<h2>$1</h2>');
    html = html.replace(/# (.+)/g, '<h1>$1</h1>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
    html = html.replace(/\n/g, '<br>');

    return html;
  }
}
