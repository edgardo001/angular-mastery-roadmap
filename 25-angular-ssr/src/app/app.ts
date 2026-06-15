import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header>
      <nav>
        <a routerLink="/blog" routerLinkActive="active">Blog</a>
      </nav>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
  styles: [`
    header { background: #1e40af; color: white; padding: 1rem 2rem; }
    nav { display: flex; gap: 1.5rem; }
    nav a { color: white; text-decoration: none; font-weight: 500; }
    nav a:hover { text-decoration: underline; }
    main { max-width: 900px; margin: 2rem auto; padding: 0 1rem; }
  `]
})
export class App {}
