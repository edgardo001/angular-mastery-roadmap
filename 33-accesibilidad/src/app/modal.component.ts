/**
 * Componente Modal con Accesibilidad (Focus Trap).
 *
 * Un modal es una ventana superpuesta que aparece sobre el contenido principal.
 * Piensa en él como una ventana de diálogo que te obliga a responder antes de continuar.
 *
 * CARACTERÍSTICAS DE ACCESIBILIDAD:
 * - cdkTrapFocus: Atrapa el foco dentro del modal (Tab no sale del modal)
 * - role="dialog": Le dice a los lectores de pantalla que esto es un diálogo
 * - aria-modal="true": Indica que es una ventana modal
 * - aria-label: Describe el propósito del elemento para lectores de pantalla
 * - LiveAnnouncer: Notifica cuando el modal se abre/cierra
 *
 * IMPORTS:
 * - output: Decorador moderno para eventos que el componente emite hacia afuera
 * - signal: Contenedor reactivo de datos
 * - inject: Para obtener servicios del sistema de inyección de dependencias
 * - LiveAnnouncer: Servicio del CDK para notificar a lectores de pantalla
 * - CdkTrapFocus: Directiva del CDK que atrapa el foco dentro de un elemento
 */
import { Component, output, signal, inject } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CdkTrapFocus } from '@angular/cdk/a11y';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CdkTrapFocus],
  template: `
    <!-- @if: Control flow de Angular 17+ que reemplaza *ngIf -->
    @if (visible()) {
      <!-- Overlay oscuro que cubre toda la pantalla. (click)="close()" cierra el modal al hacer clic fuera -->
      <div class="overlay" (click)="close()" role="presentation"></div>
      <!--
        cdkTrapFocus: Directiva que atrapa el foco dentro de este elemento.
        cdkTrapFocusAutoCapture: Captura el foco automáticamente al abrir.
        role="dialog": Indica a lectores de pantalla que esto es un diálogo.
        aria-modal="true": Indica que es modal (el contenido detrás no es interactivo).
      -->
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="title()"
        cdkTrapFocus
        cdkTrapFocusAutoCapture
      >
        <div class="header">
          <!-- id="modal-title": Para asociar el título con aria-labelledby si se necesita -->
          <h2 id="modal-title">{{ title() }}</h2>
          <!-- aria-label: Describe el botón para lectores de pantalla -->
          <button class="close" (click)="close()" aria-label="Cerrar modal">&times;</button>
        </div>
        <div class="body">
          <!-- ng-content: Slot de proyección de contenido. El componente padre pone contenido aquí -->
          <ng-content />
        </div>
        <div class="footer">
          <button (click)="close()" class="btn-primary">Aceptar</button>
          <button (click)="close()" class="btn-secondary">Cancelar</button>
        </div>
      </div>
    }
  `,
  styles: [`
    .overlay { position: fixed; inset: 0; background: rgba(0,0,0,.4); z-index: 999; }
    .modal { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); background: #fff; border-radius: 12px; padding: 1.5rem; z-index: 1000; min-width: 340px; max-width: 500px; box-shadow: 0 8px 32px rgba(0,0,0,.2); }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .header h2 { margin: 0; font-size: 1.2rem; }
    .close { background: none; border: none; font-size: 1.5rem; cursor: pointer; padding: 0 .25rem; color: #666; }
    .close:hover { color: #000; }
    .body { margin-bottom: 1.5rem; line-height: 1.6; color: #333; }
    .footer { display: flex; gap: .5rem; justify-content: flex-end; }
    .btn-primary { padding: .5rem 1.2rem; background: #1a73e8; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
    .btn-secondary { padding: .5rem 1.2rem; background: #e8e8e8; color: #333; border: none; border-radius: 6px; cursor: pointer; }
    button:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
  `]
})
export class ModalComponent {
  /**
   * Signal que controla si el modal está visible o no.
   * Equivalente a una variable booleana que se actualiza reactivamente.
   */
  readonly visible = signal(false);

  /**
   * Signal que almacena el título del modal.
   */
  readonly title = signal('');

  /**
   * output() — Decorador moderno (Angular 17+) para crear eventos personalizados.
   * Emite un evento 'closed' cuando el modal se cierra.
   * El padre puede escuchar con (closed)="metodo()"
   * Equivalente a @Output() + EventEmitter.
   */
  readonly closed = output<void>();

  /**
   * LiveAnnouncer — Servicio del CDK de Angular para accesibilidad.
   * Notifica a lectores de pantalla sobre cambios dinámicos.
   * Es como un altavoz que anuncia lo que pasa en la pantalla.
   */
  private announcer = inject(LiveAnnouncer);

  /**
   * Abre el modal con un título específico.
   * 'assertive' interrumpe al lector de pantalla para anunciar inmediatamente.
   */
  open(title: string): void {
    this.title.set(title);
    this.visible.set(true);
    // 'assertive' = interrumpir y anunciar de inmediato (urgente)
    this.announcer.announce(`Modal abierto: ${title}`, 'assertive');
  }

  /**
   * Cierra el modal y notifica a los lectores de pantalla.
   * 'polite' espera a que el lector termine de hablar antes de anunciar.
   */
  close(): void {
    this.visible.set(false);
    this.closed.emit(); // Notifica al componente padre
    this.announcer.announce('Modal cerrado', 'polite');
  }
}
