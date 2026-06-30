import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

/**
 * Interfaz que define la estructura de una nota en IndexedDB
 *
 * IndexedDB es una base de datos del navegador que almacena datos localmente.
 * Dexie.js es una librería que facilita trabajar con IndexedDB.
 *
 * Analogía: IndexedDB es como un Excel dentro del navegador.
 * Cada "tabla" es como una hoja de cálculo.
 * Cada "fila" es como un registro (una nota en este caso).
 */
export interface Note {
  id?: number;
  title: string;
  content: string;
  createdAt: Date;
  synced: boolean;
}

/**
 * Clase que define la base de datos Dexie
 *
 * Extiende de Dexie para crear una conexión a IndexedDB.
 * Definimos las tablas y sus esquemas.
 */
class NotesDatabase extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super('PwaNotesDB');
    this.version(1).stores({
      notes: '++id, title, synced, createdAt'
    });
  }
}

/**
 * Servicio para gestionar notas offline con Dexie.js
 *
 * Permite:
 * - Crear, leer, actualizar y eliminar notas
 * - Marcar notas para sincronización
 * - Trabajar completamente offline
 */
@Injectable({ providedIn: 'root' })
export class DbService {
  private db: NotesDatabase;

  constructor() {
    this.db = new NotesDatabase();
  }

  /**
   * Obtiene todas las notas de IndexedDB
   */
  async getAllNotes(): Promise<Note[]> {
    return this.db.notes.toArray();
  }

  /**
   * Agrega una nueva nota a IndexedDB
   */
  async addNote(note: Omit<Note, 'id'>): Promise<number> {
    return this.db.notes.add(note as Note);
  }

  /**
   * Actualiza una nota existente
   */
  async updateNote(id: number, changes: Partial<Note>): Promise<number> {
    return this.db.notes.update(id, changes);
  }

  /**
   * Elimina una nota por ID
   */
  async deleteNote(id: number): Promise<void> {
    return this.db.notes.delete(id);
  }

  /**
   * Obtiene todas las notas que necesitan sincronización
   * Estas son notas creadas cuando el usuario estaba offline
   */
  async getUnsyncedNotes(): Promise<Note[]> {
    return this.db.notes.where('synced').equals(0).toArray();
  }

  /**
   * Marca una nota como sincronizada
   */
  async markAsSynced(id: number): Promise<void> {
    await this.db.notes.update(id, { synced: true });
  }

  /**
   * Simula sincronización con el servidor
   * En una app real, aquí harías fetch() al backend
   */
  async syncWithServer(): Promise<{ synced: number; failed: number }> {
    const unsyncedNotes = await this.getUnsyncedNotes();
    let synced = 0;
    let failed = 0;

    for (const note of unsyncedNotes) {
      try {
        // Simular llamada al servidor (en producción, usar fetch())
        console.log('Syncing note:', note.id);
        await this.markAsSynced(note.id!);
        synced++;
      } catch (error) {
        console.error('Failed to sync note:', note.id, error);
        failed++;
      }
    }

    return { synced, failed };
  }
}
