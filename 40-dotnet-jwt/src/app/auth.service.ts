/**
 * ARCHIVO: auth.service.ts - Servicio de autenticación JWT (.NET)
 *
 * Este servicio maneja todo lo relacionado con la autenticación del usuario:
 * login, registro, renovación de tokens y cierre de sesión.
 *
 * Un "servicio" en Angular es una clase que contiene lógica de negocio
 * reutilizable. Los componentes llaman a los servicios para hacer trabajo
 * "pesado" como llamadas HTTP, manejo de datos, etc.
 *
 * Analogía: El servicio de autenticación es como un conserje en un edificio.
 * Él verifica tu identidad (login), te da una llave (token), te renueva
 * la llave cuando expira (refresh), y te la quita cuando te vas (logout).
 */

// Injectable: Decorador de Angular que marca una clase como "servicio" que puede
// ser inyectada (suministrada) a otros componentes o servicios.
// providedIn: 'root' significa que hay una sola instancia de este servicio
// disponible en toda la aplicación (patrón Singleton).
import { Injectable, signal } from '@angular/core';

// HttpClient: Servicio de Angular para hacer peticiones HTTP al servidor.
import { HttpClient } from '@angular/common/http';

// Observable: Tipo de valor que representa un "stream" de datos en el tiempo.
// tap: Operador de RxJS que ejecuta un efecto secundario (como guardar un token)
// sin modificar el dato que fluye por el Observable.
import { Observable, tap } from 'rxjs';

/**
 * Interfaces: Definen la forma de los objetos que usamos.
 * Son como "moldes" que garantizan que los datos tengan la estructura correcta.
 */
// AuthResponse: Lo que el servidor responde después de login/register exitoso.
export interface AuthResponse {
  token: string;          // Token JWT de autenticación
  refreshToken?: string;  // Token opcional para renovar el JWT sin volver a hacer login
}

// LoginRequest: Datos que enviamos al servidor para iniciar sesión.
export interface LoginRequest {
  username: string;
  password: string;
}

// RegisterRequest: Datos que enviamos al servidor para crear una cuenta nueva.
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // URL base de la API de autenticación en el backend (.NET).
  private readonly api = '/api/auth';

  /**
   * Signals: Son la nueva forma de manejar estado reactivo en Angular.
   * Un signal es como una "caja" que contiene un valor. Cuando el valor
   * cambia, todos los componentes que "leen" esa caja se actualizan automáticamente.
   *
   * isAuthenticated: true si el usuario tiene sesión activa, false si no.
   * user: Nombre del usuario logueado, o null si no hay sesión.
   */
  isAuthenticated = signal(false);
  user = signal<string | null>(null);

  /**
   * Constructor: Se ejecuta una vez cuando se crea el servicio.
   * Aquí verificamos si el usuario ya tenía un token guardado
   * (por ejemplo, si recargó la página).
   */
  constructor(private http: HttpClient) {
    // !! convierte cualquier valor a boolean: "mi-token" → true, null → false.
    this.isAuthenticated.set(!!localStorage.getItem('token'));
  }

  /**
   * login: Envía las credenciales al servidor y guarda el token recibido.
   *
   * Flujo:
   * 1. Envía POST a /api/auth/login con username y password
   * 2. El servidor responde con un token JWT
   * 3. Guardamos el token en localStorage (persiste entre sesiones)
   * 4. Actualizamos los signals para que la UI se actualice
   */
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        if (res.refreshToken) localStorage.setItem('refreshToken', res.refreshToken);
        this.isAuthenticated.set(true);
        this.user.set(data.username);
      })
    );
  }

  /**
   * register: Crea una cuenta nueva y automáticamente inicia sesión.
   * Funciona igual que login pero usa el endpoint de registro.
   */
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/register`, data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        if (res.refreshToken) localStorage.setItem('refreshToken', res.refreshToken);
        this.isAuthenticated.set(true);
        this.user.set(data.username);
      })
    );
  }

  /**
   * refresh: Renueva el token JWT sin que el usuario tenga que volver a hacer login.
   *
   * Los tokens JWT tienen un tiempo de vida limitado (ej: 15 minutos).
   * Cuando están por expirar, enviamos el refreshToken al servidor
   * para obtener un nuevo token sin interrumpir al usuario.
   */
  refresh(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<AuthResponse>(`${this.api}/refresh`, { refreshToken }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        if (res.refreshToken) localStorage.setItem('refreshToken', res.refreshToken);
      })
    );
  }

  /**
   * logout: Cierra la sesión del usuario limpiando todos los datos de autenticación.
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.isAuthenticated.set(false);
    this.user.set(null);
  }
}
