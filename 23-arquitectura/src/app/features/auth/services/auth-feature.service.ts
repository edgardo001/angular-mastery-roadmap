/**
 * SERVICIO DE AUTENTICACIÓN POR FEATURE (AuthFeatureService)
 * ============================================================
 *
 * Gestiona el estado del usuario autenticado.
 * Se diferencia de AuthService porque maneja datos del usuario,
 * no solo el estado de login.
 *
 * ANÁLOGÍA: Es como una "tarjeta de identificación":
 * - setUser(): Guarda los datos del usuario
 * - clearUser(): Borra los datos del usuario
 * - user(): Muestra los datos del usuario
 *
 * PALABRAS CLAVE:
 * - signal(): Variable reactiva que Angular vigila
 * - asReadonly(): Signal solo lectura desde fuera
 * - .set(): Actualiza el valor de la signal
 * - { name: string; email: string } | null: Tipo unión - puede ser objeto o null
 *
 * DIFERENCIA ENTRE AuthService Y AuthFeatureService:
 * - AuthService: Maneja SI el usuario está logueado (boolean)
 * - AuthFeatureService: Maneja QUIÉN es el usuario (datos)
 */

// Injectable, signal: Herramientas de Angular
import { Injectable, signal } from '@angular/core';

// providedIn: 'root': Singleton global
@Injectable({ providedIn: 'root' })
export class AuthFeatureService {
  // Signal privada con los datos del usuario
  // Puede ser un objeto { name, email } o null (si no hay usuario)
  private readonly _user = signal<{ name: string; email: string } | null>(null);

  // Signal pública solo lectura
  readonly user = this._user.asReadonly();

  // setUser(): Guarda los datos del usuario
  setUser(user: { name: string; email: string }): void {
    this._user.set(user);
  }

  // clearUser(): Borra los datos del usuario (cierra sesión)
  clearUser(): void {
    this._user.set(null);
  }
}
