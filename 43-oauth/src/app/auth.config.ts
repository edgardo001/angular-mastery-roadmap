/**
 * ARCHIVO: auth.config.ts - Configuración OAuth2/OIDC con PKCE
 *
 * Este archivo contiene la configuración del proveedor de identidad.
 * Define qué proveedor usar, qué permisos solicitar y cómo manejar tokens.
 *
 * **PKCE (Proof Key for Code Exchange)** es una extensión de OAuth2 que
 * protege el flujo de autorización en aplicaciones públicas (SPAs, apps móviles).
 *
 * ¿Por qué PKCE? En el flujo Authorization Code estándar, un atacante podría
 * interceptar el código de autorización y canjearlo por tokens. PKCE agrega
 * un "verificador" que solo la app original conoce, haciendo imposible el canje
 * para quien interceptó el código.
 *
 * Analogía PKCE: Es como enviar una carta con un candado especial.
 * Solo tú tienes la llave (code_verifier) para abrir el candado (code_challenge).
 * Si alguien intercepta la carta, no puede abrirla sin tu llave.
 */

// OpenIdConfiguration: Tipo que define la estructura de la configuración OIDC.
import { OpenIdConfiguration } from 'angular-auth-oidc-client';

/**
 * authConfig: Configuración del proveedor de identidad OIDC con PKCE habilitado.
 *
 * Esta configuración usa Auth0 como Identity Provider (IdP). Auth0 es un servicio
 * que maneja autenticación y autorización para aplicaciones.
 *
 * Para usar este ejemplo:
 * 1. Crea una cuenta gratuita en https://auth0.com
 * 2. Crea una "Application" tipo "Single Page Application"
 * 3. Copia tu "Domain" y "Client ID" aquí abajo
 * 4. En Auth0 > Application > Settings > Allowed Callback URLs, agrega:
 *    http://localhost:4200
 * 5. En Allowed Logout URLs agrega: http://localhost:4200
 * 6. En Allowed Web Origins agrega: http://localhost:4200
 */
export const authConfig: OpenIdConfiguration = {
  /**
   * authority: URL del proveedor de identidad (Identity Provider).
   * Reemplaza 'YOUR_AUTH0_DOMAIN' con tu dominio de Auth0.
   *
   * Ejemplos de authority:
   * - Auth0: https://YOUR_DOMAIN.auth0.com
   * - Google: https://accounts.google.com
   * - Microsoft: https://login.microsoftonline.com/TENANT_ID
   * - Okta: https://YOUR_OKTA_DOMAIN.okta.com
   */
  authority: 'https://YOUR_AUTH0_DOMAIN.auth0.com',

  /**
   * clientId: Identificador único de esta aplicación en el proveedor de identidad.
   * Se obtiene al registrar la aplicación en el proveedor (Auth0 dashboard).
   */
  clientId: 'YOUR_AUTH0_CLIENT_ID',

  /**
   * redirectUrl: URL a la que el proveedor redirigirá después del login exitoso.
   * window.location.origin obtiene la URL actual del navegador (ej: http://localhost:4200).
   *
   * IMPORTANTE: Esta URL debe estar configurada como "Allowed Callback URL"
   * en tu proveedor de identidad (Auth0, Google, etc.).
   */
  redirectUrl: window.location.origin,

  /**
   * postLogoutRedirectUri: URL a la que se redirige después de cerrar sesión.
   * Debe estar configurada como "Allowed Logout URL" en el proveedor.
   */
  postLogoutRedirectUri: window.location.origin,

  /**
   * scope: Permisos que solicita la aplicación.
   *
   * - openid: Permite usar OpenID Connect (identidad del usuario)
   * - profile: Acceso a datos del perfil (nombre, foto, etc.)
   * - email: Acceso al email del usuario
   * - offline_access: Permite obtener un refresh token para renovar tokens
   *
   * Nota: Auth0 requiere habilitar "Offline Access" en Dashboard > APIs > Offline Access
   */
  scope: 'openid profile email offline_access',

  /**
   * responseType: Tipo de respuesta que espera la aplicación.
   * 'code' significa que el proveedor devolverá un código de autorización
   * que se intercambia por un token. Es más seguro que devolver el token directamente.
   *
   * Para PKCE, el responseType DEBE ser 'code'. El flujo funciona así:
   * 1. App genera un code_verifier (cadena aleatoria)
   * 2. App calcula code_challenge = SHA256(code_verifier)
   * 3. App envía code_challenge al proveedor en la petición de autorización
   * 4. Proveedor retorna un código de autorización
   * 5. App envía código + code_verifier al proveedor para canjear tokens
   * 6. Proveedor verifica que SHA256(code_verifier) == code_challenge original
   */
  responseType: 'code',

  /**
   * disablePkce: Controla PKCE (Proof Key for Code Exchange).
   *
   * PKCE está HABILITADO POR DEFECTO en angular-auth-oidc-client v19.
   * No necesitas configurar `usePKCE: true` ni `codeChallengeMethod`.
   *
   * La librería automáticamente:
   * 1. Genera un code_verifier aleatorio (43-128 caracteres)
   * 2. Calcula el code_challenge usando SHA-256
   * 3. Envía el code_challenge en la petición de autorización
   * 4. Almacena el code_verifier para el intercambio de tokens
   * 5. Envía el code_verifier en el token request
   *
   * Esto protege contra ataques de intercepción en flujos Authorization Code.
   *
   * Analogía PKCE: Es como enviar un paquete con un candado único.
   * El destinatario solo puede abrirlo si tiene la llave (code_verifier).
   *
   * Para deshabilitar PKCE (NO recomendado), establece:
   * disablePkce: true
   */
  disablePkce: false,

  /**
   * silentRenew: Si es true, renueva automáticamente los tokens antes de que expiren.
   * Esto evita que el usuario tenga que volver a hacer login cuando el token expira.
   *
   * La renovación silenciosa usa un iframe oculto que carga la página de autorización
   * del proveedor. Si el usuario sigue autenticado, el proveedor retorna un nuevo token.
   */
  silentRenew: true,

  /**
   * useRefreshToken: Si es true, usa refresh tokens para renovar tokens de acceso.
   * Los refresh tokens tienen mayor duración que los tokens de acceso.
   *
   * Un refresh token es como un pase de temporada: mientras lo tengas,
   * puedes obtener tokens de acceso nuevos sin volver a autenticarte.
   */
  useRefreshToken: true,

  /**
   * renewTimeBeforeTokenExpiresInSeconds: Cuántos segundos antes de la expiración
   * se debe renovar el token. 30 segundos es un valor conservador para evitar
   * que el token expire durante una petición en curso.
   */
  renewTimeBeforeTokenExpiresInSeconds: 30,
};
