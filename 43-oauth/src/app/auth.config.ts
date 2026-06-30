/**
 * ARCHIVO: auth.config.ts - Configuración OAuth2/OIDC
 *
 * Este archivo contiene la configuración del proveedor de identidad.
 * Define qué proveedor usar, qué permisos solicitar y cómo manejar tokens.
 *
 * Analogía: Es como llenar un formulario de solicitud de empleo.
 * Indicas dónde trabajas (authority), qué puesto quieres (scope),
 * y a dónde enviar la respuesta (redirectUrl).
 */

// OpenIdConfiguration: Tipo que define la estructura de la configuración OIDC.
import { OpenIdConfiguration } from 'angular-auth-oidc-client';

/**
 * authConfig: Configuración del proveedor de identidad OIDC.
 *
 * Cada propiedad tiene un propósito específico en el flujo de autenticación.
 */
export const authConfig: OpenIdConfiguration = {
  /**
   * authority: URL del proveedor de identidad (Identity Provider).
   * Es el servidor que verificará las credenciales del usuario.
   *
   * En producción, esto sería algo como:
   * - https://accounts.google.com (para Google)
   * - https://login.microsoftonline.com/ (para Microsoft)
   * - https://auth0.com/ (para Auth0)
   */
  authority: 'https://placeholder-identity.example.com',

  /**
   * clientId: Identificador único de esta aplicación en el proveedor de identidad.
   * Se obtiene al registrar la aplicación en el proveedor.
   */
  clientId: 'angular-demo-client',

  /**
   * redirectUrl: URL a la que el proveedor redirigirá después del login exitoso.
   * window.location.origin obtiene la URL actual del navegador (ej: http://localhost:4200).
   */
  redirectUrl: window.location.origin,

  /**
   * postLogoutRedirectUri: URL a la que se redirige después de cerrar sesión.
   */
  postLogoutRedirectUri: window.location.origin,

  /**
   * scope: Permisos que solicita la aplicación.
   *
   * - openid: Permite usar OpenID Connect (identidad del usuario)
   * - profile: Acceso a datos del perfil (nombre, foto, etc.)
   * - email: Acceso al email del usuario
   * - offline_access: Permite obtener un refresh token para renovar tokens
   */
  scope: 'openid profile email offline_access',

  /**
   * responseType: Tipo de respuesta que espera la aplicación.
   * 'code' significa que el proveedor devolverá un código de autorización
   * que se intercambia por un token. Es más seguro que devolver el token directamente.
   */
  responseType: 'code',

  /**
   * silentRenew: Si es true, renueva automáticamente los tokens antes de que expiren.
   * Esto evita que el usuario tenga que volver a hacer login cuando el token expira.
   */
  silentRenew: true,

  /**
   * useRefreshToken: Si es true, usa refresh tokens para renovar tokens de acceso.
   * Los refresh tokens tienen mayor duración que los tokens de acceso.
   */
  useRefreshToken: true,

  /**
   * renewTimeBeforeTokenExpiresInSeconds: Cuántos segundos antes de la expiración
   * se debe renovar el token. 30 segundos es un valor conservador para evitar
   * que el token expire durante una petición en curso.
   */
  renewTimeBeforeTokenExpiresInSeconds: 30,
};
