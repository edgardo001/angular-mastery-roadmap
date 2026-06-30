/**
 * PÁGINA DE LOGIN (LoginPage)
 * ============================
 *
 * Muestra el formulario de inicio de sesión.
 * Es como la "puerta de entrada" a la aplicación.
 *
 * ANÁLOGÍA: Es como la pantalla de bloqueo de un teléfono:
 * - Muestra un formulario para ingresar credenciales
 * - Usa el layout de autenticación (fondo degradado, centrado)
 *
 * PALABRAS CLAVE:
 * - CardComponent: Componente compartido que envuelve contenido en una tarjeta
 * - LoginFormComponent: Componente que contiene el formulario de login
 * - <app-card>: Usa el componente Card para envolver el contenido
 * - <app-login-form>: Usa el componente LoginForm para el formulario
 *
 * FLUJO:
 * 1. LoginPage se muestra en el layout de autenticación
 * 2. CardComponent envuelve todo en una tarjeta
 * 3. LoginFormComponent maneja la lógica del formulario
 */

// Component: Decorador del componente
import { Component } from '@angular/core';

// Componente que contiene el formulario de login
import { LoginFormComponent } from '../components/login-form.component';

// Componente compartido para envolver contenido en una tarjeta
import { CardComponent } from '../../../shared/ui';

@Component({
  selector: 'app-login-page',
  standalone: true,
  // Importa los componentes que usa el template
  imports: [LoginFormComponent, CardComponent],
  template: `
    <div class="login-page">
      <!-- CardComponent: Envuelve el contenido en una tarjeta estilizada -->
      <app-card>
        <h2>Iniciar Sesión</h2>
        <!-- LoginFormComponent: Contiene el formulario de login -->
        <app-login-form />
      </app-card>
    </div>
  `,
  styles: [`
    .login-page {
      max-width: 400px;
      margin: 4rem auto;
    }
    h2 { margin: 0 0 1rem; }
  `]
})
// LoginPage: Página de inicio de sesión
export class LoginPage {}
