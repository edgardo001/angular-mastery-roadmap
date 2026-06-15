import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="card">
        <h1>Iniciar Sesión</h1>
        <p class="subtitle">Ingresa con tus credenciales</p>

        @if (error()) {
          <div class="error">{{ error() }}</div>
        }

        <form (ngSubmit)="onSubmit()">
          <div class="field">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              [(ngModel)]="email"
              name="email"
              placeholder="user@test.com"
              required
              autocomplete="email"
            />
          </div>
          <div class="field">
            <label for="password">Contraseña</label>
            <input
              id="password"
              type="password"
              [(ngModel)]="password"
              name="password"
              placeholder="123456"
              required
              autocomplete="current-password"
            />
          </div>
          <button type="submit" class="btn primary" [disabled]="loading()">
            {{ loading() ? 'Ingresando…' : 'Ingresar' }}
          </button>
        </form>

        <div class="hint">
          <p><strong>user@test.com</strong> / 123456 (usuario normal)</p>
          <p><strong>admin@test.com</strong> / 123456 (administrador)</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .card {
      background: #fff;
      border-radius: 12px;
      padding: 2.5rem;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      width: 100%;
      max-width: 400px;
    }
    h1 { margin: 0 0 0.25rem; font-size: 1.5rem; color: #1a1a2e; }
    .subtitle { color: #6b7280; margin-bottom: 1.5rem; font-size: 0.9rem; }
    .field { margin-bottom: 1rem; }
    label { display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.35rem; color: #374151; }
    input {
      width: 100%;
      padding: 0.7rem 0.85rem;
      border: 2px solid #d1d5db;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }
    input:focus { outline: none; border-color: #6366f1; }
    .btn {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.15s;
    }
    .btn.primary { background: #6366f1; color: #fff; }
    .btn.primary:hover:not(:disabled) { background: #4f46e5; }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .error {
      background: #fef2f2;
      color: #dc2626;
      padding: 0.75rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-size: 0.85rem;
      border: 1px solid #fecaca;
    }
    .hint {
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
      font-size: 0.8rem;
      color: #6b7280;
    }
    .hint p { margin: 0.2rem 0; }
  `],
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  loading = signal(false);
  error = signal('');

  onSubmit() {
    if (!this.email || !this.password) return;
    this.loading.set(true);
    this.error.set('');
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.status === 401 ? 'Credenciales inválidas' : 'Error del servidor');
      },
    });
  }
}
