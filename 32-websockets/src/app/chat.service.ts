/**
 * Servicio de Chat que maneja la conexión WebSocket.
 *
 * Un servicio Angular es una clase que encapsula lógica de negocio reutilizable.
 * Piensa en él como un asistente personal: hace el trabajo pesado (conexiones de red)
 * para que los componentes solo se preocupen por mostrar la interfaz.
 *
 * @Injectable({ providedIn: 'root' }) — Significa que Angular creará UNA SOLA instancia
 * de este servicio para toda la aplicación (patrón Singleton). Es como tener un solo
 * asistente que todos los componentes comparten.
 *
 * Analogía: Un servicio es como una central telefónica. Los componentes llaman
 * al servicio para enviar/recibir mensajes, y el servicio se encarga de la
 * conexión real con el servidor.
 */
import { Injectable, signal } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { retry, catchError, timeout, of } from 'rxjs';

/**
 * Interfaz que define la estructura de un mensaje de chat.
 * Es como un molde: todos los mensajes deben tener estas propiedades.
 */
export interface ChatMessage {
  user: string;    // Nombre del usuario que envió el mensaje
  text: string;    // Contenido del mensaje
  timestamp: Date; // Cuándo se envió el mensaje
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  /**
   * signal<ChatMessage[]>([]) — Una signal es un contenedor reactivo de datos.
   * Cuando su valor cambia, Angular actualiza automáticamente la pantalla.
   *
   * Es como un semáforo inteligente: cuando cambia de color (valor),
   * todos los conductores (componentes) se enteran inmediatamente.
   *
   * signal<T>(valor_inicial) — T es el tipo del dato que contiene.
   */
  readonly messages = signal<ChatMessage[]>([]);

  /**
   * Estado de la conexión WebSocket.
   * Solo puede tener uno de estos 3 valores: 'connected', 'disconnected', 'connecting'.
   * Es como la barra de estado de tu celular: muestra si tienes señal o no.
   */
  readonly connectionStatus = signal<'connected' | 'disconnected' | 'connecting'>('disconnected');

  /**
   * WebSocketSubject — Es un Observable de RxJS que representa la conexión WebSocket.
   * RxJS es una librería para manejar flujos de datos asíncronos (como ríos de datos).
   * El $ al final es una convención de nombrado para decir "esto es un Observable".
   */
  private socket$: WebSocketSubject<ChatMessage> | null = null;

  /**
   * Conecta al servidor WebSocket.
   *
   * @param url — Dirección del servidor WebSocket (ej: 'wss://echo.websocket.org')
   *
   * webSocket() crea un Subject que puede enviar y recibir mensajes.
   * Es como abrir una línea telefónica bidireccional.
   */
  connect(url: string): void {
    // Cambiamos el estado a "conectando" mientras se establece la conexión
    this.connectionStatus.set('connecting');

    // Creamos la conexión WebSocket con observers para eventos de apertura y cierre
    this.socket$ = webSocket<ChatMessage>({
      url,
      // openObserver se ejecuta cuando la conexión se abre exitosamente
      openObserver: { next: () => this.connectionStatus.set('connected') },
      // closeObserver se ejecuta cuando la conexión se cierra
      closeObserver: { next: () => this.connectionStatus.set('disconnected') },
    });

    /**
     * .pipe() encadena operadores de RxJS para transformar los datos.
     * Es como una cadena de producción: cada estación (operador) procesa el dato
     * y lo pasa al siguiente.
     *
     * Operadores aplicados:
     * - timeout(10000): Si no llega ningún dato en 10 segundos, lanza error
     * - retry: Si hay error, reintenta hasta 5 veces con 3 segundos de espera
     * - catchError: Si todos los reintentos fallan, devuelve null y marca desconectado
     */
    this.socket$
      .pipe(
        timeout(10000),
        retry({ count: 5, delay: 3000 }),
        catchError(() => {
          this.connectionStatus.set('disconnected');
          return of(null); // Devuelve un Observable que emite null
        }),
      )
      .subscribe((msg) => {
        // subscribe() activa el flujo de datos. Cada mensaje recibido llega aquí.
        if (msg) {
          // messages.update() actualiza el valor de la signal de forma inmutable
          // [..list, newMsg] crea un nuevo array con todos los mensajes anteriores + el nuevo
          this.messages.update((list) => [...list, { ...msg, timestamp: new Date() }]);
        }
      });
  }

  /**
   * Envía un mensaje al servidor WebSocket.
   *
   * .next() es el método de un Subject para emitir un nuevo valor.
   * Es como hablar por un teléfono: le envías datos al servidor.
   *
   * El spread operator (...msg) crea una copia del objeto y agrega el timestamp.
   */
  send(msg: { user: string; text: string }): void {
    if (this.socket$) {
      this.socket$.next({ ...msg, timestamp: new Date() });
    }
  }

  /**
   * Cierra la conexión WebSocket.
   * .complete() termina el Observable, como colgar un teléfono.
   * El ?. (optional chaining) verifica que socket$ no sea null antes de llamar.
   */
  disconnect(): void {
    this.socket$?.complete();
    this.socket$ = null;
    this.connectionStatus.set('disconnected');
  }
}
