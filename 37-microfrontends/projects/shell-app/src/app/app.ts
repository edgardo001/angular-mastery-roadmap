/**
 * Componente raíz del Shell App (microfrontend contenedor).
 *
 * El Shell es la aplicación principal que coordina las microaplicaciones.
 * Escucha todos los eventos del bus y muestra un log de las comunicaciones.
 *
 * signal() — Contenedor reactivo para el log de mensajes.
 * AppEventBus.all() — Se suscribe a TODOS los eventos del bus.
 * .subscribe() — Activa la suscripción y procesa cada evento recibido.
 *
 * Analogía: El Shell es como el director de una orquesta.
 * No toca ningún instrumento, pero coordina a todos los músicos (microfrontends).
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
  /** Signal que almacena el log de todos los eventos recibidos */
  readonly messages = signal<string[]>([]);

  constructor() {
    /**
     * Se suscribe a TODOS los eventos del bus.
     * Cada evento se agrega al log con su tipo y payload formateado como JSON.
     * JSON.stringify() convierte un objeto a string legible.
     */
    AppEventBus.all().subscribe(event => {
      this.messages.update(msgs => [...msgs, `[${event.type}] ${JSON.stringify(event.payload)}`]);
    });
  }

  /**
   * Envía un evento desde el Shell hacia las microaplicaciones remotas.
   * El tipo 'shell:notification' identifica que es una notificación del Shell.
   */
  sendToRemote(): void {
    AppEventBus.publish('shell:notification', { text: 'Hello from Shell!' });
  }
}
