/**
 * ARCHIVO: auth.service.ts - Servicio de autenticación OAuth2 con PKCE y Social Login
 *
 * Este servicio maneja la autenticación OAuth2 con PKCE utilizando
 * la librería angular-auth-oidc-client. Soporta login estándar y
 * login social a través de diferentes proveedores (Google, GitHub, Microsoft).
 *
 * OAuth2 con PKCE es el estándar recomendado para aplicaciones SPA (Single Page Apps).
 * A diferencia del flujo estándar Authorization Code, PKCE no requiere un
 * client_secret, lo que lo hace seguro para aplicaciones que ejecutan en el navegador.
 *
 * Analogía completa del flujo OAuth2 con PKCE:
 *
 * 1. PREPARACIÓN (antes del login):
 *    - La app genera un "code_verifier" (una cadena secreta aleatoria)
 *    - Calcula el "code_challenge" = SHA256(code_verifier)
 *    - Piensa en esto como crear un candado único (code_challenge)
 *      y guardar la llave (code_verifier) en tu bolsillo
 *
 * 2. REDIRECT AL PROVEEDOR:
 *    - La app redirige al usuario al proveedor de identidad
 *    - Envía el code_challenge en la petición
 *    - El proveedor muestra la página de login
 *
 * 3. AUTENTICACIÓN:
 *    - El usuario ingresa sus credenciales en el proveedor
 *    - El proveedor verifica las credenciales
 *    - Genera un código de autorización
 *
 * 4. CÓDIGO DE AUTORIZACIÓN:
 *    - El proveedor redirige de vuelta a la app con el código
 *    - La app ahora tiene el código Y el code_verifier (la llave)
 *
 * 5. CANJE DE TOKENS:
 *    - La app envía el código + code_verifier al proveedor
 *    - El proveedor calcula SHA256(code_verifier) y lo compara con el code_challenge
 *    - Si coinciden, retorna access_token + refresh_token + id_token
 *
 * 6. USO DEL TOKEN:
 *    - La app usa el access_token para acceder a APIs protegidas
 *    - Cuando expira, usa el refresh_token para obtener uno nuevo
 *    - El id_token contiene datos del usuario (nombre, email, etc.)
 */

// Injectable: Decorador de Angular que marca una clase como "servicio" inyectable.
// inject: Función para obtener servicios sin constructores.
// signal: Función para crear valores reactivos.
import { Injectable, inject, signal } from '@angular/core';

// OidcSecurityService: Servicio principal de la librería angular-auth-oidc-client.
// Proporciona métodos para login, logout, verificar autenticación, etc.
import { OidcSecurityService } from 'angular-auth-oidc-client';

