// ============================================================
// cursor.service.ts — Servicio de gestión de cursores con Y.js Awareness
// ============================================================
// Este servicio usa el protocolo Awareness de Y.js para manejar
// las posiciones de los cursores remotos.
//
// ANLOGÍA: Awareness es como un "sistema de mensajería" que notifica
// a todos los usuarios conectados sobre:
// - Quién está en la sala
// - Dónde está su cursor
// - Qué color tiene su cursor
//
// Y.js Awareness ya resuelve todos los problemas de sincronización
// de cursores que tendríamos que resolver manualmente:
// - No necesitamos enviar mensajes de cursor por WebSocket
// - No necesitamos manejar usuarios que se desconectan
// - No necesitamos resolver conflictos de cursores

import { Injectable, signal, WritableSignal, OnDestroy } from '@angular/core';

// YjsService: el servicio central de Y.js
import { YjsService } from './yjs.service';

// CursorPosition: dónde está el cursor (posición en el texto).
export interface CursorPosition {
  anchor: number;  // Posición de inicio de selección
  head: number;    // Posición de fin de selección (cabeza del cursor)
}

// RemoteCursor: la información completa de un cursor remoto.
export interface RemoteCursor {
  userId: string;       // Quién es el usuario
  position: CursorPosition;  // Dónde está su cursor
  color: string;        // Color del cursor (para distinguir usuarios)
  name: string;         // Nombre que se muestra sobre el cursor
}

@Injectable({ providedIn: 'root' })
export class CursorService implements OnDestroy {
  // ============================================================
  // Propiedades
  // ============================================================

  // remoteCursors: array de cursores de todos los usuarios conectados.
  // Se actualiza automáticamente cuando alguien mueve su cursor.
  remoteCursors: WritableSignal<RemoteCursor[]> = signal([]);

  // localPosition: la posición del cursor del usuario local.
  localPosition: WritableSignal<CursorPosition> = signal({ anchor: 0, head: 0 });

  // updateInterval: intervalo para actualizar los cursores remotos.
  // Y.js Awareness no tiene un evento "onChange" directo,
  // así que usamos un intervalo para verificar cambios.
  private updateInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private yjsService: YjsService) {
    // Iniciar la actualización periódica de cursores.
    this.startCursorUpdates();
  }

  // ============================================================
  // Métodos de actualización de cursores
  // ============================================================

  // startCursorUpdates: Inicia la actualización periódica de cursores.
  // Cada 100ms, verifica si hay cambios en los cursores remotos.
  private startCursorUpdates() {
    // Usar un intervalo para actualizar los cursores.
    // Esto es más eficiente que escuchar cada evento individual.
    this.updateInterval = setInterval(() => {
      this.updateRemoteCursors();
    }, 100);
  }

  // updateRemoteCursors: Actualiza la lista de cursores remotos.
  // Lee la información de Awareness de Y.js y la convierte
  // en un formato que Angular puede usar fácilmente.
  private updateRemoteCursors() {
    // Obtener los cursores del servicio Y.js.
    const yjsCursors = this.yjsService.getRemoteCursors();

    // Convertir al formato de RemoteCursor.
    const remoteCursors: RemoteCursor[] = yjsCursors.map(cursor => ({
      userId: cursor.id,
      position: {
        anchor: cursor.cursor?.anchor ?? 0,
        head: cursor.cursor?.head ?? 0
      },
      color: cursor.color,
      name: cursor.name
    }));

    // Actualizar el signal.
    this.remoteCursors.set(remoteCursors);
  }

  // updateLocalCursor: actualiza la posición del cursor local.
  // También actualiza la información de Awareness para que
  // otros usuarios vean dónde está tu cursor.
  //
  // Parámetros:
  // - anchor: Posición de inicio de selección
  // - head: Posición de fin de selección
  //
  // Ejemplo de uso:
  //   cursorService.updateLocalCursor(10, 10) // Cursor en posición 10
  //   cursorService.updateLocalCursor(5, 15)  // Selección del 5 al 15
  updateLocalCursor(anchor: number, head: number) {
    // Actualizar el signal local.
    this.localPosition.set({ anchor, head });

    // Actualizar Awareness para que otros usuarios vean el cursor.
    this.yjsService.updateCursor(anchor, head);
  }

  // removeRemoteCursor: elimina el cursor de un usuario que se desconectó.
  // Y.js Awareness ya maneja esto automáticamente cuando un usuario
  // se desconecta, pero este método es útil si necesitas
  // eliminar un cursor manualmente.
  //
  // Parámetros:
  // - userId: ID del usuario cuyo cursor quieres eliminar
  removeRemoteCursor(userId: string) {
    this.remoteCursors.update(cursors => cursors.filter(c => c.userId !== userId));
  }

  // getColorForUser: retorna el color de un usuario específico.
  // Útil si necesitas colorear elementos basados en el usuario.
  //
  // Parámetros:
  // - userId: ID del usuario
  //
  // Ejemplo de uso:
  //   const color = cursorService.getColorForUser('user-abc')
  getColorForUser(userId: string): string {
    const cursor = this.remoteCursors().find(c => c.userId === userId);
    return cursor?.color || '#94a3b8';
  }

  // ============================================================
  // Limpieza
  // ============================================================

  ngOnDestroy() {
    // Limpiar el intervalo de actualización.
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    console.log('[CursorService] Destroyed');
  }
}
