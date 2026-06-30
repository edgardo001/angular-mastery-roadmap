import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DbService, Note } from '../db.service';
import { PushNotificationService } from '../push-notification.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="notes-container">
      <h2>Mis Notas Offline</h2>

      <!-- Formulario para crear nota -->
      <div class="create-note">
        <input
          type="text"
          [(ngModel)]="newTitle"
          placeholder="Titulo de la nota"
          class="input" />
        <textarea
          [(ngModel)]="newContent"
          placeholder="Contenido de la nota..."
          class="textarea"></textarea>
        <button (click)="addNote()" class="btn btn-primary" [disabled]="!newTitle">
          Guardar Nota
        </button>
      </div>

      <!-- Estado de sincronizacion -->
      @if (syncStatus()) {
        <div class="sync-status">
          {{ syncMessage() }}
        </div>
      }

      <!-- Lista de notas -->
      <div class="notes-list">
        @for (note of notes(); track note.id) {
          <div class="note-card">
            <div class="note-header">
              <h3>{{ note.title }}</h3>
              <span class="sync-badge" [class.unsynced]="!note.synced">
                {{ note.synced ? 'Synced' : 'Local' }}
              </span>
            </div>
            <p>{{ note.content }}</p>
            <div class="note-footer">
              <small>{{ note.createdAt | date:'short' }}</small>
              <button (click)="deleteNote(note.id!)" class="btn-icon">Delete</button>
            </div>
          </div>
        }

        @if (notes().length === 0) {
          <div class="empty-state">
            <p>No hay notas aun. Crea una!</p>
            <small>Las notas se guardan en IndexedDB (offline first)</small>
          </div>
        }
      </div>

      <!-- Boton de sincronizacion -->
      <div class="actions">
        <button (click)="syncNotes()" class="btn btn-secondary">
          Sincronizar con servidor
        </button>
      </div>
    </div>
  `,
  styles: [`
    .notes-container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .create-note { background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 20px; }
    .input, .textarea { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 10px; font-size: 14px; box-sizing: border-box; }
    .textarea { min-height: 100px; resize: vertical; font-family: inherit; }
    .btn { padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
    .btn-primary { background: #1a73e8; color: white; }
    .btn-secondary { background: #5f6368; color: white; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .sync-status { padding: 10px; background: #e8f5e9; border-radius: 8px; margin-bottom: 20px; text-align: center; }
    .note-card { background: white; border: 1px solid #e0e0e0; border-radius: 12px; padding: 16px; margin-bottom: 12px; }
    .note-header { display: flex; justify-content: space-between; align-items: center; }
    .note-header h3 { margin: 0; font-size: 16px; }
    .sync-badge { font-size: 12px; padding: 2px 8px; border-radius: 999px; background: #e8f5e9; color: #2e7d32; }
    .sync-badge.unsynced { background: #fff3e0; color: #e65100; }
    .note-card p { color: #666; margin: 10px 0; }
    .note-footer { display: flex; justify-content: space-between; align-items: center; color: #999; }
    .btn-icon { background: none; border: none; cursor: pointer; color: #ef4444; font-weight: 600; }
    .empty-state { text-align: center; padding: 40px; color: #999; }
    .actions { margin-top: 20px; text-align: center; }
  `],
})
export class NotesComponent implements OnInit {
  private dbService = inject(DbService);
  private pushService = inject(PushNotificationService);

  notes = signal<Note[]>([]);
  newTitle = '';
  newContent = '';
  syncStatus = signal<'idle' | 'syncing' | 'synced'>('idle');
  syncMessage = signal('');

  async ngOnInit() {
    await this.loadNotes();
    this.pushService.listenToPush();
  }

  async loadNotes() {
    const notes = await this.dbService.getAllNotes();
    this.notes.set(notes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
  }

  async addNote() {
    if (!this.newTitle) return;

    await this.dbService.addNote({
      title: this.newTitle,
      content: this.newContent,
      createdAt: new Date(),
      synced: navigator.onLine,
    });

    this.newTitle = '';
    this.newContent = '';
    await this.loadNotes();

    this.pushService.sendTestNotification();
  }

  async deleteNote(id: number) {
    await this.dbService.deleteNote(id);
    await this.loadNotes();
  }

  async syncNotes() {
    this.syncStatus.set('syncing');
    this.syncMessage.set('Sincronizando...');

    const result = await this.dbService.syncWithServer();

    this.syncStatus.set('synced');
    this.syncMessage.set(`Sincronizadas: ${result.synced}, Fallidas: ${result.failed}`);
    await this.loadNotes();

    setTimeout(() => {
      this.syncStatus.set('idle');
      this.syncMessage.set('');
    }, 3000);
  }
}
