/**
 * LAYOUT DE AUTENTICACIÓN (AuthLayoutComponent)
 * ================================================
 *
 * Layout centrado para páginas de autenticación (login, registro).
 * Muestra el contenido en el centro de la pantalla con fondo degradado.
 *
 * ANÁLOGÍA: Es como la pantalla de inicio de sesión de una app móvil:
 * - Todo está centrado
 * - Fondo atractivo
 * - Solo el formulario de login
 *
 * PALABRAS CLAVE:
 * - RouterOutlet: Muestra el componente de la ruta actual
 * - 100dvh: 100% de la altura del viewport dinámico
 * - linear-gradient: Fondo degradado de colores
 *
 * DIFERENCIA CON MainLayout:
 * - MainLayout tiene sidebar de navegación
 * - AuthLayout es minimalista (solo formulario)
 */

// Component: Decorador del componente
import { Component } from '@angular/core';

// RouterOutlet: Muestra el componente de la ruta actual
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  // RouterOutlet se importa directamente (forma moderna)
  imports: [RouterOutlet],
  template: `
    <div class="auth-layout">
      <div class="auth-container">
        <!-- router-outlet: Muestra el componente de la ruta actual -->
        <router-outlet />
      </div>
    </div>
  `,
  styles: [`
    .auth-layout {
      display: flex;
      justify-content: center;
      align-items: center;
      /* 100dvh: 100% de la altura del viewport dinámico */
      min-height: 100dvh;
      /* Fondo degradado de azul a morado */
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .auth-container { width: 100%; max-width: 480px; padding: 1rem; }
  `]
})
// AuthLayoutComponent: Layout centrado para autenticación
export class AuthLayoutComponent {}
