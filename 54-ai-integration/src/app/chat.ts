import { Component, OnInit, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="chat-container">
      <div class="messages" #scrollContainer>
        @for (msg of chatService.messages(); track msg; let i = $index) {
          <div class="message" [class.user]="msg.role === 'user'" [class.assistant]="msg.role === 'assistant'">
            <div class="role">{{ msg.role === 'user' ? 'You' : 'AI' }}</div>
            <div class="content" [innerHTML]="renderMarkdown(msg.content)"></div>
          </div>
        }
        @if (chatService.streamingContent()) {
          <div class="message assistant streaming">
            <div class="role">AI</div>
            <div class="content" [innerHTML]="renderMarkdown(chatService.streamingContent())"></div>
            <span class="cursor">|</span>
          </div>
        }
      </div>
      <div class="input-bar">
        <input [(ngModel)]="input" (keydown.enter)="send()" placeholder="Type your message..." [disabled]="isLoading" />
        <button (click)="send()" [disabled]="isLoading || !input.trim()">Send</button>
        @if (isLoading) {
          <button class="stop" (click)="chatService.cancelStream()">Stop</button>
        }
      </div>
      <div class="footer">
        <span>Tokens: {{ chatService.tokens() }}</span>
      </div>
    </div>
  `,
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
  input = '';
  isLoading = false;
  apiKey = '';
  endpoint = 'https://api.openai.com/v1/chat/completions';

  constructor(public chatService: ChatService) {
    effect(() => {
      this.isLoading = this.chatService.streamingContent() !== '' || false;
    });
  }

  ngOnInit() {
    this.apiKey = prompt('Enter your OpenAI API key:') || '';
  }

  async send() {
    if (!this.input.trim()) return;
    await this.chatService.sendMessage(this.input.trim(), this.apiKey, this.endpoint);
    this.input = '';
  }

  renderMarkdown(text: string): string {
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<pre><code class="lang-${lang}">${escaped}</code></pre>`;
    });

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
