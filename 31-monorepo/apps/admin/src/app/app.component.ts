import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="admin-layout">
      <aside class="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <a routerLink="/dashboard">📊 Dashboard</a>
        </nav>
        <div class="lib-info">
          <h4>Libs usadas:</h4>
          <p>UI Kit: <code>@monorepo/ui-kit</code></p>
          <p>Utils: <code>@monorepo/utils</code></p>
          <p>Types: <code>@monorepo/shared-types</code></p>
        </div>
      </aside>
      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .admin-layout { display: flex; min-height: 100vh; }
    .sidebar { width: 250px; background: #1a1a2e; color: white; padding: 20px; }
    .sidebar h2 { margin: 0 0 20px 0; }
    .sidebar a { display: block; color: white; text-decoration: none; padding: 10px; border-radius: 4px; }
    .sidebar a:hover { background: rgba(255,255,255,0.1); }
    .lib-info { margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2); font-size: 12px; }
    .lib-info h4 { margin: 0 0 10px 0; }
    .lib-info p { margin: 5px 0; }
    .content { flex: 1; padding: 20px; }
    code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 3px; }
  `],
})
export class AppComponent {}
