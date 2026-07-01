// ============================================================
// yjs.service.ts — Servicio central de Y.js
// ============================================================
// Y.js es una librería CRDT (Conflict-free Replicated Data Type)
// que resuelve automáticamente los conflictos cuando múltiples
// usuarios editan el mismo documento.
//
// ANLOGÍA: Imagina un pizarrón mágico donde todos pueden escribir
// al mismo tiempo. No importa en qué orden escribas, el pizarrón
// siempre muestra el resultado correcto. Y.js es ese pizarrón mágico.
//
// Componentes principales:
// - Y.Doc: El documento compartido (la pizarrón mágico)
// - Y.Text: Texto colaborativo dentro del documento
// - Provider: Conecta tu documento con otros (WebSocket, WebRTC, etc.)
// - Awareness: Muestra quién está escribiendo dónde (cursores)

import { Injectable, OnDestroy, signal, WritableSignal } from '@angular/core';

// Observable: de RxJS para crear streams de datos
import { Observable, Subject, BehaviorSubject } from 'rxjs';

// Y: la librería Y.js para crear documentos CRDT
import * as Y from 'yjs';

// WebsocketProvider: conecta Y.js con un servidor WebSocket
// para sincronizar entre múltiples usuarios
import { WebsocketProvider } from 'y-websocket';

// IndexeddbPersistence: guarda el documento en IndexedDB (almacenamiento local)
// para que los cambios persistan incluso si el navegador se cierra
import { IndexeddbPersistence } from 'y-indexeddb';

// AwarenessState: la información que cada usuario comparte sobre sí mismo
// (posición del cursor, color, nombre, etc.)
interface AwarenessState {
  user: {
    name: string;
    color: string;
    colorLight: string;
  };
  cursor: {
    anchor: number;  // Posición de inicio de selección
    head: number;    // Posición de fin de selección (cabeza del cursor)
  } | null;
}

@Injectable({ providedIn: 'root' })
export class YjsService implements OnDestroy {
  // ============================================================
  // Propiedades principales
  // ============================================================

  // doc: El documento Y.js compartido entre todos los usuarios.
  // Es el corazón de todo: aquí se almacena el texto y los metadatos.
  private doc: Y.Doc;

  // text: El tipo Y.Text que representa el contenido del documento.
  // Es como una "cuerda mágica" que se sincroniza automáticamente.
  private text: Y.Text;

  // provider: Conecta nuestro documento con un servidor WebSocket.
  // Es como un "traductor" que convierte los cambios locales
  // en mensajes de red y viceversa.
  private provider: WebsocketProvider | null = null;

  // indexeddbProvider: Guarda el documento en IndexedDB.
  // Es como una "copia de seguridad" local que persiste
  // incluso si no hay conexión a internet.
  private indexeddbProvider: IndexeddbPersistence | null = null;

  // userId: ID único de este usuario.
  private userId: string;

  // userColor: Color asignado a este usuario para los cursores.
  private userColor: { name: string; color: string; colorLight: string };

  // ============================================================
  // Signals de Angular (para reactividad)
  // ============================================================

  // content: El contenido actual del documento como signal.
  // Se actualiza automáticamente cuando cambia el texto en Y.js.
  content: WritableSignal<string> = signal('');

  // connectedUsers: Lista de usuarios conectados.
  // Se actualiza cuando alguien se une o sale.
  connectedUsers: WritableSignal<Array<{ id: string; name: string; color: string }>> = signal([]);

  // isConnected: Estado de la conexión WebSocket.
  isConnected: WritableSignal<boolean> = signal(false);

  // Observables para suscripción (para CollabService)
  // isConnected$: stream del estado de conexión.
  isConnected$: Observable<boolean>;

  // connectedUsers$: stream de la lista de usuarios conectados.
  connectedUsers$: Observable<Array<{ id: string; name: string; color: string }>>;

  // Subjects internos para emitir eventos.
  private isConnectedSubject = new BehaviorSubject<boolean>(false);
  private connectedUsersSubject = new BehaviorSubject<Array<{ id: string; name: string; color: string }>>([]);

