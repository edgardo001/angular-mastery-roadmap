/**
 * ARCHIVO: app.ts - Componente raíz de la aplicación OAuth con PKCE y Social Login
 *
 * Este componente muestra un panel completo de autenticación con:
 * - Botón de login estándar (Authorization Code + PKCE)
 * - Botones de login social (Google, GitHub, Microsoft)
 * - Botón de logout
 * - Información del usuario autenticado
 *
 * PKCE (Proof Key for Code Exchange) es la extensión de OAuth2 que hace
 * seguro el flujo Authorization Code para aplicaciones SPA.
 *
 * Analogía del componente:
 * Es como la recepción de un edificio con múltiples entradas:
 * - Entrada principal (login estándar): Usa tu llave personal (credenciales)
 * - Entrada lateral con validador (login social): Usa la llave de otro edificio
 *   (Google, GitHub) que el validador (Auth0) reconoce y acepta
 *
 * PKCE es como un candado especial en cada entrada:
 * Solo puedes abrirlo si tienes la llave (code_verifier) que creaste.
 */

// Component: Decorador de Angular que define las propiedades de un componente.
// inject: Función para obtener servicios sin constructores.
import { Component, inject } from '@angular/core';

// JsonPipe: Pipe de Angular que convierte objetos a formato JSON legible.
// Se usa en el template como {{ userData | json }} para mostrar datos del usuario.
import { JsonPipe } from '@angular/common';

// Importamos el servicio de autenticación.
import { AuthService } from './auth.service';

// Importamos el tipo SocialProvider para tipar los botones sociales.
import { SocialProvider } from './auth-providers.config';

@Component({
  selector: 'app-root',
  // imports: Lista de pipes/componentes/directivas que este componente usa en su template.
  imports: [JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  /**
   * auth: Referencia al servicio de autenticación.
   * Permite acceder al estado de autenticación y ejecutar login/logout.
   *
   * El servicio AuthService encapsula toda la lógica de autenticación:
   * - Verificar sesión activa (checkAuth)
   * - Login estándar (authorize)
   * - Login social (authorize con connection parameter)
   * - Logout (logoff)
   * - Obtener datos del usuario (getUserData)
   */
  readonly auth = inject(AuthService);

  /**
   * login: Inicia el proceso de autenticación OAuth2 estándar con PKCE.
   *
   * Cuando el usuario hace clic en este botón:
   * 1. La app genera un code_verifier aleatorio
   * 2. Calcula el code_challenge = SHA256(code_verifier)
   * 3. Redirige al proveedor de identidad con el code_challenge
   * 4. El usuario ingresa sus credenciales en el proveedor
   * 5. El proveedor redirige de vuelta con un código de autorización
   * 6. La app canjea el código + code_verifier por tokens
   *
   * Todo esto ocurre automáticamente gracias a angular-auth-oidc-client.
   */
  login(): void {
    this.auth.login();
  }

  /**
   * loginWithSocial: Inicia el proceso de autenticación con un proveedor social.
   *
   * Cada botón social llama a este método con el ID del proveedor correspondiente.
   * El servicio AuthService agrega el parámetro `connection` a la petición
   * para que Auth0 sepa a qué proveedor social redirigir.
   *
   * @param providerId - ID del proveedor social (ej: 'google-oauth2', 'github')
   *
   * Ejemplo: Si el usuario hace clic en "Google", se llama:
   * this.auth.loginWithProvider('google-oauth2')
   *
   * Esto le dice a Auth0: "Quiero autenticar al usuario con Google"
   */
  loginWithSocial(provider: SocialProvider): void {
    this.auth.loginWithProvider(provider.id);
  }

  /**
   * logout: Cierra la sesión del usuario.
   *
   * Limpia los tokens locales y redirige a la página de cierre de sesión.
   * En Auth0, esto también cierra la sesión de Auth0, lo que es importante
   * en dispositivos compartidos para que el siguiente usuario no pueda
   * acceder a la sesión anterior.
   */
  logout(): void {
    this.auth.logout();
  }
}
