import { Component, OnInit } from '@angular/core';
import { EditorComponent } from './editor';
import { CollabService } from './collab.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EditorComponent, FormsModule],
  template: `
    <header>
      <h1>Collaborative Editor</h1>
      <div class="controls">
        <input [(ngModel)]="signalUrl" placeholder="Signal Server URL" />
        <input [(ngModel)]="roomId" placeholder="Room ID" />
        <button (click)="connect()" [disabled]="connected">Connect</button>
        <button (click)="disconnect()" [disabled]="!connected" class="danger">Disconnect</button>
      </div>
      @if (connected) {
        <div class="peers">
          Peers: {{ collabService.peers().join(', ') || 'none' }}
        </div>
      }
    </header>
    <main>
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
  signalUrl = 'wss://signal.example.com/ws';
  roomId = 'room-angular';
  connected = false;

  constructor(public collabService: CollabService) {}

  ngOnInit() {
    const stored = localStorage.getItem('collab-user');
    if (!stored) {
      localStorage.setItem('collab-user', 'user-' + Math.random().toString(36).slice(2, 8));
    }
  }

  connect() {
    const userId = localStorage.getItem('collab-user') || 'anonymous';
    this.collabService.connect(this.signalUrl, this.roomId, userId);
    this.connected = true;
  }

  disconnect() {
    this.collabService.disconnect();
    this.connected = false;
  }
}
