// ============================================================
// editor.ts — Componente editor de texto colaborativo con Y.js
// ============================================================
// Este componente muestra un editor de texto donde múltiples usuarios
// pueden escribir al mismo tiempo. Usa Y.js para sincronizar los cambios.
//
// ANLOGÍA: Es como Google Docs donde todos pueden escribir al mismo tiempo
// y ven los cursores de otros usuarios en tiempo real.
//
// Y.js se encarga de:
// 1. Sincronizar el texto entre usuarios
// 2. Resolver conflictos cuando dos usuarios escriben en el mismo lugar
// 3. Mostrar los cursores de otros usuarios (Awareness)

import { Component, OnInit, OnDestroy, signal, ViewChild, ElementRef } from '@angular/core';

// FormsModule: permite usar [(ngModel)] para enlazar el textarea con una variable.
import { FormsModule } from '@angular/forms';

// DocService: maneja el contenido del documento usando Y.js.
import { DocService } from './doc.service';

// CursorService: maneja las posiciones de los cursores remotos.
import { CursorService, RemoteCursor } from './cursor.service';

// CollabService: maneja la conexión con el servidor Y.js.
import { CollabService } from './collab.service';

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
          <div class="remote-cursor" [style.left.px]="cursor.position.head * 8" [style.top.px]="0">
            <div class="cursor-label" [style.background]="cursor.color">{{ cursor.name }}</div>
            <div class="cursor-line" [style.background]="cursor.color"></div>
          </div>
        }
      </div>
      <!-- textarea: el campo de edición de texto -->
      <textarea
        #editorTextarea
        class="editor"
        [ngModel]="docService.content()"
        (ngModelChange)="onContentChange($event)"
        (click)="onCursorMove($event)"
        (keyup)="onCursorMove($event)"
        (mouseup)="onCursorMove($event)"
        placeholder="Start collaborating..."
        spellcheck="false"
      ></textarea>
      <!-- Barra de estado: información sobre la sesión -->
      <div class="status-bar">
        <span>Users online: {{ collabService.peers().length + 1 }}</span>
        <span>Site ID: {{ docService.getSiteId() }}</span>
        <span>Characters: {{ docService.content().length }}</span>
        <span [class.connected]="collabService.connected()">
          {{ collabService.connected() ? 'Connected' : 'Disconnected' }}
        </span>
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
    .status-bar .connected { color: #22c55e; }
  `]
})
export class EditorComponent implements OnInit, OnDestroy {
  // Referencia al textarea para obtener la posición del cursor.
  @ViewChild('editorTextarea') textareaRef!: ElementRef<HTMLTextAreaElement>;

  // Inyectamos los servicios que necesitamos.
  // "public" permite acceder desde el template (ej: docService.content()).
  constructor(
    public docService: DocService,
    public cursorService: CursorService,
    public collabService: CollabService
  ) {}

  // ngOnInit: se ejecuta cuando el componente se muestra por primera vez.
  ngOnInit() {
    // El contenido inicial ahora viene de Y.js (a través del servicio).
    // No necesitamos establecer contenido manualmente.
  }

  // ngOnDestroy: se ejecuta cuando el componente se destruye (navegamos away).
  ngOnDestroy() {
    // El servicios se encargan de la limpieza automáticamente.
  }

  // onContentChange: se llama cada vez que el usuario escribe en el textarea.
  // Y.js se encarga de sincronizar el cambio con otros usuarios.
  onContentChange(value: string) {
    // Actualizar el cursor local después del cambio.
    if (this.textareaRef?.nativeElement) {
      const ta = this.textareaRef.nativeElement;
      this.cursorService.updateLocalCursor(ta.selectionStart, ta.selectionEnd);
    }
  }

  // onCursorMove: rastrea la posición del cursor del usuario local.
  // Y.js Awareness notifica a otros usuarios sobre esta posición.
  onCursorMove(event: MouseEvent | KeyboardEvent) {
    // Obtiene el textarea y lee la posición del cursor.
    const ta = event.target as HTMLTextAreaElement;
    this.cursorService.updateLocalCursor(ta.selectionStart, ta.selectionEnd);
  }
}
