// ============================================================
// collab.service.ts — Servicio de colaboración con Y.js
// ============================================================
// Este servicio reemplaza la implementación manual de WebRTC/WebSocket
// con el provider de Y.js.
//
// ANLOGÍA: Antes teníamos que construir nuestro propio "sistema de
// mensajería" desde cero (WebSocket + WebRTC + señalización).
// Ahora usamos el provider de Y.js, que ya es un sistema probado
// por miles de aplicaciones.
//
// Ventajas de usar Y.js provider:
// 1. No necesitamos manejar WebRTC manualmente
// 2. No necesitamos un servidor de señalización separado
// 3. La sincronización es automática y confiable
// 4. Ya maneja la reconexión automática
// 5. Ya tiene persistencia (IndexedDB) integrada

import { Injectable, signal, WritableSignal, OnDestroy } from '@angular/core';

// YjsService: el servicio central de Y.js
import { YjsService } from './yjs.service';

@Injectable({ providedIn: 'root' })
export class CollabService implements OnDestroy {
  // ============================================================
  // Propiedades
  // ============================================================

  // peers: lista de IDs de usuarios conectados a la misma sala.
  // Se actualiza automáticamente cuando alguien se une o sale.
  peers: WritableSignal<string[]> = signal([]);

  // connected: estado de la conexión.
  connected: WritableSignal<boolean> = signal(false);

  // roomId: ID de la sala actual.
  private roomId: string = '';

  constructor(private yjsService: YjsService) {
    // Suscribirse a los cambios de conexión de Y.js.
    this.setupConnectionSync();
  }

  // ============================================================
  // Métodos de conexión
  // ============================================================

  // setupConnectionSync: Configura la sincronización de conexión.
  // Cuando Y.js se conecta o desconecta, actualiza los signals.
  private setupConnectionSync() {
    // Observar el estado de conexión del servicio Y.js.
    // Y.js emite eventos de estado que podemos usar para
    // actualizar la UI.
    this.yjsService.isConnected$.subscribe(isConnected => {
      this.connected.set(isConnected);
    });

    // Observar la lista de usuarios conectados.
    // Y.js Awareness mantiene esta lista automáticamente.
    this.yjsService.connectedUsers$.subscribe(users => {
      this.peers.set(users.map(u => u.id));
    });
  }

  // connect: establece la conexión con el servidor Y.js.
  // Esta función reemplaza toda la lógica manual de WebRTC/WebSocket.
  //
  // Parámetros:
  // - serverUrl: URL del servidor WebSocket (ej: 'wss://yjs-server.com')
  // - roomId: ID de la sala (ej: 'mi-sala')
  // - userId: ID del usuario (para referencia, Y.js ya tiene su propio ID)
  //
  // Ejemplo de uso:
  //   collabService.connect('wss://yjs-server.com', 'room-123', 'user-abc')
  connect(serverUrl: string, roomId: string, userId: string) {
    console.log(`[Collab] Connecting to ${serverUrl}, room: ${roomId}`);

    // Guardar el roomId para referencia.
    this.roomId = roomId;

    // Conectar usando el servicio Y.js.
    // Esto crea el provider WebSocket y configura Awareness.
    this.yjsService.connect(serverUrl, roomId);

    console.log('[Collab] Connection initiated');
  }

  // disconnect: cierra la conexión y limpia los recursos.
  // Esta función reemplaza toda la lógica manual de limpieza.
  disconnect() {
    console.log('[Collab] Disconnecting');

    // Desconectar usando el servicio Y.js.
    this.yjsService.destroy();

    // Limpiar los signals.
    this.peers.set([]);
    this.connected.set(false);
  }

  // ============================================================
  // Métodos de utilidad
  // ============================================================

  // getRoomId: retorna el ID de la sala actual.
  getRoomId(): string {
    return this.roomId;
  }

  // isConnectedToRoom: verifica si estamos conectados a una sala.
  isConnectedToRoom(): boolean {
    return this.connected() && this.roomId !== '';
  }

  // ============================================================
  // Limpieza
  // ============================================================

  ngOnDestroy() {
    this.disconnect();
    console.log('[Collab] Destroyed');
  }
}
