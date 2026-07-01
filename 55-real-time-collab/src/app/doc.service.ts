// ============================================================
// doc.service.ts — Servicio de documento con Y.js (CRDT)
// ============================================================
// Este servicio reemplaza el CRDT hand-rolled con Y.js.
// Y.js maneja automáticamente los conflictos cuando múltiples
// usuarios editan al mismo tiempo.
//
// ANLOGÍA: Antes teníamos que construir nuestro propio "pizarrón mágico"
// desde cero. Ahora usamos Y.js, que ya es un pizarrón mágico probado
// por miles de aplicaciones (Google Docs, Notion, Figma, etc.).
//
// Y.js resuelve los problemas del CRDT manual:
// 1. No necesitamos generar IDs únicos para cada operación
// 2. No necesitamos resolver conflictos manualmente
// 3. Ya tiene persistencia (IndexedDB) y sincronización (WebSocket)
// 4. Ya maneja Awareness (cursores, presencia)

import { Injectable, signal, WritableSignal, OnDestroy } from '@angular/core';

// Y: la librería Y.js para crear documentos CRDT
import * as Y from 'yjs';

// YjsService: el servicio central de Y.js que maneja el documento
import { YjsService } from './yjs.service';

@Injectable({ providedIn: 'root' })
export class DocService implements OnDestroy {
  // ============================================================
  // Propiedades
  // ============================================================

  // content: el contenido actual del documento como signal.
  // Se actualiza automáticamente cuando Y.js detecta cambios.
  content: WritableSignal<string> = signal('');

  // Y.js types (acceso directo al CRDT)
  // Estos son útiles si necesitas crear bindings con editores
  // como Quill, ProseMirror, o CodeMirror.
  private yText: Y.Text | null = null;

  constructor(private yjsService: YjsService) {
    // Suscribirse a los cambios del documento Y.js.
    // Cuando el contenido cambia, el signal se actualiza.
    this.setupDocumentSync();
  }

  // ============================================================
  // Inicialización
  // ============================================================

  // setupDocumentSync: Configura la sincronización entre Y.js y Angular.
  // Es como conectar el "pizarrón mágico" al "tablero de Angular".
  private setupDocumentSync() {
    // Obtener el tipo Y.Text del servicio Y.js.
    this.yText = this.yjsService.getText();

    // Observar cambios en el texto de Y.js.
    // Cada vez que alguien escribe (local o remotamente),
    // se ejecuta este callback.
    this.yText.observe(event => {
      // Actualizar el signal con el texto completo.
      // Y.js ya resolvió los conflictos, así que solo
      // necesitamos mostrar el resultado.
      this.content.set(this.yText!.toString());

      // Log para depuración.
      console.log('[DocService] Text changed:', event.delta);
    });

    // Sincronizar el contenido inicial.
    this.content.set(this.yText.toString());
  }

  // ============================================================
  // Métodos de edición (compatibles con la API anterior)
  // ============================================================

  // localInsert: inserta texto en una posición específica.
  // Esta función reemplaza la versión manual del CRDT.
  // Y.js se encarga de:
  // - Generar un ID único para la operación
  // - Resolver conflictos con otras operaciones simultáneas
  // - Notificar a otros usuarios del cambio
  //
  // Parámetros:
  // - position: Dónde insertar (índice en el texto)
  // - text: Qué insertar
  //
  // Ejemplo de uso:
  //   docService.localInsert(5, 'Hello')
  localInsert(position: number, text: string) {
    // Y.js transact: garantiza que la operación sea atómica.
    // Es como una "caja fuerte" que contiene todos los cambios.
    this.yjsService.insertText(position, text);

    // Log para depuración.
    console.log(`[DocService] Insert at ${position}: "${text}"`);
  }

  // localDelete: elimina texto de una posición específica.
  // Esta función reemplaza la versión manual del CRDT.
  //
  // Parámetros:
  // - position: Dónde empezar a borrar
  // - length: Cuántos caracteres borrar
  //
  // Ejemplo de uso:
  //   docService.localDelete(5, 3) // Borra 3 caracteres desde la posición 5
  localDelete(position: number, length: number) {
    // Y.js transact: garantiza que la operación sea atómica.
    this.yjsService.deleteText(position, length);

    // Log para depuración.
    console.log(`[DocService] Delete at ${position}, length: ${length}`);
  }

  // ============================================================
  // Métodos de acceso al CRDT
  // ============================================================

  // getYText: Retorna el tipo Y.Text del documento.
  // Útil para crear bindings con editores de texto.
  //
  // Ejemplo de uso con Quill:
  //   const ytext = docService.getYText()
  //   const binding = new QuillBinding(ytext, quillEditor)
  getYText(): Y.Text | null {
    return this.yText;
  }

  // getDoc: Retorna el documento Y.js.
  // Útil si necesitas acceder a otros tipos del documento.
  //
  // Ejemplo de uso:
  //   const doc = docService.getDoc()
  //   const ymap = doc.getMap('metadata')
  getDoc(): Y.Doc {
    return this.yjsService.getDoc();
  }

  // getSiteId: devuelve el ID único de este usuario.
  // Mantiene compatibilidad con la API anterior.
  getSiteId(): string {
    return this.yjsService.getUserId();
  }

  // ============================================================
  // Limpieza
  // ============================================================

  ngOnDestroy() {
    // El YjsService se encarga de la limpieza principal.
    // Este servicio solo necesita limpiar sus propias suscripciones.
    console.log('[DocService] Destroyed');
  }
}
