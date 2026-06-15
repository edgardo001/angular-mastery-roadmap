import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="navbar">
      <div class="nav-inner">
        <span class="brand">🔐 Login Básico</span>
        <div class="nav-links">
          <a routerLink="/">Home</a>
          @if (authService.isLoggedIn()) {
            <a routerLink="/dashboard">Dashboard</a>
          }
        </div>
        <div class="auth-area">
          @if (authService.isLoggedIn(); as loggedIn) {
            @let user = authService.currentUser();
            <span class="user-info">{{ user?.name }}</span>
            <button class="btn btn-logout" (click)="logout()">Logout</button>
          } @else {
            <a routerLink="/login" class="btn btn-login">Login</a>
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
    .auth-area { display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; }
    .user-info { font-size: 0.85rem; color: #aaa; }
    .btn { padding: 0.35rem 0.85rem; border: none; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.15s; text-decoration: none; }
    .btn-login { background: #2a9d8f; color: #fff; display: inline-block; }
    .btn-login:hover { background: #238b7e; text-decoration: none; }
    .btn-logout { background: #e63946; color: #fff; }
    .btn-logout:hover { background: #c5303c; }
    main { min-height: calc(100vh - 56px); }
  `],
})
export class AppComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
