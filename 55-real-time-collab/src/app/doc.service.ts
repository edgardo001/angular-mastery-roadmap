// ============================================================
// doc.service.ts — Servicio de documento con CRDT
// ============================================================
// CRDT (Conflict-free Replicated Data Type) es una técnica que permite
// que múltiples usuarios editen el mismo dato sin conflictos.
// Es como si todos pudieran escribir en la misma pizarra al mismo tiempo,
// y la pizarra se arreglara sola para que todos vean lo mismo.
//
// Este servicio implementa un CRDT simple de texto:
// cada operación (insert/delete) tiene un ID único y timestamp,
// y se aplica en el orden correcto sin perder cambios.

import { Injectable, signal, WritableSignal } from '@angular/core';

// Interface CRDTOperation: define qué forma tiene una operación de edición.
// Es como un "ticket de cambio": dice quién hizo qué, dónde y cuándo.
interface CRDTOperation {
  id: string;         // ID único de la operación (para detectar duplicados)
  userId: string;     // Quién hizo el cambio
  type: 'insert' | 'delete';  // Tipo de operación
  position: number;   // Dónde se hizo el cambio (índice en el texto)
  text?: string;      // Texto insertado (solo para 'insert')
  length?: number;    // Cuántos caracteres se eliminaron (solo para 'delete')
  timestamp: number;  // Cuándo se hizo (para ordenar si hay empate)
}

@Injectable({ providedIn: 'root' })
export class DocService {
  // content: el contenido actual del documento como signal.
  content: WritableSignal<string> = signal('');

  // operations: historial de todas las operaciones aplicadas.
  private operations: CRDTOperation[] = [];

  // siteId: identificador único de esta instancia del documento.
  // Es como un "nombre de usuario" para esta copia del documento.
  private readonly siteId: string;

  constructor() {
    // Genera un ID aleatorio corto (8 caracteres).
    this.siteId = Math.random().toString(36).slice(2, 10);
  }

  // localInsert: inserta texto en una posición específica.
  localInsert(position: number, text: string) {
    const op: CRDTOperation = {
      id: crypto.randomUUID(),  // Genera un ID único usando la API del navegador
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

  // localDelete: elimina texto de una posición específica.
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

  // applyRemote: aplica una operación que viene de otro usuario.
  applyRemote(op: CRDTOperation) {
    // Si ya tenemos esta operación (la hicimos nosotros), la ignoramos.
    const conflict = this.operations.find(o => o.id === op.id);
    if (conflict) return;
    this.applyOperation(op);
    this.operations.push(op);
  }

  // applyOperation: modifica el contenido del documento según la operación.
  private applyOperation(op: CRDTOperation) {
    this.content.update(current => {
      if (op.type === 'insert') {
        // Inserta el texto: toma lo que hay antes + el texto nuevo + lo que hay después.
        return current.slice(0, op.position) + op.text + current.slice(op.position);
      } else {
        // Elimina texto: toma lo que hay antes + lo que hay después del borrado.
        return current.slice(0, op.position) + current.slice(op.position + (op.length || 0));
      }
    });
  }

  // getSiteId: devuelve el ID único de esta instancia.
  getSiteId(): string {
    return this.siteId;
  }
}
