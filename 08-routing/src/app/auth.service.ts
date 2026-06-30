/**
 * Servicio de autenticación simple para demostración de guards.
 *
 * ANLOGÍA: Es como un guardia de seguridad que lleva una lista
 * de quiénes están autorizados y qué nivel de acceso tienen.
 *
 * En una app real, aquí iría la lógica de JWT, tokens, etc.
 */

import { Injectable, signal } from '@angular/core';

/**
 * @Injectable({ providedIn: 'root' }) significa que Angular crea
 * UNA SOLA INSTANCIA de este servicio para toda la aplicación (singleton).
 *
 * Es como un "libro de registro" compartido por todos los componentes.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Signal que indica si el usuario está logueado */
  readonly isLoggedIn = signal(false);

  /** Signal que indica el rol del usuario ('user' o 'admin') */
  readonly role = signal<'user' | 'admin'>('user');

  /**
   * Simula un login: activa isLoggedIn y establece el rol.
   * En una app real, aquí harías una petición HTTP al backend.
   */
  login(role: 'user' | 'admin' = 'user') {
    this.isLoggedIn.set(true);
    this.role.set(role);
  }

  /**
   * Simula un logout: desactiva isLoggedIn y resetea el rol.
   */
  logout() {
    this.isLoggedIn.set(false);
    this.role.set('user');
  }
}
