// ModalComponent: ventana superpuesta que muestra contenido temporal
// Un modal es como un pop-up: aparece encima de todo y bloquea la interacción con el fondo
// Angular CDK Overlay permite crear modales de forma profesional con posicionamiento automático
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- backdrop: capa semitransparente detrás del modal -->
    <!-- *ngIf: solo se muestra cuando isOpen es true -->
    <!-- (click)="close.emit()": cerrar al hacer clic en el fondo -->
    <div class="modal-backdrop" *ngIf="isOpen" (click)="close.emit()">
      <!-- content: contenedor del modal -->
      <!-- $event.stopPropagation(): evita que el clic se propague al backdrop (no cierra el modal) -->
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <!-- close-btn: botón X para cerrar el modal -->
          <button class="close-btn" (click)="close.emit()">&times;</button>
        </div>
        <div class="modal-body">
          <!-- ng-content: proyecta el contenido del modal desde el componente padre -->
          <ng-content />
        </div>
        <!-- footer con botones de acción: solo se muestra si showFooter es true -->
        <div class="modal-footer" *ngIf="showFooter">
          <button class="btn btn-secondary" (click)="close.emit()">Cancelar</button>
          <button class="btn btn-primary" (click)="confirm.emit()">Confirmar</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); display: flex; align-items: center;
      justify-content: center; z-index: 1000;
    }
    .modal-content {
      background: white; border-radius: 12px; width: 90%; max-width: 500px;
      max-height: 80vh; overflow: auto;
    }
    .modal-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px; border-bottom: 1px solid #e0e0e0;
    }
    .modal-header h3 { margin: 0; }
    .close-btn { background: none; border: none; font-size: 24px; cursor: pointer; color: #666; }
    .modal-body { padding: 20px; }
    .modal-footer {
      display: flex; justify-content: flex-end; gap: 10px;
      padding: 20px; border-top: 1px solid #e0e0e0;
    }
    .btn { padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; }
    .btn-primary { background: #1a73e8; color: white; }
    .btn-secondary { background: #e0e0e0; color: #333; }
  `],
})
export class ModalComponent {
  // @Input(): propiedad que el padre puede pasar al componente
  // isOpen controla si el modal está visible o no
  @Input() isOpen = false;
  // title: texto que aparece en el header del modal
  @Input() title = 'Modal';
  // showFooter: si es true, muestra los botones Cancelar/Confirmar
  @Input() showFooter = true;

  // @Output(): eventos que el componente emite al padre
  // close: se emite cuando el usuario quiere cerrar el modal
  @Output() close = new EventEmitter<void>();
  // confirm: se emite cuando el usuario hace clic en Confirmar
  @Output() confirm = new EventEmitter<void>();
}
