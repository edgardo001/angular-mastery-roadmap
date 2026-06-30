// ============================================================
// cursor.service.ts — Servicio de gestión de cursores
// ============================================================
// En un editor colaborativo, cada usuario tiene un cursor que muestran
// dónde están escribiendo. Este servicio maneja las posiciones de
// todos los cursores: el local (el tuyo) y los remotos (los demás).

import { Injectable, signal, WritableSignal } from '@angular/core';

// CursorPosition: dónde está el cursor (línea y columna).
export interface CursorPosition {
  line: number;  // Número de línea (0-indexed)
  ch: number;    // Columna (character index, 0-indexed)
}

// RemoteCursor: la información completa de un cursor remoto.
export interface RemoteCursor {
  userId: string;       // Quién es el usuario
  position: CursorPosition;  // Dónde está su cursor
  color: string;        // Color del cursor (para distinguir usuarios)
  label: string;        // Nombre que se muestra sobre el cursor
}

@Injectable({ providedIn: 'root' })
export class CursorService {
  // remoteCursors: array de cursores de todos los usuarios conectados.
  remoteCursors: WritableSignal<RemoteCursor[]> = signal([]);

  // localPosition: la posición del cursor del usuario local.
  localPosition: WritableSignal<CursorPosition> = signal({ line: 0, ch: 0 });

  // updateLocalCursor: actualiza la posición del cursor local.
  updateLocalCursor(line: number, ch: number) {
    this.localPosition.set({ line, ch });
  }

  // updateRemoteCursor: agrega o actualiza el cursor de un usuario remoto.
  updateRemoteCursor(cursor: RemoteCursor) {
    this.remoteCursors.update(cursors => {
      // Busca si ya existe un cursor para este usuario.
      const existing = cursors.findIndex(c => c.userId === cursor.userId);
      if (existing >= 0) {
        // Si existe, lo reemplaza con la nueva posición.
        const updated = [...cursors];
        updated[existing] = cursor;
        return updated;
      }
      // Si no existe, lo agrega al array.
      return [...cursors, cursor];
    });
  }

  // removeRemoteCursor: elimina el cursor de un usuario que se desconectó.
  removeRemoteCursor(userId: string) {
    this.remoteCursors.update(cursors => cursors.filter(c => c.userId !== userId));
  }

  // Colores predefinidos para cada usuario. Cada usuario tiene un color diferente.
  private colors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#ec4899', '#14b8a6', '#f97316'];

  // getColorForUser: asigna un color basado en el índice del usuario.
  getColorForUser(index: number): string {
    return this.colors[index % this.colors.length];
  }
}
