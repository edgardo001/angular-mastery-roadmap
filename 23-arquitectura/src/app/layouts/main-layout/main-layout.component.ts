/**
 * LAYOUT PRINCIPAL (MainLayoutComponent)
 * =======================================
 *
 * Layout con sidebar de navegación para las páginas principales.
 * Es como el "marco" que contiene el menú lateral y el contenido.
 *
 * ANÁLOGÍA: Es como la estructura de un libro:
 * - La sidebar es el índice (navegación)
 * - El contenido principal es el capítulo actual
 * - router-outlet es donde se muestra el capítulo
 *
 * PALABRAS CLAVE:
 * - RouterOutlet: Muestra el componente de la ruta actual
 * - RouterLink: Directiva para navegar entre rutas (como <a> pero sin recargar)
 * - routerLink: Atributo que define a dónde navegar
 *
 * FLUJO:
 * 1. El usuario hace clic en un enlace de la sidebar
 * 2. RouterLink navega a la nueva ruta
 * 3. RouterOutlet renderiza el componente correspondiente
 */

// Component: Decorador del componente
import { Component } from '@angular/core';

// RouterOutlet: Muestra el componente de la ruta actual
// RouterLink: Permite navegar entre rutas sin recargar la página
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  // Importa RouterOutlet y RouterLink para usarlos en el template
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="layout">
      <!-- Sidebar: Menú de navegación lateral -->
      <nav class="sidebar">
        <h2>Angular App</h2>
        <ul>
          <!-- routerLink: Navega a la ruta /dashboard -->
          <!-- Es como un <a href> pero sin recargar la página -->
          <li><a routerLink="/dashboard">Dashboard</a></li>
          <li><a routerLink="/products">Productos</a></li>
          <li><a routerLink="/auth/login">Login</a></li>
        </ul>
      </nav>
      <!-- Contenido principal: Donde se muestra el componente de la ruta -->
      <main class="content">
        <!-- router-outlet: Placeholder que muestra el componente actual -->
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
// MainLayoutComponent: Layout con sidebar de navegación
export class MainLayoutComponent {}
