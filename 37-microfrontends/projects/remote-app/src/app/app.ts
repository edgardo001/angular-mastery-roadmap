/**
 * Componente raíz de la Microaplicación Remota.
 *
 * Esta microaplicación escucha eventos del Shell y puede enviar eventos de vuelta.
 * Muestra un log de las comunicaciones recibidas y permite enviar eventos.
 *
 * signal() — Contenedor reactivo para el log de mensajes.
 * AppEventBus.all() — Se suscribe a todos los eventos del bus.
 *
 * Analogía: Es como una aplicación móvil que se conecta a un servidor (Shell).
 * Puede recibir notificaciones del servidor y enviar datos de vuelta.
 */
import { Component, signal } from '@angular/core';
import { AppEventBus } from './event-bus';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  /** Signal con el log de eventos recibidos */
  readonly messages = signal<string[]>([]);

  constructor() {
    /**
     * Escucha todos los eventos del bus.
     * Cuando el Shell envía una notificación, la Remote App la recibe aquí.
     */
    AppEventBus.all().subscribe(event => {
      this.messages.update(msgs => [...msgs, `[${event.type}] ${JSON.stringify(event.payload)}`]);
    });
  }

  /**
   * Envía un evento desde la Remote App hacia el Shell.
   * El tipo 'remote:user-action' identifica que es una acción del usuario remoto.
   */
  sendEvent(): void {
    AppEventBus.publish('remote:user-action', { message: 'Hello from Remote!' });
  }
}
