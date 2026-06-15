import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';
import { UserService, UserProfile } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Dashboard</h1>
      <p class="welcome">Bienvenido, <strong>{{ user()?.name }}</strong></p>

      <div class="card">
        <h2>Tu Perfil (desde el token)</h2>
        <table>
          <tr><td>ID</td><td>{{ user()?.id }}</td></tr>
          <tr><td>Nombre</td><td>{{ user()?.name }}</td></tr>
          <tr><td>Email</td><td>{{ user()?.email }}</td></tr>
          <tr><td>Rol</td><td><span class="badge" [class.admin]="user()?.role === 'admin'">{{ user()?.role }}</span></td></tr>
        </table>
      </div>

      @if (profile(); as p) {
        <div class="card">
          <h2>Perfil desde API</h2>
          <table>
            <tr><td>Nombre</td><td>{{ p.name }}</td></tr>
            <tr><td>Email</td><td>{{ p.email }}</td></tr>
            <tr><td>Rol</td><td>{{ p.role }}</td></tr>
            <tr><td>Creado</td><td>{{ p.createdAt }}</td></tr>
          </table>
        </div>
      }
    </div>
  `,
  styles: [`
    .container { max-width: 700px; margin: 0 auto; padding: 2rem 1rem; }
    h1 { font-size: 1.75rem; color: #1a1a2e; margin-bottom: 0.25rem; }
    .welcome { color: #6b7280; margin-bottom: 2rem; }
    .card {
      background: #fff;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1rem;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    .card h2 { font-size: 1rem; color: #374151; margin-bottom: 1rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 0.5rem 0; border-bottom: 1px solid #f3f4f6; }
    td:first-child { font-weight: 600; color: #6b7280; width: 100px; }
    .badge {
      display: inline-block;
      background: #dbeafe;
      color: #1d4ed8;
      padding: 0.15rem 0.6rem;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    .badge.admin { background: #fef3c7; color: #b45309; }
  `],
})
export class DashboardComponent {
  private auth = inject(AuthService);
  private userService = inject(UserService);

  user = this.auth.currentUser;
  profile = signal<UserProfile | undefined>(undefined);

  constructor() {
    this.userService.getProfile().subscribe({
      next: (p) => this.profile.set(p),
      error: () => console.error('Error al cargar perfil'),
    });
  }
}
