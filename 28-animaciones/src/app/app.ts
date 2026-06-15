import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeSlide } from './animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  animations: [routeSlide],
  template: `
    <nav style="display:flex;gap:1rem;padding:1rem 2rem;background:#1e40af;">
      <a routerLink="/home" style="color:white;text-decoration:none;font-weight:500;">Home</a>
      <a routerLink="/about" style="color:white;text-decoration:none;font-weight:500;">About</a>
    </nav>
    <main [@routeSlide]="getRouteAnimation()" style="position:relative;overflow:hidden;">
      <router-outlet />
    </main>
  `
})
export class App {
  getRouteAnimation() {
    const path = window.location.pathname;
    return path === '/home' ? 1 : path === '/about' ? 2 : 0;
  }
}
