/**
 * SERVICIO DE AUTENTICACIÓN (AuthService)
 * =========================================
 *
 * Gestiona el estado de autenticación del usuario.
 * Controla si el usuario está logueado o no.
 *
 * ANÁLOGÍA: Es como un guardia de seguridad:
 * - login(): Deja pasar al usuario
 * - logout(): Saca al usuario
 * - isLoggedIn(): Verifica si el usuario está dentro
 *
 * PALABRAS CLAVE:
 * - signal(): Variable reactiva que Angular vigila
 * - asReadonly(): Convierte la signal en solo lectura desde fuera
 * - .set(): Actualiza el valor de la signal
 *
 * PATRÓN DE SEGURIDAD:
 * - _isLoggedIn: Signal privada (solo modificable internamente)
 * - isLoggedIn: Signal pública solo lectura (los componentes solo leen)
 * - Esto evita que componentes modifiquen el estado directamente
 */

// Injectable, signal: Herramientas de Angular
import { Injectable, signal } from '@angular/core';

// providedIn: 'root': Singleton global
@Injectable({ providedIn: 'root' })
export class AuthService {
  // Signal privada que almacena el estado de autenticación
  // Los componentes NO pueden modificarla directamente
  private readonly _isLoggedIn = signal(false);

  // Signal pública solo lectura
  // Los componentes pueden LEER pero no ESCRIBIR
  // Es como un semáforo: puedes ver si está rojo o verde, pero no puedes cambiarlo
  readonly isLoggedIn = this._isLoggedIn.asReadonly();

  // login(): Marca al usuario como autenticado
  // Es como darle la "llave" al usuario para que entre
  login(): void {
    this._isLoggedIn.set(true);
  }

  // logout(): Marca al usuario como no autenticado
  // Es como quitarle la "llave" al usuario
  logout(): void {
    this._isLoggedIn.set(false);
  }
}
