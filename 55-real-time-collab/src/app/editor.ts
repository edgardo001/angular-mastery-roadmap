// ============================================================
// editor.ts — Componente editor de texto colaborativo
// ============================================================
// Este componente muestra un editor de texto donde múltiples usuarios
// pueden escribir al mismo tiempo. Muestra los cursores de otros
// usuarios en tiempo real, como Google Docs.

import { Component, OnInit, OnDestroy, signal } from '@angular/core';

// FormsModule: permite usar [(ngModel)] para enlazar el textarea con una variable.
import { FormsModule } from '@angular/forms';

// DocService: maneja el contenido del documento y las operaciones CRDT.
import { DocService } from './doc.service';

// CursorService: maneja las posiciones de los cursores remotos.
import { CursorService, RemoteCursor } from './cursor.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [FormsModule],

  template: `
    <div class="editor-container">
      <!-- Overlay de cursores: muestra las posiciones de otros usuarios -->
      <div class="cursors-overlay">
        <!-- @for itera sobre los cursores remotos y muestra cada uno -->
        @for (cursor of cursorService.remoteCursors(); track cursor.userId) {
          <!-- Posiciona el cursor remoto usando CSS absoluto -->
          <div class="remote-cursor" [style.left.px]="cursor.position.ch * 8" [style.top.px]="cursor.position.line * 20">
            <div class="cursor-label" [style.background]="cursor.color">{{ cursor.label }}</div>
            <div class="cursor-line" [style.background]="cursor.color"></div>
          </div>
        }
      </div>
      <!-- textarea: el campo de edición de texto -->
      <textarea
        class="editor"
        <!-- [ngModel] — one-way binding: lee el contenido del servicio -->
        [ngModel]="docService.content()"
        <!-- (ngModelChange) — cuando el usuario escribe, actualiza el servicio -->
        (ngModelChange)="onContentChange($event)"
        (click)="onCursorMove($event)"
        (keyup)="onCursorMove($event)"
        placeholder="Start collaborating..."
        spellcheck="false"
      ></textarea>
      <!-- Barra de estado: información sobre la sesión -->
      <div class="status-bar">
        <span>Users online: {{ cursorService.remoteCursors().length }}</span>
        <span>Site ID: {{ docService.getSiteId() }}</span>
        <span>Characters: {{ docService.content().length }}</span>
      </div>
    </div>
  `,
  styles: [`
    .editor-container { position: relative; border: 1px solid #d1d5db; border-radius: 8px; overflow: hidden; }
    .cursors-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; z-index: 10; }
    .remote-cursor { position: absolute; }
    .cursor-label { padding: 2px 6px; border-radius: 4px; font-size: 11px; color: white; white-space: nowrap; }
    .cursor-line { width: 2px; height: 18px; }
    .editor { width: 100%; min-height: 400px; padding: 1rem; border: none; resize: vertical; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 14px; line-height: 1.5; background: #f8fafc; color: #1e293b; }
    .editor:focus { outline: none; background: white; }
    .status-bar { display: flex; gap: 1.5rem; padding: 0.5rem 1rem; background: #f1f5f9; font-size: 0.75rem; color: #64748b; border-top: 1px solid #d1d5db; }
  `]
})
export class EditorComponent implements OnInit, OnDestroy {
  // Inyectamos los servicios que necesitamos.
  // "public" permite acceder desde el template (ej: docService.content()).
  constructor(
    public docService: DocService,
    public cursorService: CursorService
  ) {}

  // ngOnInit: se ejecuta cuando el componente se muestra por primera vez.
  ngOnInit() {
    // Establece el contenido inicial del documento de colaboración.
    this.docService.content.set('// Collaborative document\n// Start editing together\n');
  }

  // ngOnDestroy: se ejecuta cuando el componente se destruye (navegamos away).
  ngOnDestroy() {}

  // onContentChange: se llama cada vez que el usuario escribe en el textarea.
  onContentChange(value: string) {
    // Actualiza el contenido en el servicio (que luego se sincroniza con otros usuarios).
    this.docService.content.set(value);
  }

  // onCursorMove: rastrea la posición del cursor del usuario local.
  onCursorMove(event: MouseEvent | KeyboardEvent) {
    // Obtiene el textarea y lee la posición del cursor.
    const ta = event.target as HTMLTextAreaElement;
    this.cursorService.updateLocalCursor(ta.selectionStart, ta.selectionEnd);
  }
}
