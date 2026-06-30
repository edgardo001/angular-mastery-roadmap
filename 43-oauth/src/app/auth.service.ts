/**
 * ARCHIVO: auth.service.ts - Servicio de autenticación OAuth2
 *
 * Este servicio maneja la autenticación OAuth2 utilizando la librería
 * angular-auth-oidc-client. OAuth2 es un protocolo que permite a los
 * usuarios autenticarse usando cuentas de terceros (Google, Microsoft, etc.)
 * sin compartir sus contraseñas con la aplicación.
 *
 * Analogía: Es como usar tu llave de casa para entrar al edificio de un amigo.
 * No necesitas pedirle una llave nueva (contraseña) porque el portero (proveedor OAuth)
 * reconoce tu llave y te deja pasar.
 *
 * Flujo OAuth2 simplificado:
 * 1. El usuario hace clic en "Iniciar sesión con Google"
 * 2. La app redirige al usuario a Google
 * 3. El usuario ingresa sus credenciales en Google
 * 4. Google redirige de vuelta a la app con un código de autorización
 * 5. La app intercambia el código por un token de acceso
 * 6. La app usa el token para acceder a datos protegidos
 */

// Injectable: Decorador de Angular que marca una clase como "servicio" inyectable.
// inject: Función para obtener servicios sin constructores.
// signal: Función para crear valores reactivos.
import { Injectable, inject, signal } from '@angular/core';

// OidcSecurityService: Servicio principal de la librería angular-auth-oidc-client.
// Proporciona métodos para login, logout, verificar autenticación, etc.
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /**
   * oidc: Referencia al servicio de seguridad OIDC.
   * OIDC (OpenID Connect) es una capa sobre OAuth2 que agrega identidad
   * (quién es el usuario) sobre autorización (qué puede hacer).
   */
  private readonly oidc = inject(OidcSecurityService);

  /**
   * isAuthenticated: Signal que indica si el usuario está autenticado.
   * true = sesión activa, false = no hay sesión.
   */
  readonly isAuthenticated = signal(false);

  /**
   * userData: Signal con los datos del usuario autenticado.
   * Contiene información como nombre, email, foto, etc.
   * null si no hay usuario autenticado.
   */
  readonly userData = signal<Record<string, unknown> | null>(null);

  /**
   * constructor: Se ejecuta una vez cuando se crea el servicio.
   * Aquí verificamos si el usuario ya tiene una sesión activa
   * y nos suscribimos a cambios en el estado de autenticación.
   */
  constructor() {
    /**
     * checkAuth(): Verifica si el usuario tiene una sesión válida.
     * Esto es útil cuando la página se recarga: el token puede seguir
     * siendo válido aunque se haya recargado el navegador.
     */
    this.oidc.checkAuth().subscribe((loginResponse) => {
      this.isAuthenticated.set(loginResponse.isAuthenticated);
      this.userData.set(loginResponse.userData ?? null);
    });

    /**
     * isAuthenticated$: Observable que emite cuando cambia el estado
     * de autenticación. Nos suscribimos para mantener el signal actualizado.
     */
    this.oidc.isAuthenticated$.subscribe((result) =>
      this.isAuthenticated.set(result.isAuthenticated),
    );

    /**
     * userData$: Observable que emite cuando cambian los datos del usuario.
     * Nos suscribimos para mantener el signal actualizado.
     */
    this.oidc.userData$.subscribe((result) =>
      this.userData.set(result.userData ?? null),
    );
  }

  /**
   * login: Inicia el proceso de autenticación OAuth2.
   *
   * authorize(): Redirige al usuario al proveedor de identidad (Google, Microsoft, etc.)
   * para que ingrese sus credenciales. La app no maneja contraseñas directamente.
   */
  login(): void {
    this.oidc.authorize();
  }

  /**
   * logout: Cierra la sesión del usuario.
   *
   * logoff(): Limpia los tokens locales y redirige al usuario
   * a una página de cierre de sesión (configurable).
   */
  logout(): void {
    this.oidc.logoff().subscribe();
  }
}
