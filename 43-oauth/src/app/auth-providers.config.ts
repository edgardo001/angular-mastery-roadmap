/**
 * ARCHIVO: auth-providers.config.ts - Configuración de proveedores sociales
 *
 * Este archivo documenta cómo configurar diferentes proveedores de login social
 * (Google, GitHub, Microsoft) a través de Auth0.
 *
 * ¿Qué es el Login Social?
 * El login social permite a los usuarios autenticarse usando cuentas que ya tienen
 * (Google, GitHub, Microsoft) en lugar de crear credenciales nuevas.
 *
 * Flujo del Login Social:
 * 1. El usuario hace clic en "Iniciar sesión con Google"
 * 2. La app redirige a Auth0 con el parámetro `connection=google`
 * 3. Auth0 redirige a Google para autenticar al usuario
 * 4. Google redirige de vuelta a Auth0 con el código de autorización
 * 5. Auth0 canjea el código por tokens (id_token, access_token)
 * 6. Auth0 redirige de vuelta a tu app con los tokens
 *
 * Analogía del Login Social:
 * Es como un validador de entradas en un event venue. En lugar de crear
 * tu propia boleta (registro), el venue acepta boletas de otros eventos
 * (Google, GitHub). El validador (Auth0) verifica que la boleta sea válida
 * y te da un brazalete (token) para acceder.
 *
 * CONFIGURACIÓN EN AUTH0:
 *
 * Para habilitar cada proveedor social en Auth0:
 * 1. Ve a Auth0 Dashboard > Authentication > Social
 * 2. Activa el proveedor que quieras (Google, GitHub, etc.)
 * 3. Sigue las instrucciones para crear credenciales en cada proveedor
 * 4. Auth0 te dará las instrucciones específicas para cada proveedor
 *
 * Para Google:
 * 1. Ve a https://console.cloud.google.com
 * 2. Crea un proyecto o selecciona uno existente
 * 3. Habilita "Google+ API" o "Google Identity Platform"
 * 4. Crea credenciales OAuth 2.0 Client ID
 * 5. Autoriza tu dominio de Auth0 como "Authorized redirect URI"
 * 6. Copia el Client ID y Client Secret en Auth0
 *
 * Para GitHub:
 * 1. Ve a https://github.com/settings/developers
 * 2. Crea una nueva OAuth App
 * 3. En "Authorization callback URL" agrega:
 *    https://YOUR_DOMAIN.auth0.com/login/callback
 * 4. Copia el Client ID y Client Secret en Auth0
 *
 * Para Microsoft (Azure AD):
 * 1. Ve a https://portal.azure.com
 * 2. Crea una "App Registration"
 * 3. Configura redirect URIs con tu callback de Auth0
 * 4. Copia el Application (client) ID en Auth0
 */

/**
 * SocialProvider: Estructura de configuración de un proveedor social.
 *
 * Cada proveedor tiene:
 * - id: Identificador único que Auth0 usa para conectar con el proveedor
 * - name: Nombre para mostrar en la interfaz
 * - icon: Clase CSS del ícono (usa clases de Bootstrap Icons o similar)
 * - color: Color de fondo del botón (para consistencia de marca)
 * - description: Explicación del proveedor para el usuario
 */
export interface SocialProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

/**
 * SOCIAL_PROVIDERS: Lista de proveedores sociales disponibles.
 *
 * El id de cada proveedor debe coincidir exactamente con el nombre
 * configurado en Auth0 Dashboard > Authentication > Social.
 *
 * Ejemplo: Si en Auth0 configuraste Google con el nombre "google-oauth2",
 * aquí debes usar "google-oauth2" como id.
 */
export const SOCIAL_PROVIDERS: SocialProvider[] = [
  {
    id: 'google-oauth2',
    name: 'Google',
    icon: 'icon-google',
    color: '#4285F4',
    description: 'Usa tu cuenta de Google',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'icon-github',
    color: '#333333',
    description: 'Usa tu cuenta de GitHub',
  },
  {
    id: 'windowslive',
    name: 'Microsoft',
    icon: 'icon-microsoft',
    color: '#00A4EF',
    description: 'Usa tu cuenta de Microsoft',
  },
];

/**
 * AUTH0_CONNECTION_MAP: Mapeo de IDs de proveedores a connection names de Auth0.
 *
 * Auth0 usa "connections" para identificar cada proveedor social.
 * El id del SocialProvider se usa para construir la URL de conexión.
 *
 * Ejemplo de URL que genera Auth0:
 * https://YOUR_DOMAIN.auth0.com/authorize?
 *   client_id=YOUR_CLIENT_ID&
 *   redirect_uri=http://localhost:4200&
 *   response_type=code&
 *   scope=openid profile email&
 *   connection=google-oauth2  ← Este es el connection name
 */
export const AUTH0_CONNECTION_MAP: Record<string, string> = {
  'google-oauth2': 'google-oauth2',
  github: 'github',
  windowslive: 'windowslive',
};

/**
 * HOW_TO_CONFIGURE: Instrucciones paso a paso para configurar cada proveedor.
 *
 * Este objeto documenta el proceso de configuración para referencia educativa.
 * Cada paso incluye la URL donde realizar la acción y qué configurar.
 */
export const HOW_TO_CONFIGURE = {
  'google-oauth2': {
    steps: [
      'Ve a https://console.cloud.google.com',
      'Selecciona o crea un proyecto',
      'Habilita "Google Identity Platform" en APIs & Services',
      'Ve a APIs & Services > Credentials',
      'Crea OAuth 2.0 Client ID (Application type: Web application)',
      'En Authorized redirect URIs agrega: https://YOUR_DOMAIN.auth0.com/login/callback',
      'Copia el Client ID y Client Secret',
      'En Auth0 Dashboard > Authentication > Social > Google, pega las credenciales',
    ],
    auth0CallbackUrl: 'https://YOUR_DOMAIN.auth0.com/login/callback',
  },
  github: {
    steps: [
      'Ve a https://github.com/settings/developers',
      'Crea una nueva OAuth App',
      'En Authorization callback URL agrega: https://YOUR_DOMAIN.auth0.com/login/callback',
      'Copia el Client ID y Client Secret',
      'En Auth0 Dashboard > Authentication > Social > GitHub, pega las credenciales',
    ],
    auth0CallbackUrl: 'https://YOUR_DOMAIN.auth0.com/login/callback',
  },
  windowslive: {
    steps: [
      'Ve a https://portal.azure.com',
      'Crea una "App Registration" en Microsoft Entra ID',
      'Configura redirect URIs con: https://YOUR_DOMAIN.auth0.com/login/callback',
      'Copia el Application (client) ID',
      'Crea un Client Secret en Certificates & secrets',
      'En Auth0 Dashboard > Authentication > Social > Microsoft, pega las credenciales',
    ],
    auth0CallbackUrl: 'https://YOUR_DOMAIN.auth0.com/login/callback',
  },
};
