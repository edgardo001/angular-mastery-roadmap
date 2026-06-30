// ============================================================================
// COMPONENTE DE ADMINISTRACIÓN (admin.component.ts)
// ============================================================================
// Panel solo accesible para usuarios con rol de administrador.
// Muestra estadísticas y lista de todos los usuarios.

import { Component, inject, signal } from '@angular/core';

// CommonModule: Habilita directivas comunes
import { CommonModule } from '@angular/common';

// UserService y AdminData: Para obtener datos de administración
import { UserService, AdminData } from '../../services/user.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Panel de Administración</h1>

      @if (data(); as d) {
        <div class="stats">
          <div class="stat"><span class="num">{{ d.stats.totalUsers }}</span> Usuarios totales</div>
          <div class="stat"><span class="num">{{ d.stats.users }}</span> Usuarios normales</div>
          <div class="stat"><span class="num">{{ d.stats.admins }}</span> Administradores</div>
        </div>

        <div class="card">
          <h2>{{ d.message }}</h2>
          <table>
            <thead>
              <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th></tr>
            </thead>
            <tbody>
              @for (u of d.users; track u.id) {
                <tr>
                  <td>{{ u.id }}</td>
                  <td>{{ u.name }}</td>
                  <td>{{ u.email }}</td>
                  <td><span class="badge" [class.admin]="u.role === 'admin'">{{ u.role }}</span></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 0 auto; padding: 2rem 1rem; }
    h1 { font-size: 1.75rem; color: #1a1a2e; margin-bottom: 1.5rem; }
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; }
    .stat {
      background: #fff;
      border-radius: 12px;
      padding: 1.25rem;
      text-align: center;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
      color: #6b7280;
      font-size: 0.85rem;
    }
    .num { display: block; font-size: 2rem; font-weight: 700; color: #1a1a2e; margin-bottom: 0.25rem; }
    .card {
      background: #fff;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    .card h2 { font-size: 1rem; color: #374151; margin-bottom: 1rem; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 0.6rem 0.5rem; border-bottom: 1px solid #f3f4f6; }
    th { font-weight: 600; color: #6b7280; font-size: 0.8rem; text-transform: uppercase; }
    .badge {
      display: inline-block;
      background: #dbeafe;
      color: #1d4ed8;
      padding: 0.15rem 0.6rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    .badge.admin { background: #fef3c7; color: #b45309; }
  `],
})
export class AdminComponent {
  private userService = inject(UserService);
  data = signal<AdminData | undefined>(undefined);

  // Al crear el componente, cargamos los datos de administración
  constructor() {
    this.userService.getAdminData().subscribe({
      next: (d) => this.data.set(d),
      error: () => console.error('Error al cargar datos de administración'),
    });
  }
}
