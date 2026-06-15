import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Información del Token JWT</h1>
      <p class="subtitle">Contenido decodificado del access token</p>

      <div class="card">
        <h2>Payload del Token</h2>
        @if (tokenPayload(); as payload) {
          <table>
            @for (item of payload | keyvalue; track item.key) {
              <tr>
                <td class="key">{{ item.key }}</td>
                <td class="val">{{ item.value }}</td>
              </tr>
            }
          </table>
        } @else {
          <p class="empty">No se pudo decodificar el token</p>
        }
      </div>

      <div class="card">
        <h2>Estado de Sesión</h2>
        <table>
          <tr><td class="key">Autenticado</td><td class="val">{{ auth.isLoggedIn() ? 'Sí' : 'No' }}</td></tr>
          <tr><td class="key">Rol</td><td class="val">{{ auth.isAdmin() ? 'Administrador' : 'Usuario normal' }}</td></tr>
          <tr><td class="key">Usuario</td><td class="val">{{ auth.currentUser()?.name ?? '—' }}</td></tr>
          <tr><td class="key">Email</td><td class="val">{{ auth.currentUser()?.email ?? '—' }}</td></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 700px; margin: 0 auto; padding: 2rem 1rem; }
    h1 { font-size: 1.75rem; color: #1a1a2e; margin-bottom: 0.25rem; }
    .subtitle { color: #6b7280; margin-bottom: 2rem; }
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
    .key { font-weight: 600; color: #6b7280; width: 140px; }
    .val { color: #1a1a2e; font-family: 'Courier New', monospace; font-size: 0.9rem; word-break: break-all; }
    .empty { color: #9ca3af; font-style: italic; }
  `],
})
export class ProfileComponent {
  auth = inject(AuthService);

  tokenPayload = computed(() => {
    const token = this.auth.getAccessToken();
    if (!token) return null;
    return this.auth.decodeToken(token);
  });
}
