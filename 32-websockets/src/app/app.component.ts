import { Component } from '@angular/core';
import { ChatComponent } from './chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponent],
  template: `
    <h1>WebSockets con RxJS</h1>
    <p class="subtitle">Chat en tiempo real usando <code>webSocket</code> con reconexión automática</p>
    <app-chat />
  `,
  styles: [`
    h1 { text-align: center; margin-bottom: .25rem; }
    .subtitle { text-align: center; color: #666; margin-bottom: 2rem; }
    code { background: #e8e8e8; padding: .125rem .375rem; border-radius: 4px; font-size: .875rem; }
  `]
})
export class AppComponent {}