// Importamos la configuración de proveedores sociales.
import { SocialProvider, SOCIAL_PROVIDERS } from './auth-providers.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /**
   * oidc: Referencia al servicio de seguridad OIDC.
   * OIDC (OpenID Connect) es una capa sobre OAuth2 que agrega identidad
   * (quién es el usuario) sobre autorización (qué puede hacer).
   *
   * OIDC extiende OAuth2 agregando:
   * - id_token: Token que contiene datos del usuario
   * - UserInfo endpoint: Endpoint para obtener más datos del usuario
   * - Claims: Datos del usuario (nombre, email, roles, etc.)
   */
  private readonly oidc = inject(OidcSecurityService);

  /**
   * isAuthenticated: Signal que indica si el usuario está autenticado.
   * true = sesión activa, false = no hay sesión.
   *
   * Los signals son la forma moderna de Angular de manejar estado reactivo.
   * Cuando cambia el valor, todos los componentes que lo usan se actualizan.
   */
  readonly isAuthenticated = signal(false);

  /**
   * userData: Signal con los datos del usuario autenticado.
   * Contiene información como nombre, email, foto, etc.
   * null si no hay usuario autenticado.
   */
  readonly userData = signal<Record<string, unknown> | null>(null);

  /**
   * providers: Lista de proveedores sociales disponibles.
   * Se usa para renderizar los botones de login social en el template.
   */
  readonly socialProviders = SOCIAL_PROVIDERS;

  /**
   * constructor: Se ejecuta una vez cuando se crea el servicio.
   * Aquí verificamos si el usuario ya tiene una sesión activa
   * y nos suscribimos a cambios en el estado de autenticación.
   *
   * checkAuth() es especialmente importante cuando la página se recarga:
   * el token puede seguir siendo válido aunque se haya recargado el navegador.
   * Esto evita que el usuario tenga que hacer login en cada recarga.
   */
  constructor() {
    /**
     * checkAuth(): Verifica si el usuario tiene una sesión válida.
     * Retorna un Observable con un objeto que contiene:
     * - isAuthenticated: boolean - si el usuario está autenticado
     * - userData: object - datos del usuario (del id_token)
     * - accessToken: string - token de acceso para APIs
     *
     * Este método también maneja el callback después del redirect:
     * cuando el proveedor redirige de vuelta a la app con el código,
     * checkAuth() lo detecta y canjea el código por tokens automáticamente.
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
   * login: Inicia el proceso de autenticación OAuth2 estándar.
   *
   * authorize(): Redirige al usuario al proveedor de identidad
   * para que ingrese sus credenciales. La app no maneja contraseñas directamente.
   *
   * Este método usa el flujo estándar con PKCE habilitado en auth.config.ts.
   * El usuario será redirigido a la página de login del proveedor.
   */
  login(): void {
    this.oidc.authorize();
  }

  /**
   * loginWithProvider: Inicia el proceso de autenticación con un proveedor social específico.
   *
   * Este método usa el parámetro `extraCustomParameters` de Auth0 para
   * especificar qué proveedor social usar. Auth0 redirige al proveedor
   * (Google, GitHub, etc.) después de autenticar con Auth0.
   *
   * @param providerId - ID del proveedor social (ej: 'google-oauth2', 'github')
   *
   * Flujo del login social con Auth0:
   * 1. La app llama a authorize() con connection=google-oauth2
   * 2. Auth0 redirige a Google para autenticar al usuario
   * 3. Google redirige de vuelta a Auth0 con el código
   * 4. Auth0 canjea el código por tokens
   * 5. Auth0 redirige de vuelta a la app con los tokens
   */
  loginWithProvider(providerId: string): void {
    /**
     * authorize(configId, authOptions) permite pasar parámetros
     * adicionales al proveedor de identidad mediante `customParams`.
     *
     * El parámetro `connection` le dice a Auth0 qué proveedor social usar.
     * Sin este parámetro, Auth0 muestra su propia página de login
     * con todos los proveedores configurados.
     */
    this.oidc.authorize(undefined, {
      customParams: {
        connection: providerId,
      },
    });
  }

  /**
   * logout: Cierra la sesión del usuario.
   *
   * logoff(): Limpia los tokens locales y redirige al usuario
   * a una página de cierre de sesión (configurable).
   *
   * Nota: En Auth0, el logout también cierra la sesión de Auth0.
   * Si el usuario tiene sesión activa en Auth0, será cerrada.
   * Esto es importante en dispositivos compartidos.
   */
  logout(): void {
    this.oidc.logoff().subscribe();
  }

  /**
   * getToken: Obtiene el token de acceso actual.
   *
   * El token de acceso (access_token) se usa para acceder a APIs protegidas.
   * Tiene una duración limitada (típicamente 1 hora) y debe renovarse
   * cuando expira.
   *
   * @returns Observable con el token de acceso
   *
   * Ejemplo de uso:
   * this.authService.getToken().subscribe(token => {
   *   const headers = { Authorization: `Bearer ${token}` };
   *   this.http.get('/api/data', { headers });
   * });
   */
  getToken() {
    return this.oidc.getAccessToken();
  }

  /**
   * getRefreshToken: Obtiene el refresh token actual.
   *
   * El refresh token se usa para obtener nuevos access tokens
   * sin que el usuario tenga que hacer login nuevamente.
   *
   * IMPORTANTE: Los refresh tokens deben almacenarse de forma segura.
   * En una SPA, se almacenan en memoria (no en localStorage) para
   * prevenir ataques XSS.
   *
   * @returns Observable con el refresh token
   */
  getRefreshToken() {
    return this.oidc.getRefreshToken();
  }

  /**
   * getUserData: Obtiene los datos completos del usuario.
   *
   * Los datos del usuario vienen del id_token y del UserInfo endpoint.
   * Incluyen: sub (ID único), name, email, picture, etc.
   *
   * @returns Observable con los datos del usuario
   */
  getUserData() {
    return this.oidc.getUserData();
  }
}
