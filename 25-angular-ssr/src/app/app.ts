// =============================================================================
// ARCHIVO: app.ts
// PROPÓSITO: Componente raíz de la aplicación Angular SSR
// =============================================================================
//
// Este es el "padre" de todos los componentes. Contiene la estructura
// básica de la página: header con navegación y un área principal donde
// se muestran las diferentes páginas según la URL.
//
// Piensa en él como el marco de una casa: tiene la estructura general
// (techo, paredes) pero el contenido interior cambia según la habitación
// (ruta) que visites.
// =============================================================================

// Component: Decorador que le dice a Angular "esta clase es un componente".
// Es como una etiqueta que dice "esto es una pieza reutilizable de UI".
import { Component } from '@angular/core';

// RouterOutlet: Es el "hueco" donde Angular inserta el componente de la ruta actual.
// Piensa en él como un televisor: la pantalla (RouterOutlet) muestra
// lo que sintonizas (la ruta activa).
//
// RouterLink: Transforma un <a> normal en un enlace SPA.
// Al hacer clic, Angular cambia la ruta SIN recargar la página.
//
// RouterLinkActive: Agrega una clase CSS (ej: "active") al enlace
// cuando su ruta coincide con la URL actual. Útil para resaltar
// la página actual en la navegación.
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  // selector: Nombre HTML personalizado que representa este componente.
  // Se usa como <app-root> en el index.html
  selector: 'app-root',

  // standalone: true significa que este componente NO necesita un NgModule.
  // Angular moderno usa componentes standalone (independientes) por defecto.
  // Es como un家电 que funciona solo: no necesitas conectarlo a una base central.
  standalone: true,

  // imports: Componentes y directivas que este componente usa en su template.
  // Es como una lista de "herramientas" que el componente necesita.
  imports: [RouterOutlet, RouterLink, RouterLinkActive],

  // template: El HTML que este componente renderiza.
  // Usa interpolación {{ }} para mostrar datos y directivas [] para
  // comportamiento dinámico.
  template: `
    <header>
      <nav>
        <!-- routerLink: Navega sin recargar la página -->
        <!-- routerLinkActive: Agrega clase "active" cuando esta ruta está activa -->
        <a routerLink="/blog" routerLinkActive="active">Blog</a>
      </nav>
    </header>
    <main>
      <!-- router-outlet: Donde se inserta el componente de la ruta actual -->
      <router-outlet />
    </main>
  `,

  // styles: Estilos CSS aplicados SOLO a este componente (encapsulados).
  // No afectan a otros componentes de la app. Es como un "jardín privado".
  styles: [`
    header { background: #1e40af; color: white; padding: 1rem 2rem; }
    nav { display: flex; gap: 1.5rem; }
    nav a { color: white; text-decoration: none; font-weight: 500; }
    nav a:hover { text-decoration: underline; }
    main { max-width: 900px; margin: 2rem auto; padding: 0 1rem; }
  `]
})
// Clase del componente. Aquí iría la lógica (propiedades, métodos).
// En este caso es un componente "tonto" (solo presenta HTML, sin lógica).
export class App {}
