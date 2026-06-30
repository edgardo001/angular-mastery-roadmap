import { Injectable, inject } from '@angular/core';
import { SwPush } from '@angular/service-worker';

/**
 * Servicio para gestionar notificaciones push
 *
 * Las notificaciones push permiten enviar mensajes al usuario
 * incluso cuando no está en la app (como notificaciones del celular).
 *
 * Requiere:
 * 1. VAPID keys (identificación del servidor)
 * 2. Service Worker registrado
 * 3. Permisos del usuario
 *
 * Analogía: Es como suscribirse a un canal de YouTube.
 * El usuario se suscribe (da permiso), y el servidor puede
 * enviar notificaciones cuando quiera.
 */
@Injectable({ providedIn: 'root' })
export class PushNotificationService {
  private swPush = inject(SwPush);

  /**
   * VAPID keys generadas para este ejemplo
   *
   * En producción, genera tus propias keys con:
   * npx web-push generate-vapid-keys
   *
   * La PRIVATE key va en el servidor.
   * La PUBLIC key va en el cliente (aquí).
   */
  readonly VAPID_PUBLIC_KEY = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SqlMeA6W8qKZ1FxU3FhCztKMQBOZz1mFvJrFvEJGW7VRDq9a-2pM';

  /**
   * Verifica si las notificaciones push son soportadas
   */
  isPushSupported(): boolean {
    return this.swPush.isEnabled;
  }

  /**
   * Solicita permiso al usuario para notificaciones
   */
  async requestPermission(): Promise<boolean> {
    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch {
      return false;
    }
  }

  /**
   * Se suscribe a notificaciones push
   */
  async subscribeToPush(): Promise<PushSubscription | null> {
    try {
      const subscription = await this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      });
      console.log('Push subscription:', subscription);
      return subscription;
    } catch (error) {
      console.error('Failed to subscribe to push:', error);
      return null;
    }
  }

  /**
   * Envía una notificación de prueba local
   * (Para testing, en producción viene del servidor)
   */
  async sendTestNotification() {
    if (Notification.permission === 'granted') {
      new Notification('PWA Notes', {
        body: 'Tu nota ha sido guardada offline!',
        icon: '/assets/icons/icon-192x192.png',
      });
    }
  }

  /**
   * Escucha notificaciones push que llegan del servidor
   */
  listenToPush() {
    this.swPush.messages.subscribe((message) => {
      console.log('Push message received:', message);
      // Aquí procesarías la notificación
    });
  }
}
