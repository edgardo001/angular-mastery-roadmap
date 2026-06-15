import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="page">
      <div class="login-card">
        <h1>Iniciar Sesión</h1>
        <p class="subtitle">Ingresa tus credenciales para acceder al dashboard</p>

        <form (ngSubmit)="onLogin()" class="login-form">
          <div class="field">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              [(ngModel)]="email"
              placeholder="usuario@ejemplo.com"
              required
              autocomplete="email"
            />
          </div>
          <div class="field">
            <label for="password">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              [(ngModel)]="password"
              placeholder="••••••••"
              required
              autocomplete="current-password"
            />
          </div>

          @if (error) {
            <p class="error-msg">{{ error }}</p>
          }

          <button type="submit" class="btn-submit">Ingresar</button>
        </form>

        <p class="hint">
          Cualquier email y contraseña funcionan para esta demostración
        </p>

        <a routerLink="/" class="back-link">← Volver al inicio</a>
      </div>
    </div>
  `,
  styles: [`
    .page { padding: 2rem; max-width: 420px; margin: 0 auto; display: flex; align-items: center; min-height: calc(100vh - 56px); }
    .login-card { background: #fff; border-radius: 12px; padding: 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.08); width: 100%; }
    h1 { font-size: 1.5rem; color: #1a1a2e; text-align: center; }
    .subtitle { color: #666; text-align: center; font-size: 0.9rem; margin: 0.5rem 0 1.5rem; }
    .login-form { display: flex; flex-direction: column; gap: 1rem; }
    .field { display: flex; flex-direction: column; gap: 0.3rem; }
    label { font-size: 0.85rem; font-weight: 600; color: #333; }
    input { padding: 0.65rem 0.75rem; border: 1px solid #d0d0d0; border-radius: 6px; font-size: 0.95rem; transition: border-color 0.15s; }
    input:focus { outline: none; border-color: #0f3460; box-shadow: 0 0 0 2px rgba(15,52,96,0.1); }
    .error-msg { color: #e63946; font-size: 0.85rem; text-align: center; background: #fdecea; padding: 0.5rem; border-radius: 6px; }
    .btn-submit { padding: 0.7rem; background: #0f3460; color: #fff; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background 0.15s; margin-top: 0.5rem; }
    .btn-submit:hover { background: #1a5276; }
    .hint { text-align: center; font-size: 0.8rem; color: #999; margin-top: 1rem; }
    .back-link { display: block; text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #0f3460; }
  `],
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';

  onLogin() {
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Por favor ingresa email y contraseña';
      return;
    }
    const success = this.auth.login(this.email, this.password);
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Credenciales inválidas';
    }
  }
}
