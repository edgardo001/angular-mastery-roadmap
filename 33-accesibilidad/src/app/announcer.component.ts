/**
 * Componente que demuestra el uso de LiveAnnouncer para accesibilidad.
 *
 * LiveAnnouncer es un servicio del CDK de Angular que notifica a lectores
 * de pantalla sobre cambios dinámicos en la interfaz. Es como un presentador
 * de noticias que anuncia lo que está pasando en la pantalla.
 *
 * WCAG 2.1 — Estándar de accesibilidad web:
 * - 'polite': Espera a que el lector termine de hablar (no interrumpe)
 * - 'assertive': Interrumpe al lector para anunciar inmediatamente (emergencias)
 *
 * Analogía: LiveAnnouncer es como el altavoz de un aeropuerto.
 * Los anuncios 'polite' son informativos (vuelo con retraso).
 * Los anuncios 'assertive' son urgentes (cambio de puerta).
 */
import { Component, inject } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-announcer',
  standalone: true,
  template: `
    <div class="announcer-demo" role="region" aria-label="Demostración de LiveAnnouncer">
      <h3>LiveAnnouncer</h3>
      <p>Notifica a lectores de pantalla sobre cambios dinámicos sin interrumpir el flujo.</p>
      <div class="actions">
        <!-- aria-label: Describe el propósito del botón para lectores de pantalla -->
        <button (click)="announceInfo()" aria-label="Anunciar mensaje informativo">Anunciar info</button>
        <button (click)="announceAlert()" class="warn" aria-label="Anunciar alerta">Anunciar alerta</button>
      </div>
      @if (lastAnnouncement) {
        <!-- role="status" + aria-live="polite": Los lectores de pantalla anuncian este contenido cuando cambia -->
        <div class="log" role="status" aria-live="polite">
          Último anuncio: "{{ lastAnnouncement }}"
        </div>
      }
    </div>
  `,
  styles: [`
    .announcer-demo { background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 1.25rem; }
    h3 { margin-bottom: .5rem; }
    p { font-size: .875rem; color: #555; margin-bottom: 1rem; }
    .actions { display: flex; gap: .5rem; }
    button { padding: .5rem 1rem; background: #1a73e8; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: .85rem; }
    button.warn { background: #e65100; }
    .log { margin-top: .75rem; padding: .5rem .75rem; background: #f5f5f5; border-radius: 6px; font-size: .8rem; color: #555; }
    button:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
  `]
})
export class AnnouncerComponent {
  private announcer = inject(LiveAnnouncer);
  lastAnnouncement = '';

  /**
   * Anuncia un mensaje informativo con prioridad 'polite'.
   * El lector de pantalla lo dirá cuando termine de leer lo actual.
   */
  announceInfo(): void {
    const msg = 'La página ha cargado correctamente.';
    this.lastAnnouncement = msg;
    this.announcer.announce(msg, 'polite');
  }

  /**
   * Anuncia una alerta con prioridad 'assertive'.
   * El lector de pantalla interrumpe lo que esté leyendo para decir esto.
   */
  announceAlert(): void {
    const msg = 'Alerta: Se ha detectado un error simulado en el formulario.';
    this.lastAnnouncement = msg;
    this.announcer.announce(msg, 'assertive');
  }
}
