// Componente de semáforo que usa una máquina de estados
// Demuestra cómo XState maneja flujos de UI complejos
// Nuevo: muestra context, guards, actions, entry/exit en acción
import { Component, OnDestroy, inject, signal } from '@angular/core';
import { MachineService } from '../services/machine.service';
import { trafficLightMachine } from '../machines/traffic-light.machine';

@Component({
  selector: 'app-traffic-light',
  standalone: true,
  template: `
    <div class="traffic-light">
      <h2>Traffic Light</h2>

      <!-- Visualización del semáforo con 3 bombillas -->
      <div class="light">
        <!-- [class.active]: clase condicional que ilumina la bombilla actual -->
        <div class="bulb red" [class.active]="currentState() === 'red' || currentState() === 'flashingRed'"></div>
        <div class="bulb yellow" [class.active]="currentState() === 'yellow'"></div>
        <div class="bulb green" [class.active]="currentState() === 'green'"></div>
      </div>

      <!-- Mostramos el estado actual de la máquina -->
      <p>State: <strong>{{ currentState() }}</strong></p>

      <!-- CONTEXT: muestra los datos internos de la máquina -->
      <div class="context-info">
        <p><strong>Countdown:</strong> {{ context().countdown }}s</p>
        <p><strong>Cycles:</strong> {{ context().cycleCount }} / {{ context().maxCycles }}</p>
        <!-- Guard visual: muestra si la transición está habilitada -->
        <p>
          <strong>Can go green:</strong>
          <span [class.enabled]="context().cycleCount < context().maxCycles">
            {{ context().cycleCount < context().maxCycles ? '✅ Yes' : '❌ No (max reached)' }}
          </span>
        </p>
      </div>

      <!-- LOG: muestra las últimas acciones ejecutadas -->
      <div class="log">
        <p><strong>Action Log:</strong></p>
        <ul>
          @for (entry of recentLog(); track entry) {
            <li>{{ entry }}</li>
          }
        </ul>
      </div>

      <div class="actions">
        <!-- Botones que envían eventos a la máquina de estados -->
        @if (currentState() !== 'flashingRed') {
          <button (click)="send('TIMER')">Next</button>
        }
        @if (currentState() === 'red' && currentState() !== 'flashingRed') {
          <button (click)="send('EMERGENCY')">Emergency</button>
        }
        @if (currentState() === 'flashingRed') {
          <button (click)="send('RESET')">Reset</button>
        }
      </div>
    </div>
  `,
  styles: [`
    .traffic-light { background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .light { width: 80px; background: #1e293b; padding: 8px; border-radius: 12px; margin: 1rem auto; }
    .bulb { width: 64px; height: 64px; border-radius: 50%; margin: 6px auto; opacity: 0.2; background: #475569; }
    .bulb.active { opacity: 1; }
    .bulb.red.active { background: #ef4444; box-shadow: 0 0 20px #ef4444; }
    .bulb.yellow.active { background: #f59e0b; box-shadow: 0 0 20px #f59e0b; }
    .bulb.green.active { background: #22c55e; box-shadow: 0 0 20px #22c55e; }
    .actions { display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem; }
    button { padding: 6px 16px; border: 1px solid #6366f1; background: #fff; border-radius: 6px; cursor: pointer; }
    .context-info { background: #f8fafc; padding: 0.75rem; border-radius: 8px; margin: 0.75rem 0; font-size: 0.85rem; }
    .context-info p { margin: 0.25rem 0; }
    .enabled { color: #22c55e; font-weight: 600; }
    .log { background: #f1f5f9; padding: 0.75rem; border-radius: 8px; margin: 0.75rem 0; max-height: 120px; overflow-y: auto; font-size: 0.8rem; }
    .log ul { margin: 0.25rem 0; padding-left: 1.25rem; }
    .log li { margin: 0.1rem 0; }
  `]
})
export class TrafficLightComponent implements OnDestroy {
  // inject(): obtiene el servicio que crea actores de XState
  private readonly machineService = inject(MachineService);
  private actor: any = null; // Actor de XState (instancia de la máquina)
  readonly currentState = signal('green'); // Signal con el estado actual
  readonly context = signal<any>({ countdown: 5, cycleCount: 0, maxCycles: 3, log: [] }); // Signal con el context
  readonly recentLog = signal<string[]>([]); // Últimas 5 entradas del log

  constructor() {
    // Creamos un actor desde la máquina de semáforo
    this.actor = this.machineService.createActorFrom(trafficLightMachine);
    // Obtenemos el estado inicial de la máquina
    const initialSnapshot = this.actor.getSnapshot();
    this.currentState.set(initialSnapshot.value);
    // Leemos el context inicial
    this.context.set(initialSnapshot.context);
    this.recentLog.set(initialSnapshot.context.log.slice(-5));

    // subscribe(): escucha cambios de estado en la máquina
    // Cada vez que la máquina cambia de estado, actualizamos el signal
    this.actor.subscribe((snapshot: any) => {
      this.currentState.set(snapshot.value);
      // Actualizamos el context (datos internos de la máquina)
      this.context.set(snapshot.context);
      // Mostramos las últimas 5 entradas del log de acciones
      this.recentLog.set(snapshot.context.log.slice(-5));
    });
  }

  // Envía un evento a la máquina de estados
  // La máquina decide a qué estado transicionar según el evento, el estado actual, y los guards
  send(event: string) {
    this.actor?.send({ type: event });
  }

  // ngOnDestroy(): hook del ciclo de vida que se ejecuta al destruir el componente
  // IMPORTANTE: debemos detener el actor para evitar memory leaks
  ngOnDestroy() {
    this.actor?.stop(); // Detenemos el actor y limpiamos suscripciones
  }
}
