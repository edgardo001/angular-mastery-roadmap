/**
 * Página de Dashboard — protegida por authGuardFn.
 *
 * Solo se puede acceder si el usuario está autenticado.
 * Muestra el rol actual y si tiene permisos de admin.
 *
 * ANLOGÍA: Es como la sala de control de un edificio:
 * solo los empleados autorizados pueden entrar y ver los monitores.
 */

import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="page">
      <h1>Dashboard</h1>

      <!-- @let crea un alias para authService.role() (evita repetir la llamada) -->
      @let role = authService.role();
      <p class="subtitle">Panel protegido — solo visible para usuarios autenticados</p>

      <div class="info-card">
        <div class="field"><strong>Estado:</strong> <span class="badge logged-in">Autenticado</span></div>
        <div class="field">
          <strong>Rol:</strong>
          <span class="badge" [class.admin]="role === 'admin'" [class.user]="role === 'user'">{{ role }}</span>
        </div>
      </div>

      <div class="admin-note">
        @if (role === 'admin') {
          <p>Tienes permisos de administrador. La ruta <code>/admin</code> también está disponible.</p>
        } @else {
          <p>Eres usuario regular. La ruta <code>/admin</code> no es accesible con tu rol actual.</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .page { padding: 2rem; max-width: 700px; margin: 0 auto; }
    h1 { font-size: 2rem; color: #1a1a2e; }
    .subtitle { color: #555; margin: 0.5rem 0 1.5rem; }
    .info-card { background: #fff; border-radius: 10px; padding: 1.5rem; box-shadow: 0 2px 6px rgba(0,0,0,0.07); }
    .field { padding: 0.6rem 0; border-bottom: 1px solid #eee; font-size: 1rem; }
    .field:last-child { border-bottom: none; }
    .badge { display: inline-block; padding: 0.15rem 0.6rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
    .logged-in { background: #d4edda; color: #155724; }
    .admin { background: #cce5ff; color: #004085; }
    .user { background: #fff3cd; color: #856404; }
    .admin-note { margin-top: 1rem; background: #f8f9fa; border-radius: 8px; padding: 1rem; font-size: 0.9rem; color: #555; }
    .admin-note code { background: #eef; padding: 0.1rem 0.3rem; border-radius: 4px; }
  `],
})
export class DashboardComponent {
  /** Servicio de autenticación inyectado */
  authService = inject(AuthService);
}
