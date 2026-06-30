// ──────────────────────────────────────────────
// header.component.ts — Componente de navegación
// ──────────────────────────────────────────────
//
// HeaderComponent demuestra:
// 1. @Input() → recibir datos del componente padre
// 2. @Input({ required: true }) → forzar que el padre pase el dato
// 3. @for → iterar sobre un array en el template
// 4. Interpolación {{ }} → mostrar valores en el HTML
//
// Flujo de datos:
//   AppComponent → [title], [navLinks] → HeaderComponent
//   (solo recibe datos, no envía eventos)

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,

  // Template inline: HTML del componente
  // Angular compila esto a JavaScript eficiente que actualiza
  // solo los nodos del DOM que cambiaron
  template: `
    <header>
      <!--
        Interpolación {{ title }}:
        Reemplaza {{ title }} con el valor de la propiedad title
        Ejemplo: si title = 'Angular Portfolio', se genera:
        <h1>Angular Portfolio</h1>
      -->
      <h1>{{ title }}</h1>
      <nav>
        <!--
          @for control flow (Angular 17+):
          Itera sobre el array navLinks
          track link: Angular necesita un identificador único para cada
          elemento. Para arrays de primitivos (strings), usa el mismo valor.
          Para objetos, usarías track item.id
        -->
        @for (link of navLinks; track link) {
          <!--
            Interpolación {{ link }}:
            Cada iteración crea un <a> con el texto del link
            Resultado: <a href="#">Inicio</a> <a href="#">Proyectos</a> <a href="#">Contacto</a>
          -->
          <a href="#">{{ link }}</a>
        }
      </nav>
    </header>
  `,

  // Estilos scoped: solo se aplican a ESTE componente
  // Angular agrega un atributo único a cada elemento del componente
  // para que los estilos no se filtren a otros componentes
  styles: [`
    header { display: flex; justify-content: space-between; align-items: center;
             padding: 1rem 2rem; background: #1a1a2e; color: white; }
    h1 { font-size: 1.25rem; }
    nav { display: flex; gap: 1rem; }
    a { color: #e0e0e0; text-decoration: none; }
    a:hover { color: #4fc3f7; }
  `]
})
export class HeaderComponent {
  // @Input({ required: true }): le dice a Angular que este componente
  // REQUIERE que el padre pase este dato. Si el padre no lo pasa,
  // Angular lanza un error en compilación.
  //
  // El ! (non-null assertion) le dice a TypeScript: "confía en mí,
  // este valor siempre va a tener un valor después del constructor"
  @Input({ required: true }) title!: string;

  // @Input() para arrays: funciona igual que para strings
  // El padre pasa ['Inicio', 'Proyectos', 'Contacto']
  // y el template itera con @for
  @Input({ required: true }) navLinks!: string[];
}
