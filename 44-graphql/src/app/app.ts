/**
 * ARCHIVO: app.ts - Componente raíz de la aplicación GraphQL
 *
 * Este componente es el punto de entrada de la aplicación Angular.
 * Su función principal es mostrar el encabezado y el contenido
 * de la ruta actual usando <router-outlet>.
 *
 * Analogía: Es como el "marco" de una ventana. El marco (AppComponent)
 * siempre está visible, pero el contenido dentro del marco cambia
 * cuando navegas a diferentes rutas (/countries, /about, etc.)
 *
 * GraphQL en esta aplicación:
 * - Apollo Client está configurado en graphql.config.ts
 * - Las consultas están en countries.graphql.ts
 * - El componente que usa las consultas es CountriesComponent
 */

// Component: Decorador de Angular que define las propiedades de un componente.
import { Component } from '@angular/core';

// RouterOutlet: Directiva que muestra el componente de la ruta actual.
// RouterLink: Directiva para crear enlaces de navegación.
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="app">
      <header>
        <h1>GraphQL Countries</h1>
        <p>API GraphQL real con Apollo Client</p>
      </header>
      <main>
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      background: #f5f5f5;
    }

    header {
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      color: white;
      padding: 30px;
      text-align: center;
    }

    header h1 {
      margin: 0;
      font-size: 28px;
    }

    header p {
      margin: 8px 0 0 0;
      opacity: 0.8;
    }

    main {
      padding: 20px;
    }
  `],
})
export class AppComponent {}
