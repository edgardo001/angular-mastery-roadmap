// Componente de semáforo que usa una máquina de estados
// Demuestra cómo XState maneja flujos de UI complejos
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
  `]
})
export class TrafficLightComponent implements OnDestroy {
  // inject(): obtiene el servicio que crea actores de XState
  private readonly machineService = inject(MachineService);
  private actor: any = null; // Actor de XState (instancia de la máquina)
  readonly currentState = signal('green'); // Signal con el estado actual

  constructor() {
    // Creamos un actor desde la máquina de semáforo
    this.actor = this.machineService.createActorFrom(trafficLightMachine);
    // Obtenemos el estado inicial de la máquina
    this.currentState.set(this.actor.getSnapshot().value);
    // subscribe(): escucha cambios de estado en la máquina
    // Cada vez que la máquina cambia de estado, actualizamos el signal
    this.actor.subscribe((snapshot: any) => {
      this.currentState.set(snapshot.value);
    });
  }

  // Envía un evento a la máquina de estados
  // La máquina decide a qué estado transicionar según el evento y el estado actual
  send(event: string) {
    this.actor?.send({ type: event });
  }

  // ngOnDestroy(): hook del ciclo de vida que se ejecuta al destruir el componente
  // IMPORTANTE: debemos detener el actor para evitar memory leaks
  ngOnDestroy() {
    this.actor?.stop(); // Detenemos el actor y limpiamos suscripciones
  }
}
