// ============================================================
// app.ts — Componente raíz de la app de IA
// ============================================================
// Este componente muestra el encabezado y el componente de chat.
// Es como el "marco" que contiene la ventana de conversación.

import { Component } from '@angular/core';

// ChatComponent: el componente que muestra la interfaz de chat.
import { ChatComponent } from './chat';

@Component({
  selector: 'app-root',
  standalone: true,

  // imports: importamos ChatComponent para poder usar <app-chat /> en el template.
  imports: [ChatComponent],

  template: `
    <header>
      <h1>AI Chat</h1>
    </header>
    <!-- <app-chat /> — usa el componente ChatComponent que importamos -->
    <app-chat />
  `,
  styles: [`
    header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 1rem 2rem; }
    h1 { font-size: 1.5rem; }
  `]
})
export class App {}
