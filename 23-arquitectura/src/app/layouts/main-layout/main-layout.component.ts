import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="layout">
      <nav class="sidebar">
        <h2>Angular App</h2>
        <ul>
          <li><a routerLink="/dashboard">Dashboard</a></li>
          <li><a routerLink="/products">Productos</a></li>
          <li><a routerLink="/auth/login">Login</a></li>
        </ul>
      </nav>
      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .layout { display: flex; height: 100dvh; }
    .sidebar { width: 240px; background: #111; color: white; padding: 1.5rem; }
    .sidebar h2 { margin: 0 0 1.5rem; font-size: 1.1rem; }
    .sidebar ul { list-style: none; padding: 0; margin: 0; }
    .sidebar li { margin-bottom: 0.5rem; }
    .sidebar a { color: #9ca3af; text-decoration: none; display: block; padding: 0.5rem; border-radius: 4px; }
    .sidebar a:hover { color: white; background: #1f2937; }
    .content { flex: 1; padding: 2rem; overflow-y: auto; background: #f9fafb; }
  `]
})
export class MainLayoutComponent {}
