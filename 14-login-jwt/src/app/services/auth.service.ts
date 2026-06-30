// ============================================================================
// SERVICIO DE AUTENTICACIÓN JWT (auth.service.ts)
// ============================================================================
// Servicio completo de autenticación con JWT: login, refresh tokens,
// persistencia en localStorage, y decodificación de tokens.

import { Injectable, signal, computed, effect } from '@angular/core';

// HttpClient: Para hacer peticiones HTTP al servidor
import { HttpClient } from '@angular/common/http';

// Router: Para navegar después del logout
import { Router } from '@angular/router';

// tap: Operador de RxJS para ejecutar código secundario
// throwError: Crea un Observable que lanza un error
import { tap, throwError } from 'rxjs';

// Interfaz del usuario que viene del servidor
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin';  // Solo dos roles posibles
}

// Estado interno del servicio: usuario + tokens
interface AuthState {
  user: User | null;
  accessToken: string | null;   // Token de acceso (corta duración)
  refreshToken: string | null;  // Token de refresco (larga duración)
}

// @Injectable({ providedIn: 'root' }): Servicio singleton global
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = '/api/auth';  // Base URL de la API de autenticación

  // signal<AuthState>: Estado reactivo del usuario autenticado
  private state = signal<AuthState>({ user: null, accessToken: null, refreshToken: null });

  // computed: Valores derivados que se actualizan automáticamente
  isLoggedIn = computed(() => this.state().accessToken !== null);  // ¿Hay token?
  isAdmin = computed(() => this.state().user?.role === 'admin');    // ¿Es admin?
  currentUser = computed(() => this.state().user);                  // Datos del usuario

  // El constructor se ejecuta UNA VEZ al crear el servicio
  constructor(
    // En Angular moderno se puede usar inject() en lugar de constructor params
    private http: HttpClient,
    private router: Router,
  ) {
    // Cargar sesión guardada del localStorage al iniciar
    const stored = localStorage.getItem('auth');
    if (stored) {
      try { this.state.set(JSON.parse(stored)); } catch { /* ignore */ }
    }

    // effect(): Guarda la sesión en localStorage cada vez que cambia
    // Si hay token → guardar. Si NO hay token → eliminar.
    effect(() => {
      const s = this.state();
      if (s.accessToken) {
        localStorage.setItem('auth', JSON.stringify(s));
      } else {
        localStorage.removeItem('auth');
      }
    });
  }

  // Obtener el token de acceso actual (lo usa el interceptor auth)
  getAccessToken(): string | null {
    return this.state().accessToken;
  }

  // decodeToken(): Decodifica un JWT y retorna su payload (datos)
  // Un JWT tiene 3 partes separadas por puntos: header.payload.signature
  // Nosotros solo necesitamos el payload (la segunda parte)
  decodeToken(token: string): Record<string, unknown> | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      // atob(): Decodifica base64. JSON.parse(): Convierte string a objeto
      return JSON.parse(atob(parts[1]));
    } catch {
      return null;
    }
  }

  // login(): Envía credenciales al servidor y guarda los tokens
  // Retorna un Observable que el componente subscribe para manejar la respuesta
  login(email: string, password: string) {
    return this.http.post<AuthState>(`${this.API}/login`, { email, password }).pipe(
      // tap: Guarda los datos en el signal ANTES de que el componente reciba la respuesta
      tap(res => this.state.set(res)),
    );
  }

  // refreshTokens(): Usa el refresh token para obtener un nuevo access token
  // Se ejecuta cuando el access token expira (error 401)
  refreshTokens() {
    const token = this.state().refreshToken;
    if (!token) return throwError(() => new Error('No refresh token'));
    return this.http.post<{ accessToken: string; refreshToken: string }>(
      `${this.API}/refresh`,
      { refreshToken: token },
    ).pipe(
      // Actualiza solo los tokens, mantiene los datos del usuario
      tap(res => {
        this.state.update(s => ({ ...s, ...res }));
      }),
    );
  }

  // logout(): Limpia el estado y redirige a login
  logout() {
    this.state.set({ user: null, accessToken: null, refreshToken: null });
    this.router.navigate(['/login']);
  }
}
