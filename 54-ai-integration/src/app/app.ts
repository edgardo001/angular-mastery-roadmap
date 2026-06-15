import { Component } from '@angular/core';
import { ChatComponent } from './chat';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponent],
  template: `
    <header>
      <h1>AI Chat</h1>
    </header>
    <app-chat />
  `,
  styles: [`
    header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 1rem 2rem; }
    h1 { font-size: 1.5rem; }
  `]
})
export class App {}
