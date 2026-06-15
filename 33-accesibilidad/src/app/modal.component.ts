import { Component, output, signal, inject } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CdkTrapFocus } from '@angular/cdk/a11y';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CdkTrapFocus],
  template: `
    @if (visible()) {
      <div class="overlay" (click)="close()" role="presentation"></div>
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="title()"
        cdkTrapFocus
        cdkTrapFocusAutoCapture
      >
        <div class="header">
          <h2 id="modal-title">{{ title() }}</h2>
          <button class="close" (click)="close()" aria-label="Cerrar modal">&times;</button>
        </div>
        <div class="body">
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
  readonly visible = signal(false);
  readonly title = signal('');
  readonly closed = output<void>();

  private announcer = inject(LiveAnnouncer);

  open(title: string): void {
    this.title.set(title);
    this.visible.set(true);
    this.announcer.announce(`Modal abierto: ${title}`, 'assertive');
  }

  close(): void {
    this.visible.set(false);
    this.closed.emit();
    this.announcer.announce('Modal cerrado', 'polite');
  }
}
