// ============================================================
// app.ts — Componente raíz de la app de colaboración con Y.js
// ============================================================
// Este componente muestra los controles de conexión (URL del servidor,
// ID de sala) y el editor colaborativo. Usa Y.js para sincronizar
// los cambios entre múltiples usuarios.
//
// ANLOGÍA: Es como la "sala de control" donde los usuarios se conectan
// antes de empezar a editar juntos en el "pizarrón mágico" de Y.js.

import { Component, OnInit } from '@angular/core';

// EditorComponent: el editor de texto colaborativo.
import { EditorComponent } from './editor';

// CollabService: maneja la conexión con el servidor Y.js.
import { CollabService } from './collab.service';

// FormsModule: habilita ngModel para双向数据绑定 de los inputs.
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,

  // imports: necesitamos EditorComponent y FormsModule.
  imports: [EditorComponent, FormsModule],

  template: `
    <header>
      <h1>Collaborative Editor (Y.js)</h1>
      <div class="controls">
        <!-- [(ngModel)] — two-way binding: el usuario escribe la URL y Angular la guarda -->
        <input [(ngModel)]="serverUrl" placeholder="Y.js WebSocket Server URL" />
        <input [(ngModel)]="roomId" placeholder="Room ID" />
        <!-- [disabled]="connected" — deshabilita el botón si ya estamos conectados -->
        <button (click)="connect()" [disabled]="collabService.connected()">Connect</button>
        <button (click)="disconnect()" [disabled]="!collabService.connected()" class="danger">Disconnect</button>
      </div>
      @if (collabService.connected()) {
        <div class="peers">
          <!-- Muestra la lista de usuarios conectados separados por coma -->
          Peers: {{ collabService.peers().join(', ') || 'none' }}
        </div>
      }
    </header>
    <main>
      <!-- <app-editor /> — el componente del editor colaborativo -->
      <app-editor />
    </main>
  `,
  styles: [`
    header { background: linear-gradient(135deg, #0f172a, #1e293b); color: white; padding: 1rem 2rem; }
    h1 { font-size: 1.5rem; margin-bottom: 0.75rem; }
    .controls { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .controls input { padding: 0.5rem; border-radius: 6px; border: none; background: #334155; color: white; flex: 1; min-width: 200px; }
    .controls input::placeholder { color: #94a3b8; }
    .controls button { padding: 0.5rem 1rem; border-radius: 6px; border: none; background: #3b82f6; color: white; cursor: pointer; }
    .controls button:disabled { opacity: 0.5; }
    .controls .danger { background: #ef4444; }
    .peers { margin-top: 0.5rem; font-size: 0.875rem; color: #94a3b8; }
    main { max-width: 900px; margin: 2rem auto; padding: 0 1rem; }
  `]
})
export class App implements OnInit {
  // serverUrl: URL del servidor WebSocket de Y.js.
  // Por defecto, usamos un servidor público de demostración.
  // Para producción, deberías usar tu propio servidor.
  serverUrl = 'wss://demos.yjs.dev';

  // roomId: identificador de la sala donde se reúnen los usuarios.
  roomId = 'room-angular';

  constructor(public collabService: CollabService) {}

  // ngOnInit: se ejecuta al iniciar el componente.
  ngOnInit() {
    // Guarda un ID de usuario en localStorage para persistir entre sesiones.
    const stored = localStorage.getItem('collab-user');
    if (!stored) {
      localStorage.setItem('collab-user', 'user-' + Math.random().toString(36).slice(2, 8));
    }
  }

  // connect: establece la conexión con el servidor Y.js.
  connect() {
    const userId = localStorage.getItem('collab-user') || 'anonymous';
    this.collabService.connect(this.serverUrl, this.roomId, userId);
  }

  // disconnect: cierra la conexión y limpia los recursos.
  disconnect() {
    this.collabService.disconnect();
  }
}