  constructor() {
    // Inicializar los observables.
    this.isConnected$ = this.isConnectedSubject.asObservable();
    this.connectedUsers$ = this.connectedUsersSubject.asObservable();

    // Genera un ID único para este usuario.
    // Es como un "nombre de usuario" temporal.
    this.userId = 'user-' + Math.random().toString(36).slice(2, 8);

    // Asigna un color aleatorio al usuario.
    // Cada usuario tiene un color diferente para su cursor.
    const colors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#ec4899', '#14b8a6', '#f97316'];
    const colorIndex = Math.floor(Math.random() * colors.length);
    this.userColor = {
      name: `User ${this.userId.slice(-4)}`,
      color: colors[colorIndex],
      colorLight: colors[colorIndex] + '40'  // Versión transparente para el fondo
    };

    // Crea el documento Y.js.
    // Es como crear una "pizarrón mágico" nuevo.
    this.doc = new Y.Doc();

    // Crea el tipo Y.Text dentro del documento.
    // Es como dibujar una "línea de texto" en la pizarrón.
    this.text = this.doc.getText('document');

    // Escucha cambios en el texto para actualizar el signal.
    // Cuando alguien escribe, el signal se actualiza automáticamente.
    this.text.observe(event => {
      // Actualiza el signal con el texto completo.
      this.content.set(this.text.toString());

      // Log para depuración (en producción, quitar esto).
      console.log('[Y.js] Text changed:', event.delta);
    });

    // Inicializa el signal con el contenido actual.
    this.content.set(this.text.toString());
  }

  // ============================================================
  // Métodos de conexión
  // ============================================================

  // connect: Conecta el documento a un servidor WebSocket.
  // Es como "conectar la pizarrón mágico a internet" para que
  // otros usuarios puedan ver y editar el mismo documento.
  //
  // Parámetros:
  // - serverUrl: URL del servidor WebSocket (ej: 'wss://mi-servidor.com')
  // - roomId: ID de la sala (ej: 'mi-sala')
  //
  // Ejemplo de uso:
  //   yjsService.connect('wss://yjs-server.com', 'room-123')
  connect(serverUrl: string, roomId: string) {
    console.log(`[Y.js] Connecting to ${serverUrl}, room: ${roomId}`);

    // Crea el provider WebSocket.
    // Es como abrir un "canal de comunicación" entre nuestro
    // documento y el servidor.
    this.provider = new WebsocketProvider(serverUrl, roomId, this.doc);

    // Maneja el estado de la conexión.
    this.provider.on('status', ({ status }: { status: string }) => {
      console.log(`[Y.js] Connection status: ${status}`);
      const isConnected = status === 'connected';
      this.isConnected.set(isConnected);
      this.isConnectedSubject.next(isConnected);
    });

    // Maneja cuando se conecta a la sala.
    this.provider.on('sync', (isSynced: boolean) => {
      console.log(`[Y.js] Synced: ${isSynced}`);
    });

    // Configura la información del usuario local (Awareness).
    // Awareness es como un "nombre tag" virtual que dice
    // quién eres y dónde está tu cursor.
    if (this.provider.awareness) {
      // Establece el estado inicial del usuario.
      this.provider.awareness.setLocalStateField('user', {
        name: this.userColor.name,
        color: this.userColor.color,
        colorLight: this.userColor.colorLight
      });

      // Escucha cambios en los estados de Awareness de todos los usuarios.
      // Cuando alguien mueve su cursor o se desconecta, se actualiza.
      this.provider.awareness.on('change', () => {
        this.updateConnectedUsers();
      });

      // Actualiza la lista de usuarios conectados inicial.
      this.updateConnectedUsers();
    }

    // Crea el provider IndexedDB para persistencia local.
    // Es como guardar una "copia de seguridad" del documento
    // en el disco duro del navegador.
    this.indexeddbProvider = new IndexeddbPersistence(roomId, this.doc);

    console.log('[Y.js] Providers created');
  }

  // updateConnectedUsers: Actualiza la lista de usuarios conectados.
  // Lee la información de Awareness de todos los usuarios.
  private updateConnectedUsers() {
    if (!this.provider?.awareness) return;

    const states = this.provider.awareness.getStates();
    const users: Array<{ id: string; name: string; color: string }> = [];

    states.forEach((state, clientId) => {
      // Solo incluye usuarios que tienen información de usuario.
      const userState = state as AwarenessState;
      if (userState?.user) {
        users.push({
          id: clientId.toString(),
          name: userState.user.name,
          color: userState.user.color
        });
      }
    });

    this.connectedUsers.set(users);
    this.connectedUsersSubject.next(users);
  }

  // ============================================================
  // Métodos de edición
  // ============================================================

