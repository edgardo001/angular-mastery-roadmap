import { Injectable, signal, WritableSignal } from '@angular/core';

export interface CursorPosition {
  line: number;
  ch: number;
}

export interface RemoteCursor {
  userId: string;
  position: CursorPosition;
  color: string;
  label: string;
}

@Injectable({ providedIn: 'root' })
export class CursorService {
  remoteCursors: WritableSignal<RemoteCursor[]> = signal([]);
  localPosition: WritableSignal<CursorPosition> = signal({ line: 0, ch: 0 });

  updateLocalCursor(line: number, ch: number) {
    this.localPosition.set({ line, ch });
  }

  updateRemoteCursor(cursor: RemoteCursor) {
    this.remoteCursors.update(cursors => {
      const existing = cursors.findIndex(c => c.userId === cursor.userId);
      if (existing >= 0) {
        const updated = [...cursors];
        updated[existing] = cursor;
        return updated;
      }
      return [...cursors, cursor];
    });
  }

  removeRemoteCursor(userId: string) {
    this.remoteCursors.update(cursors => cursors.filter(c => c.userId !== userId));
  }

  private colors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#ec4899', '#14b8a6', '#f97316'];

  getColorForUser(index: number): string {
    return this.colors[index % this.colors.length];
  }
}
