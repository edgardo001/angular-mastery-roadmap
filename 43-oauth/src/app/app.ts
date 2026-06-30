/**
 * ARCHIVO: app.ts - Componente raíz de la aplicación OAuth
 *
 * Este componente muestra un panel simple de autenticación con:
 * - Botón de login (iniciar sesión con el proveedor OAuth)
 * - Botón de logout (cerrar sesión)
 * - Información del usuario autenticado (si está logueado)
 *
 * Analogía: Es como la puerta principal de un edificio. Tiene un botón
 * para entrar (login) y uno para salir (logout). Cuando entras, el sistema
 * te muestra tu identificación (datos del usuario).
 */

// Component: Decorador de Angular que define las propiedades de un componente.
// inject: Función para obtener servicios sin constructores.
import { Component, inject } from '@angular/core';

// JsonPipe: Pipe de Angular que convierte objetos a formato JSON legible.
// Se usa en el template como {{ userData | json }} para mostrar datos del usuario.
import { JsonPipe } from '@angular/common';

// Importamos el servicio de autenticación.
import { AuthService } from './auth.service';

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
   */
  readonly auth = inject(AuthService);

  /**
   * login: Inicia el proceso de autenticación OAuth2.
   * Redirige al usuario al proveedor de identidad (Google, Microsoft, etc.)
   * para que ingrese sus credenciales.
   */
  login(): void {
    this.auth.login();
  }

  /**
   * logout: Cierra la sesión del usuario.
   * Limpia los tokens locales y redirige a la página de cierre de sesión.
   */
  logout(): void {
    this.auth.logout();
  }
}
