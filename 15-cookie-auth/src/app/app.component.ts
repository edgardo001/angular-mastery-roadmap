// ============================================================================
// COMPONENTE RAÍZ (app.component.ts)
// ============================================================================
// Componente principal que muestra login o dashboard según el estado de sesión.

// Component: Decorador que define un componente Angular
// inject: Para obtener servicios
// OnInit: Interfaz para ejecutar código al iniciar el componente
import { Component, inject, OnInit } from '@angular/core';

// AuthService: Para verificar si hay sesión activa
import { AuthService } from './services/auth.service';

// Componentes de login y dashboard
import { LoginComponent } from './pages/login.component';
import { DashboardComponent } from './pages/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: Componentes que este componente usa en su template
  imports: [LoginComponent, DashboardComponent],
  template: `
    <main>
      <h1>Cookie Authentication</h1>
      <p class="lead">HttpOnly session cookies &bull; XSRF token protection &bull; withCredentials</p>

      @if (auth.isLoggedIn()) {
        <app-dashboard />
      } @else {
        <app-login />
      }

      <footer class="info">
        <p>Cookies are set server-side via <code>Set-Cookie</code>. Angular sends them automatically with <code>withCredentials: true</code>.</p>
        <p>XSRF token ({{ xsrfCookie }}) is read from cookie and sent as {{ xsrfHeader }} on mutating requests.</p>
      </footer>
    </main>
  `,
  styles: [`
    main { max-width: 640px; margin: 0 auto; padding: 2rem 1rem; }
    h1 { font-size: 1.75rem; margin-bottom: .25rem; }
    .lead { color: #666; font-size: .9rem; margin-bottom: 2rem; }
    .info { margin-top: 3rem; padding: 1rem; background: #f3f4f6; border-radius: 8px; font-size: .8rem; color: #6b7280; }
    .info code { background: #e5e7eb; padding: .125rem .375rem; border-radius: 4px; font-size: .8rem; }
  `],
})
export class AppComponent implements OnInit {
  protected auth = inject(AuthService);
  protected xsrfCookie = 'XSRF-TOKEN';
  protected xsrfHeader = 'X-XSRF-TOKEN';

  // ngOnInit(): Se ejecuta cuando el componente se inicializa.
  // Verifica si hay una sesión activa (cookie válida del servidor).
  ngOnInit() {
    this.auth.checkSession().subscribe({
      error: () => { /* No session — stays logged out */ },
    });
  }
}
