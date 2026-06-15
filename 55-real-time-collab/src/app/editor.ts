import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocService } from './doc.service';
import { CursorService, RemoteCursor } from './cursor.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="editor-container">
      <div class="cursors-overlay">
        @for (cursor of cursorService.remoteCursors(); track cursor.userId) {
          <div class="remote-cursor" [style.left.px]="cursor.position.ch * 8" [style.top.px]="cursor.position.line * 20">
            <div class="cursor-label" [style.background]="cursor.color">{{ cursor.label }}</div>
            <div class="cursor-line" [style.background]="cursor.color"></div>
          </div>
        }
      </div>
      <textarea
        class="editor"
        [ngModel]="docService.content()"
        (ngModelChange)="onContentChange($event)"
        (click)="onCursorMove($event)"
        (keyup)="onCursorMove($event)"
        placeholder="Start collaborating..."
        spellcheck="false"
      ></textarea>
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
  constructor(
    public docService: DocService,
    public cursorService: CursorService
  ) {}

  ngOnInit() {
    this.docService.content.set('// Collaborative document\n// Start editing together\n');
  }

  ngOnDestroy() {}

  onContentChange(value: string) {
    this.docService.content.set(value);
  }

  onCursorMove(event: MouseEvent | KeyboardEvent) {
    const ta = event.target as HTMLTextAreaElement;
    this.cursorService.updateLocalCursor(ta.selectionStart, ta.selectionEnd);
  }
}
