import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="page">
      <h1>Dashboard</h1>
      <p class="subtitle">Panel protegido — solo visible para usuarios autenticados</p>

      @let user = authService.currentUser();
      @if (user) {
        <div class="info-card">
          <div class="field"><strong>Nombre:</strong> {{ user.name }}</div>
          <div class="field"><strong>Email:</strong> {{ user.email }}</div>
          <div class="field"><strong>Token:</strong> <code class="token">{{ user.token }}</code></div>
          <div class="field"><strong>Estado:</strong> <span class="badge">Autenticado</span></div>
        </div>
      }

      <div class="actions">
        <button class="btn-logout" (click)="logout()">Cerrar Sesión</button>
      </div>
    </div>
  `,
  styles: [`
    .page { padding: 2rem; max-width: 700px; margin: 0 auto; }
    h1 { font-size: 2rem; color: #1a1a2e; }
    .subtitle { color: #555; margin: 0.5rem 0 1.5rem; }
    .info-card { background: #fff; border-radius: 10px; padding: 1.5rem; box-shadow: 0 2px 6px rgba(0,0,0,0.07); }
    .field { padding: 0.6rem 0; border-bottom: 1px solid #eee; font-size: 1rem; display: flex; gap: 0.5rem; }
    .field:last-child { border-bottom: none; }
    .token { font-size: 0.75rem; word-break: break-all; background: #f4f4f4; padding: 0.1rem 0.4rem; border-radius: 4px; }
    .badge { display: inline-block; padding: 0.15rem 0.6rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; background: #d4edda; color: #155724; }
    .actions { margin-top: 1.5rem; }
    .btn-logout { padding: 0.65rem 1.5rem; background: #e63946; color: #fff; border: none; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: background 0.15s; }
    .btn-logout:hover { background: #c5303c; }
  `],
})
export class DashboardComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
