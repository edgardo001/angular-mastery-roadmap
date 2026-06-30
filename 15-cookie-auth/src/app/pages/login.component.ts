// ============================================================================
// COMPONENTE DE LOGIN (login.component.ts)
// ============================================================================
// Formulario de login que usa cookies HttpOnly para autenticación.

import { Component, inject, signal } from '@angular/core';

// FormsModule: Habilita [(ngModel)] para two-way binding
import { FormsModule } from '@angular/forms';

// AuthService: Servicio que maneja login/logout con cookies
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-container">
      <h2>Cookie-Based Login</h2>
      <p class="subtitle">HttpOnly session cookie + XSRF protection</p>
      <form (ngSubmit)="onSubmit()" class="login-form">
        <label>
          Email
          <input type="email" [(ngModel)]="email" name="email" placeholder="user@example.com" required />
        </label>
        <label>
          Password
          <input type="password" [(ngModel)]="password" name="password" placeholder="••••••••" required />
        </label>
        <button type="submit" [disabled]="loading()">
          {{ loading() ? 'Signing in...' : 'Sign In' }}
        </button>
        @if (error()) {
          <p class="error">{{ error() }}</p>
        }
      </form>
    </div>
  `,
  styles: [`
    .login-container { max-width: 400px; margin: 4rem auto; padding: 2rem; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,.08); }
    h2 { margin-bottom: .25rem; }
    .subtitle { color: #666; font-size: .875rem; margin-bottom: 1.5rem; }
    .login-form { display: flex; flex-direction: column; gap: 1rem; }
    label { display: flex; flex-direction: column; gap: .25rem; font-size: .875rem; font-weight: 500; }
    input { padding: .625rem .75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; }
    button { padding: .75rem; background: #1a1a2e; color: #fff; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; }
    button:disabled { opacity: .6; cursor: not-allowed; }
    .error { color: #dc2626; font-size: .875rem; }
  `],
})
export class LoginComponent {
  private auth = inject(AuthService);

  // Variables del formulario
  email = '';
  password = '';
  loading = signal(false);  // Estado de carga
  error = signal('');       // Mensaje de error

  // onSubmit(): Envía las credenciales al servidor
  // Si son válidas, el servidor guarda una cookie HttpOnly con el token
  onSubmit() {
    this.loading.set(true);
    this.error.set('');
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.loading.set(false),
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message ?? 'Login failed');
      },
    });
  }
}