  // insertText: Inserta texto en una posición específica.
  // Usa una "transacción" de Y.js para garantizar que la
  // operación sea atómica (todo o nada).
  //
  // Parámetros:
  // - position: Dónde insertar (índice en el texto)
  // - text: Qué insertar
  //
  // Ejemplo de uso:
  //   yjsService.insertText(5, 'Hello')
  insertText(position: number, text: string) {
    // Una transacción garantiza que la operación se complete
    // completamente o no se aplique nada. Es como una "caja fuerte"
    // que contiene todos los cambios de una vez.
    this.doc.transact(() => {
      this.text.insert(position, text);
    });
  }

  // deleteText: Elimina texto de una posición específica.
  // También usa transacción para mantener la consistencia.
  //
  // Parámetros:
  // - position: Dónde empezar a borrar
  // - length: Cuántos caracteres borrar
  //
  // Ejemplo de uso:
  //   yjsService.deleteText(5, 3) // Borra 3 caracteres desde la posición 5
  deleteText(position: number, length: number) {
    this.doc.transact(() => {
      this.text.delete(position, length);
    });
  }

  // ============================================================
  // Métodos de Awareness (Cursores y presencia)
  // ============================================================

  // updateCursor: Actualiza la posición del cursor local.
  // Esto le dice a otros usuarios dónde estás escribiendo.
  //
  // Parámetros:
  // - anchor: Posición de inicio de selección
  // - head: Posición de fin de selección (cabeza del cursor)
  //
  // Ejemplo de uso:
  //   yjsService.updateCursor(10, 10) // Cursor en posición 10
  //   yjsService.updateCursor(5, 15)  // Selección del 5 al 15
  updateCursor(anchor: number, head: number) {
    if (!this.provider?.awareness) return;

    // Actualiza el estado de Awareness del usuario local.
    // Awareness es como un "sistema de mensajería" que
    // notifica a otros usuarios sobre tu presencia.
    this.provider.awareness.setLocalStateField('cursor', {
      anchor,
      head
    });
  }

  // getRemoteCursors: Obtiene las posiciones de los cursores remotos.
  // Retorna un array con la información de cada usuario remoto.
  //
  // Ejemplo de uso:
  //   const cursors = yjsService.getRemoteCursors()
  //   console.log(cursors) // [{ id: '123', name: 'User abc', color: '#ef4444', cursor: {...} }]
  getRemoteCursors(): Array<{
    id: string;
    name: string;
    color: string;
    cursor: { anchor: number; head: number } | null;
  }> {
    if (!this.provider?.awareness) return [];

    const states = this.provider.awareness.getStates();
    const cursors: Array<{
      id: string;
      name: string;
      color: string;
      cursor: { anchor: number; head: number } | null;
    }> = [];

    states.forEach((state, clientId) => {
      const userState = state as AwarenessState;
      if (userState?.user && userState.cursor) {
        cursors.push({
          id: clientId.toString(),
          name: userState.user.name,
          color: userState.user.color,
          cursor: userState.cursor
        });
      }
    });

    return cursors;
  }

  // ============================================================
  // Métodos de utilidad
  // ============================================================

  // getDoc: Retorna el documento Y.js.
  // Útil si necesitas acceder directamente al CRDT.
  getDoc(): Y.Doc {
    return this.doc;
  }

  // getText: Retorna el tipo Y.Text del documento.
  // Útil para crear bindings con editores de texto como Quill.
  getText(): Y.Text {
    return this.text;
  }

  // getUserId: Retorna el ID del usuario local.
  getUserId(): string {
    return this.userId;
  }

  // getUserColor: Retorna el color asignado al usuario local.
  getUserColor(): { name: string; color: string; colorLight: string } {
    return this.userColor;
  }

  // ============================================================
  // Limpieza
  // ============================================================

  // destroy: Limpia todos los recursos.
  // Es como "apagar y desconectar" la pizarrón mágico.
  // SIEMPRE llama a destroy cuando el componente se destruye
  // para evitar memory leaks.
  destroy() {
    console.log('[Y.js] Destroying YjsService');

    // Desconecta el provider WebSocket.
    this.provider?.disconnect();
    this.provider?.destroy();

    // Cierra el provider IndexedDB.
    this.indexeddbProvider?.destroy();

    // Cierra el documento Y.js.
    this.doc.destroy();
  }

  ngOnDestroy() {
    this.destroy();
  }
}
