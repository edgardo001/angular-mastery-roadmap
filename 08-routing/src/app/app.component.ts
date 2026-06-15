import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-inner">
        <span class="brand">🚀 Routing</span>
        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/products" routerLinkActive="active">Productos</a>
          <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          @if (authService.role() === 'admin') {
            <a routerLink="/admin" routerLinkActive="active">Admin</a>
          }
        </div>
        <div class="auth-area">
          @if (authService.isLoggedIn()) {
            <span class="user-info">
              {{ authService.role() === 'admin' ? '👑 Admin' : '👤 User' }}
            </span>
            <button class="btn btn-logout" (click)="logout()">Logout</button>
          } @else {
            <button class="btn btn-login" (click)="loginAsUser()">Login User</button>
            <button class="btn btn-admin-login" (click)="loginAsAdmin()">Login Admin</button>
          }
        </div>
      </div>
    </nav>
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
  authService = inject(AuthService);

  loginAsUser() {
    this.authService.login('user');
  }

  loginAsAdmin() {
    this.authService.login('admin');
  }

  logout() {
    this.authService.logout();
  }
}
