/**
 * COMPONENTE DE FORMULARIO DE LOGIN (LoginFormComponent)
 * ======================================================
 *
 * Formulario para iniciar sesión con email y contraseña.
 * Es como el " formulario de acceso" de una aplicación.
 *
 * ANÁLOGÍA: Es como un buzon de correo:
 * - Tienes que poner tu email y contraseña
 * - Presionas "Iniciar Sesión" para enviar
 *
 * PALABRAS CLAVE:
 * - ButtonComponent: Componente compartido de botón
 * - (onClick): Evento que se ejecuta al hacer clic
 * - app-button: Usa el componente Button con variante primary
 * - form: Elemento HTML para formularios
 * - input type="email": Campo para ingresar email
 * - input type="password": Campo para contraseña (oculta texto)
 *
 * NOTA: Este formulario es básico. En una app real,
 * necesitarías:
 * - Validación de campos
 * - Manejo de errores
 * - Conexión con AuthService
 * - Protección contra ataques de fuerza bruta
 */

// Component: Decorador del componente
import { Component } from '@angular/core';

// Componente compartido de botón
import { ButtonComponent } from '../../../shared/ui';

@Component({
  selector: 'app-login-form',
  standalone: true,
  // ButtonComponent se importa para usarlo en el template
  imports: [ButtonComponent],
  template: `
    <form>
      <!-- input type="email": Campo para ingresar email -->
      <input type="email" placeholder="Email" />
      <!-- input type="password": Campo para contraseña (oculta el texto) -->
      <input type="password" placeholder="Password" />
      <!-- app-button: Usa el componente Button con variante primary -->
      <!-- (onClick): Emite el evento cuando se hace clic -->
      <app-button variant="primary" (onClick)="onLogin()">Iniciar Sesión</app-button>
    </form>
  `,
  styles: [`
    form { display: flex; flex-direction: column; gap: 0.75rem; }
    input { padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px; }
  `]
})
export class LoginFormComponent {
  // onLogin(): Se ejecuta cuando el usuario presiona "Iniciar Sesión"
  // NOTA: En una app real, aquí iría la lógica de autenticación
  onLogin(): void {
    console.log('Login submitted');
  }
}
