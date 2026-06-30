/**
 * PROYECTO 08 — Routing y Navegación
 *
 * Componente raíz que contiene la barra de navegación y el <router-outlet>.
 * Demuestra:
 * - RouterLink: navegación declarativa
 * - RouterLinkActive: clase CSS activa según la ruta actual
 * - router-outlet: donde se renderiza el componente de la ruta activa
 * - @if para mostrar links según el rol del usuario
 *
 * ANLOGÍA: Piensa en el router como un GPS:
 * - Las rutas son las carreteras
 * - router-outlet es la pantalla donde se muestra el mapa actual
 * - Los guards son los controles de acceso en ciertas carreteras
 */

import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <!-- Barra de navegación sticky (se queda arriba al hacer scroll) -->
    <nav class="navbar">
      <div class="nav-inner">
        <span class="brand">Routing</span>

        <!-- Links de navegación -->
        <div class="nav-links">
          <!--
            routerLink: navega a la ruta indicada (como href pero sin recargar la página)
            routerLinkActive: agrega la clase "active" cuando la ruta coincide
            [routerLinkActiveOptions]="{ exact: true }": solo activo si la ruta es EXACTAMENTE "/"
          -->
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/products" routerLinkActive="active">Productos</a>
          <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          <!-- @if: solo muestra link de admin si el rol es 'admin' -->
          @if (authService.role() === 'admin') {
            <a routerLink="/admin" routerLinkActive="active">Admin</a>
          }
        </div>

        <!-- Botones de autenticación -->
        <div class="auth-area">
          @if (authService.isLoggedIn()) {
            <span class="user-info">
              {{ authService.role() === 'admin' ? 'Admin' : 'User' }}
            </span>
            <button class="btn btn-logout" (click)="logout()">Logout</button>
          } @else {
            <button class="btn btn-login" (click)="loginAsUser()">Login User</button>
            <button class="btn btn-admin-login" (click)="loginAsAdmin()">Login Admin</button>
          }
        </div>
      </div>
    </nav>

    <!--
      <router-outlet> es el placeholder donde Angular renderiza
      el componente de la ruta activa. Es como un "portal" que
      cambia de contenido según la URL.
    -->
    <main>
      <router-outlet />
    </main>
  `,
  styles: [`
    .navbar { background: #1a1a2e; color: #fff; padding: 0 1rem; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
    .nav-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; gap: 1.5rem; height: 56px; }
    .brand { font-weight: 700; font-size: 1.1rem; color: #e9c46a; white-space: nowrap; }
    .nav-links { display: flex; gap: 0.25rem; flex: 1; }
    .nav-links a { color: #ccc; padding: 0.4rem 0.75rem; border-radius: 6px; font-size: 0.9rem; font-weight: 500; transition: all 0.15s; text-decoration: none; }
    .nav-links a:hover { color: #fff; background: rgba(255,255,255,0.1); text-decoration: none; }
    .nav-links a.active { color: #fff; background: #0f3460; }
    .auth-area { display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; }
    .user-info { font-size: 0.85rem; color: #aaa; }
    .btn { padding: 0.35rem 0.85rem; border: none; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
    .btn-login { background: #2a9d8f; color: #fff; }
    .btn-login:hover { background: #238b7e; }
    .btn-admin-login { background: #e9c46a; color: #1a1a2e; }
    .btn-admin-login:hover { background: #d4b05a; }
    .btn-logout { background: #e63946; color: #fff; }
    .btn-logout:hover { background: #c5303c; }
    main { min-height: calc(100vh - 56px); }
  `],
})
export class AppComponent {
  /**
   * inject() es la forma moderna de obtener dependencias.
   * Reemplaza al constructor DI (más limpio, más legible).
   */
  authService = inject(AuthService);

  /** Login como usuario normal */
  loginAsUser() {
    this.authService.login('user');
  }

  /** Login como administrador (acceso a /admin) */
  loginAsAdmin() {
    this.authService.login('admin');
  }

  /** Cierra sesión y redirige */
  logout() {
    this.authService.logout();
  }
}
