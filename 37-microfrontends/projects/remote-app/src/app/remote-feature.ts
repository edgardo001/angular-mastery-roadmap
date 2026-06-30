/**
 * Componente remoto exportable via Module Federation.
 *
 * Este componente se expone desde la Remote App para que el Shell lo consuma.
 * Se carga dinámicamente cuando el usuario navega a la ruta /remote.
 *
 * window.postMessage — API del navegador para comunicación entre ventanas/iframes.
 *   Aquí se usa para comunicación cross-app sin depender de un EventBus compartido.
 *   Ambas apps corren en puertos diferentes (4200 y 4201), por eso postMessage
 *   es la forma estándar de comunicar contextos aislados.
 *
 * Analogía: Este componente es como un widget que se descarga de una tienda
 * de aplicaciones (remote) y se inyecta en tu escritorio (shell) en tiempo real.
 */
import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-remote-feature',
  standalone: true,
  imports: [NgIf],
  template: `
    <div style="padding: 20px; border: 2px dashed #e94560; border-radius: 8px;">
      <h3>🚀 Remote Feature Component</h3>
      <p>Este componente viene del <strong>Remote App</strong> (puerto 4201)</p>
      <p>Se carga dinámicamente via Module Federation</p>
      <button (click)="sendMessage()">Enviar evento al Shell</button>
      <p *ngIf="lastEvent">Último evento: {{ lastEvent }}</p>
    </div>
  `
})
export class RemoteFeatureComponent {
  lastEvent = '';

  /**
   * Envía un mensaje al Shell usando postMessage.
   * El '*' como targetOrigin permite enviar a cualquier origen.
   * En producción, se debe especificar el origen exacto por seguridad.
   */
  sendMessage() {
    window.postMessage({ type: 'REMOTE_EVENT', payload: 'Hola desde Remote!' }, '*');
  }

  constructor() {
    /**
     * Escucha mensajes entrantes del Shell.
     * Solo procesa mensajes con type === 'SHELL_EVENT'.
     */
    window.addEventListener('message', (event) => {
      if (event.data?.type === 'SHELL_EVENT') {
        this.lastEvent = event.data.payload;
      }
    });
  }
}
