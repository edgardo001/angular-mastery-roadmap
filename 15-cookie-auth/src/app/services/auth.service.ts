// ============================================================================
// SERVICIO DE AUTENTICACIÓN POR COOKIES (auth.service.ts)
// ============================================================================
// Servicio que maneja login/logout usando cookies HttpOnly del servidor.
// A diferencia de JWT, el token NO se guarda en localStorage — viaja en cookies.

import { Injectable, signal } from '@angular/core';

// HttpClient: Para hacer peticiones HTTP al servidor
import { HttpClient } from '@angular/common/http';

// Observable: Tipo de dato asíncrono de RxJS
// tap: Operador para ejecutar código secundario sin modificar los datos
import { Observable, tap } from 'rxjs';

// Interfaz del usuario que viene del servidor
export interface User {
  id: number;
  email: string;
  name: string;
}

// @Injectable({ providedIn: 'root' }): Servicio singleton global
@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/auth';

  // Signals para manejar el estado de autenticación
  isLoggedIn = signal<boolean>(false);  // ¿Está autenticado?
  user = signal<User | null>(null);      // Datos del usuario

  constructor(private http: HttpClient) {}

  // login(): Envía credenciales al servidor.
  // Si son válidas, el servidor devuelve una cookie HttpOnly con el token.
  // La cookie NO es accesible desde JavaScript (más seguro que localStorage).
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((user) => {
        this.user.set(user);          // Guardar datos del usuario
        this.isLoggedIn.set(true);    // Marcar como autenticado
      }),
    );
  }

  // logout(): Le dice al servidor que destruya la sesión.
  // El servidor elimina la cookie HttpOnly.
  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.user.set(null);          // Limpiar datos del usuario
        this.isLoggedIn.set(false);   // Marcar como no autenticado
      }),
    );
  }

  // checkSession(): Verifica si hay una sesión activa.
  // Se ejecuta al iniciar la app para ver si el usuario ya tenía una cookie válida.
  checkSession(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/status`).pipe(
      tap((user) => {
        this.user.set(user);
        this.isLoggedIn.set(true);
      }),
    );
  }
}
