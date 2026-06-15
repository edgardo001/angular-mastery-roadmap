import { Component, inject, viewChild } from '@angular/core';
import { ModalComponent } from './modal.component';
import { AnnouncerComponent } from './announcer.component';
import { ContrastCardComponent } from './contrast-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ModalComponent, AnnouncerComponent, ContrastCardComponent],
  template: `
    <a class="skip-link" (click)="skipToMain($event)" href="#main-content">
      Saltar al contenido principal
    </a>

    <header role="banner">
      <h1>Accesibilidad en Angular</h1>
      <p class="subtitle">CDK A11y — LiveAnnouncer, Focus Trap, ARIA, contraste y navegación por teclado</p>
      <nav aria-label="Navegación principal">
        <a (click)="scrollTo('announcer')" href="#announcer">LiveAnnouncer</a>
        <a (click)="scrollTo('modal')" href="#modal">Focus Trap</a>
        <a (click)="scrollTo('contrast')" href="#contrast">Contraste</a>
      </nav>
    </header>

    <main id="main-content" #main tabindex="-1" role="main">
      <section id="announcer" aria-labelledby="s1-title">
        <h2 id="s1-title">LiveAnnouncer</h2>
        <app-announcer />
      </section>

      <section id="modal" aria-labelledby="s2-title">
        <h2 id="s2-title">Focus Trap con cdkTrapFocus</h2>
        <p>El modal atrapa el foco dentro de sí mismo mientras está abierto. Pulsa <kbd>Tab</kbd> para navegar solo dentro del modal.</p>
        <button (click)="modal.open('Modal de ejemplo')" class="btn-primary" aria-haspopup="dialog">
          Abrir modal
        </button>
      </section>

      <section id="contrast" aria-labelledby="s3-title">
        <h2 id="s3-title">Contraste de Color</h2>
        <app-contrast-card />
      </section>

      <section aria-labelledby="s4-title">
        <h2 id="s4-title">Navegación por teclado</h2>
        <ul class="keyboard-hints">
          <li><kbd>Tab</kbd> — Navegar entre elementos interactivos</li>
          <li><kbd>Shift</kbd> + <kbd>Tab</kbd> — Navegar hacia atrás</li>
          <li><kbd>Enter</kbd> / <kbd>Espacio</kbd> — Activar botón o enlace</li>
          <li><kbd>Escape</kbd> — Cerrar modal</li>
        </ul>
      </section>
    </main>

    <footer role="contentinfo">
      <p>Demostración de accesibilidad con Angular CDK &mdash; WCAG 2.1 AA</p>
    </footer>

    <app-modal #modal (closed)="onModalClosed()" />
  `,
  styles: [`
    .skip-link { position: absolute; top: -100px; left: 8px; background: #1a73e8; color: #fff; padding: .5rem 1rem; border-radius: 0 0 6px 6px; z-index: 2000; text-decoration: none; font-weight: 500; }
    .skip-link:focus { top: 0; }
    header { text-align: center; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid #ddd; }
    h1 { margin-bottom: .25rem; }
    .subtitle { color: #666; margin-bottom: 1rem; }
    nav { display: flex; justify-content: center; gap: 1rem; }
    nav a { color: #1a73e8; text-decoration: none; font-weight: 500; padding: .25rem .5rem; border-radius: 4px; }
    nav a:hover { text-decoration: underline; }
    nav a:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
    main:focus { outline: none; }
    section { margin-bottom: 2.5rem; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1.5rem; }
    section h2 { margin-bottom: 1rem; font-size: 1.15rem; color: #1a1a2e; }
    section p { font-size: .9rem; color: #555; margin-bottom: 1rem; }
    .btn-primary { padding: .6rem 1.2rem; background: #1a73e8; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: .9rem; font-weight: 500; }
    .btn-primary:hover { opacity: .9; }
    .btn-primary:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
    .keyboard-hints { list-style: none; padding: 0; }
    .keyboard-hints li { padding: .5rem 0; font-size: .875rem; color: #444; border-bottom: 1px solid #f0f0f0; }
    .keyboard-hints li:last-child { border-bottom: none; }
    kbd { background: #e8e8e8; padding: .125rem .375rem; border-radius: 4px; font-size: .8rem; font-family: inherit; border: 1px solid #ccc; }
    footer { text-align: center; padding: 1rem; color: #888; font-size: .8rem; border-top: 1px solid #ddd; margin-top: 2rem; }
    a:focus-visible, button:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
  `]
})
export class AppComponent {
  readonly modal = viewChild.required(ModalComponent);

  skipToMain(event: Event): void {
    event.preventDefault();
    const el = document.getElementById('main-content');
    el?.focus();
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    el?.focus();
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  onModalClosed(): void {
    // LiveAnnouncer already handles the announcement
  }
}
