// ============================================================================
// COMPONENTE RAÍZ (app.component.ts)
// ============================================================================
// Componente principal con barra de navegación que cambia según el estado de autenticación.

import { Component, inject } from '@angular/core';

// CommonModule: Habilita directivas comunes (@if, @for, [ngClass], etc.)
import { CommonModule } from '@angular/common';

// RouterModule: Habilita directivas de navegación (routerLink, routerLinkActive)
import { RouterModule } from '@angular/router';

// AuthService: Para verificar si el usuario está logueado
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-inner">
        <a class="brand" routerLink="/">JWT Auth</a>
        <div class="links">
          @if (auth.isLoggedIn()) {
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/profile" routerLinkActive="active">Perfil</a>
            @if (auth.isAdmin()) {
              <a routerLink="/admin" routerLinkActive="active">Admin</a>
            }
          }
        </div>
        <div class="actions">
          @if (auth.isLoggedIn()) {
            <span class="user-badge">{{ auth.currentUser()?.name }}</span>
            <button class="btn logout" (click)="auth.logout()">Cerrar Sesión</button>
          } @else {
            <a routerLink="/login" class="btn login">Iniciar Sesión</a>
          }
        </div>
      </div>
    </nav>
    <main>
      <router-outlet />
    </main>
  `,
  styles: [`
    .navbar {
      background: #1a1a2e;
      color: #fff;
      padding: 0 1rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .nav-inner {
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      height: 56px;
    }
    .brand {
      font-weight: 700;
      font-size: 1.2rem;
      color: #fff;
      text-decoration: none;
      letter-spacing: -0.02em;
    }
    .links {
      display: flex;
      gap: 0.25rem;
      flex: 1;
    }
    .links a {
      color: #c4b5fd;
      text-decoration: none;
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      font-size: 0.9rem;
      transition: background 0.15s;
    }
    .links a:hover { background: rgba(255,255,255,0.08); color: #fff; }
    .links a.active { background: rgba(255,255,255,0.12); color: #fff; font-weight: 600; }
    .actions { display: flex; align-items: center; gap: 0.75rem; }
    .user-badge {
      font-size: 0.85rem;
      color: #c4b5fd;
      font-weight: 500;
    }
    .btn {
      border: none;
      border-radius: 8px;
      padding: 0.4rem 1rem;
      font-size: 0.85rem;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.15s;
    }
    .btn.logout { background: rgba(255,255,255,0.1); color: #fff; }
    .btn.logout:hover { background: rgba(255,255,255,0.2); }
    .btn.login { background: #6366f1; color: #fff; }
    .btn.login:hover { background: #4f46e5; }
    main { min-height: calc(100vh - 56px); }
  `],
})
export class AppComponent {
  // inject(): Obtiene el servicio de autenticación
  auth = inject(AuthService);
}
