import { Injectable, signal, WritableSignal } from '@angular/core';

interface CRDTOperation {
  id: string;
  userId: string;
  type: 'insert' | 'delete';
  position: number;
  text?: string;
  length?: number;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class DocService {
  content: WritableSignal<string> = signal('');
  private operations: CRDTOperation[] = [];
  private readonly siteId: string;

  constructor() {
    this.siteId = Math.random().toString(36).slice(2, 10);
  }

  localInsert(position: number, text: string) {
    const op: CRDTOperation = {
      id: crypto.randomUUID(),
      userId: this.siteId,
      type: 'insert',
      position,
      text,
      timestamp: Date.now()
    };
    this.applyOperation(op);
    this.operations.push(op);
    return op;
  }

  localDelete(position: number, length: number) {
    const op: CRDTOperation = {
      id: crypto.randomUUID(),
      userId: this.siteId,
      type: 'delete',
      position,
      length,
      timestamp: Date.now()
    };
    this.applyOperation(op);
    this.operations.push(op);
    return op;
  }

  applyRemote(op: CRDTOperation) {
    const conflict = this.operations.find(o => o.id === op.id);
    if (conflict) return;
    this.applyOperation(op);
    this.operations.push(op);
  }

  private applyOperation(op: CRDTOperation) {
    this.content.update(current => {
      if (op.type === 'insert') {
        return current.slice(0, op.position) + op.text + current.slice(op.position);
      } else {
        return current.slice(0, op.position) + current.slice(op.position + (op.length || 0));
      }
    });
  }

  getSiteId(): string {
    return this.siteId;
  }
}
