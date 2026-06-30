// ============================================================================
// SERVICIO DE AUTENTICACIÓN (auth.service.ts)
// ============================================================================
// Este servicio maneja todo lo relacionado con el login/logout de usuarios.
// Guarda el estado de sesión usando signals y lo persiste en localStorage.

// Injectable: Para que Angular pueda inyectar este servicio
// signal: Para crear estado reactivo (cambia y notifica a los componentes)
// computed: Para crear valores derivados que se recalculan automáticamente
// effect: Para ejecutar código secundario cuando cambian las señales
import { Injectable, signal, computed, effect } from '@angular/core';

// Interfaz que define la forma del estado de autenticación
// Es como un "molde" que dice qué datos tiene un usuario logueado
export interface AuthState {
  email: string;
  name: string;
  token: string;  // Token simulado (en una app real sería un JWT)
}

// Clave para guardar/cargar datos del localStorage
const STORAGE_KEY = 'auth_user';

// @Injectable({ providedIn: 'root' }): Servicio singleton global
// Angular crea UNA sola instancia y la comparte con toda la app
@Injectable({ providedIn: 'root' })
export class AuthService {
  // signal<AuthState | null>: Estado del usuario.
  // null significa "no hay usuario logueado".
  // Es como una caja que puede estar vacía (null) o tener datos (AuthState).
  private state = signal<AuthState | null>(null);

  // computed: Valor derivado que se actualiza automáticamente.
  // isLoggedIn es true cuando state NO es null (hay usuario logueado)
  readonly isLoggedIn = computed(() => this.state() !== null);

  // currentUser: Retorna el objeto completo del usuario o null
  readonly currentUser = computed(() => this.state());

  // El constructor se ejecuta UNA VEZ al crear el servicio
  constructor() {
    // Cargar usuario guardado del localStorage al iniciar la app
    // ANÁLOGÍA: Al abrir la app, revisamos si el usuario ya había iniciado sesión antes
    this.loadFromStorage();

    // effect(): Se ejecuta cada vez que state() cambia.
    // Si hay usuario → lo guarda en localStorage
    // Si NO hay usuario → lo elimina del localStorage
    effect(() => {
      const user = this.state();
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    });
  }

  // login(): Intenta iniciar sesión con email y contraseña
  // Retorna true si tuvo éxito, false si falló
  login(email: string, password: string): boolean {
    if (!email || !password) return false;  // Validación básica

    // En una app real, aquí harías una petición HTTP al servidor.
    // En esta demo, simulamos el login creando un token simple.
    const name = email.split('@')[0];  // Extrae el nombre del email
    const token = btoa(`${email}:${Date.now()}`);  // Token simulado (base64)

    // Actualizamos el signal con los datos del usuario
    this.state.set({ email, name, token });
    return true;
  }

  // logout(): Cierra la sesión del usuario
  // Ponemos state en null, lo que hace que isLoggedIn sea false
  logout() {
    this.state.set(null);
  }

  // loadFromStorage(): Carga el usuario del localStorage si existe
  // Se ejecuta al iniciar la app para mantener la sesión
  loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        this.state.set(JSON.parse(stored));
      } catch {
        // Si los datos están corruptos, los eliminamos
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }
}
