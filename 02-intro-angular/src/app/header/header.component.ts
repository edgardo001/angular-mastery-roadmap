// ──────────────────────────────────────────────
// header.component.ts — Componente de navegación
// ──────────────────────────────────────────────
//
// ANÁLOGÍA DEL MUNDO REAL:
// HeaderComponent es como el "menú principal" de un restaurante.
// El dueño (AppComponent) le dice qué platos ofrecer (navLinks)
// y qué nombre poner en el letrero (title).
//
// HeaderComponent demuestra:
// 1. @Input() → recibir datos del componente padre (como recibir la carta del día)
// 2. @Input({ required: true }) → forzar que el padre pase el dato (ingredientes obligatorios)
// 3. @for → iterar sobre un array en el template (como imprimir cada plato del menú)
// 4. Interpolación {{ }} → mostrar valores en el HTML (como rellenar campos de un formulario)
//
// Flujo de datos:
//   AppComponent → [title], [navLinks] → HeaderComponent
//   (solo recibe datos, no envía eventos - es un componente pasivo)

import { Component, Input } from '@angular/core';

// @Component: Decorador que transforma una clase TypeScript en un componente Angular
//
// ANÁLOGÍA: Es como una "receta de cocina" que le dice a Angular:
// - Qué nombre usar para este plato (selector)
// - Cómo prepararlo (template)
// - Cómo decorarlo (styles)
@Component({
  selector: 'app-header',
  standalone: true,

  // Template inline: HTML del componente
  // Angular compila esto a JavaScript eficiente que actualiza
  // solo los nodos del DOM que cambiaron
  //
  // ANÁLOGÍA: Es como un "molde" que Angular usa para crear la interfaz.
  // Cuando los datos cambian, Angular solo reemplaza las partes que cambiaron,
  // no recrea todo el HTML (como un chef que solo recalienta el plato, no lo rehace).
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
          
          ANÁLOGÍA: Es como un "ciclo for" en programación, pero en HTML.
          Imagina que tienes una lista de invitados a una fiesta.
          @for es como un recepcionista que va uno por uno y dice:
          "Bienvenido, [nombre del invitado]".
          
          El track es como un "nombre de mesa" único para cada invitado.
          Angular usa esto para saber quién es quién cuando la lista cambia.
          
          Sin track, Angular no sabría si un elemento es nuevo, movido o eliminado.
          Es como un recepcionista con amnesia: no sabría quién ya llegó.
        -->
        @for (link of navLinks; track link) {
          <!--
            Interpolación {{ link }}:
            Cada iteración crea un <a> con el texto del link
            Resultado: <a href="#">Inicio</a> <a href="#">Proyectos</a> <a href="#">Contacto</a>
            
            ANÁLOGÍA: Es como un "relleno automático" de formularios.
            {{ link }} se reemplaza por el valor actual del link en cada iteración.
          -->
          <a href="#">{{ link }}</a>
        }
      </nav>
    </header>
  `,

  // styles: CSS que solo se aplica a ESTE componente
  // ANÁLOGÍA: Es como pintar solo una habitación de una casa.
  // Los colores no se "filtran" a las otras habitaciones.
  //
  // Los estilos scoped usan un atributo único (ej: _nghost-abc123)
  // que Angular agrega automáticamente a cada elemento del componente.
  // Así, CSS como "header { ... }" solo afecta los headers de ESTE componente.
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
  // ANÁLOGÍA: Es como una lista de ingredientes obligatorios.
  // Si el restaurante no tiene "title", no puede mostrar el letrero.
  //
  // El ! (non-null assertion) le dice a TypeScript: "confía en mí,
  // este valor siempre va a tener un valor después del constructor"
  // Es como decir "sé que este campo no estará vacío cuando se use".
  @Input({ required: true }) title!: string;

  // @Input() para arrays: funciona igual que para strings
  // El padre pasa ['Inicio', 'Proyectos', 'Contacto']
  // y el template itera con @for
  //
  // ANÁLOGÍA: Es como recibir una lista de platos del menú.
  // El chef (template) recibe la lista y crea un plato por cada ítem.
  @Input({ required: true }) navLinks!: string[];
}
