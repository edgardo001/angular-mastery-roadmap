import { Component, signal, computed, effect, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

interface LogEntry {
  action: string;
  timestamp: Date;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, DatePipe],
  template: `
    <h1>Contador interactivo con Signals</h1>

    <section>
      <h2>Contador: {{ count() }}</h2>
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
      <button (click)="reset()">Reset</button>

      <p>El número es <strong>{{ parity() }}</strong></p>

      @let doubled = count() * 2;
      <p>El doble (&#64;let) es: <strong>{{ doubled }}</strong></p>
    </section>

    <section>
      <h3>Mensaje personalizado (two-way binding)</h3>
      <input [(ngModel)]="message" placeholder="Escribe algo..." />
      <p>Mensaje: <strong>{{ message() }}</strong></p>
    </section>

    <section>
      <h3>Evento de teclado</h3>
      <input #keyInput placeholder="Presiona una tecla..."
        (keydown)="onKeydown($event, keyInput.value)" />
      @if (lastKey()) {
        <p>Última tecla presionada: <strong>{{ lastKey() }}</strong></p>
      }
    </section>

    <section>
      <h3>Historial de acciones</h3>
      @if (logs().length === 0) {
        <p>No hay acciones registradas.</p>
      }
      <ul>
        @for (entry of logs(); track entry.timestamp) {
          <li>{{ entry.timestamp | date:'HH:mm:ss' }} — {{ entry.action }}</li>
        }
      </ul>
    </section>
  `,
  styles: [`
    section { margin: 1.5rem 0; padding: 1rem; background: #fff; border-radius: 8px; }
    button { margin-right: 0.5rem; padding: 0.4rem 1rem; font-size: 1.2rem; cursor: pointer; }
    input { padding: 0.4rem; font-size: 1rem; width: 250px; }
    ul { margin-top: 0.5rem; padding-left: 1.5rem; }
    li { margin: 0.25rem 0; }
    h2 { margin-bottom: 0.5rem; }
    h3 { margin-bottom: 0.5rem; }
  `]
})
export class AppComponent {
  count = signal(0);
  message = model('Hola Signals');
  lastKey = signal('');
  logs = signal<LogEntry[]>([]);

  parity = computed(() => this.count() % 2 === 0 ? 'par' : 'impar');

  private countEffect = effect(() => {
    const c = this.count();
    this.addLog(`[effect] Contador actualizado → ${c}`);
  });

  increment() {
    this.count.update(c => c + 1);
    this.addLog('Incremento');
  }

  decrement() {
    this.count.update(c => c - 1);
    this.addLog('Decremento');
  }

  reset() {
    this.count.set(0);
    this.addLog('Reset');
  }

  onKeydown(event: KeyboardEvent, inputValue: string) {
    this.lastKey.set(event.key);
    this.addLog(`Tecla presionada: ${event.key}`);
  }

  private addLog(action: string) {
    this.logs.update(entries => [...entries, { action, timestamp: new Date() }]);
  }
}
