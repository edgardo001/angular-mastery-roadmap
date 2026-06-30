/**
 * Componente raíz del Shell App (aplicación contenedor/host).
 *
 * El Shell es la aplicación principal que orquesta los microfrontends.
 * Contiene la navegación principal y el <router-outlet> donde se renderizan
 * tanto componentes locales como remotos cargados via Module Federation.
 *
 * RouterOutlet — Directive de Angular Router que renderiza el componente
 *   correspondiente a la ruta actual. Cuando navegas a /remote, el Router
 *   carga el RemoteFeatureComponent desde el remote y lo renderiza aquí.
 *
 * RouterLink — Directive que convierte un <a> en un enquete del Router,
 *   evitando recargas completas de la página.
 *
 * Analogía: El Shell es como el marco de una ventana modular.
 *   Los módulos (componentes locales y remotes) se insertan en el marco
 *   según lo que el usuario pida (la ruta).
 */
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav style="display: flex; gap: 10px; padding: 10px; background: #1a1a2e; color: white;">
      <a routerLink="/" style="color: white; text-decoration: none;">🏠 Home</a>
      <a routerLink="/remote" style="color: white; text-decoration: none;">🚀 Remote</a>
      <span style="margin-left: auto; opacity: 0.7;">Shell App (Host) — Module Federation</span>
    </nav>
    <router-outlet />
  `,
})
export class AppComponent {
  title = 'shell-app';
}
