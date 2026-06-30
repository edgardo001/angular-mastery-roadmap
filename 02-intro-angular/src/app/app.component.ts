// ──────────────────────────────────────────────
// app.component.ts — Componente raíz de la aplicación
// ──────────────────────────────────────────────
//
// AppComponent es el "tronco" del árbol de componentes.
// Todos los demás componentes son hijos de este.
//
// Responsabilidades:
// 1. Contener y organizar los componentes hijos
// 2. Mantener el estado global de la aplicación
// 3. Manejar eventos que vienen de los hijos
//
// Flujo de datos en Angular:
//   Padre → [property] → Hijo  (datos bajan con @Input)
//   Padre ← (event) ← Hijo    (eventos suben con @Output)

import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  // standalone: true es el default en Angular 22, pero se puede omitir
  standalone: true,

  // imports: lista de componentes que este componente usa en su template
  // Angular necesita saber qué componentes están disponibles
  // En Angular con NgModules, esto se hacía en declarations[]
  imports: [HeaderComponent, HeroComponent, FooterComponent],

  // Template inline: HTML del componente
  // Cada tag personalizada (<app-header>, <app-hero>, etc.)
  // corresponde a un componente importado
  template: `
    <!--
      Property binding: [title]="pageTitle"
      - [title] → propiedad del componente hijo (@Input)
      - pageTitle → variable de este componente
      - Flujo: AppComponent → HeaderComponent (dato baja)
    -->
    <app-header [title]="pageTitle" [navLinks]="navLinks" />

    <!--
      HeroComponent recibe datos (@Input) Y envía eventos (@Output)
      - [name], [role], [tagline] → datos que bajan al hijo
      - (notify) → evento que sube del hijo al padre
    -->
    <app-hero
      [name]="userName"
      [role]="userRole"
      [tagline]="tagline"
      (notify)="onNotify($event)"
    />

    <!--
      FooterComponent solo recibe datos (@Input)
      No envía eventos porque es un componente pasivo
    -->
    <app-footer [year]="currentYear" [company]="companyName" />
  `,
})
export class AppComponent {
  // ─── Estado del componente ───
  // Estas propiedades se enlazan al template con interpolación {{ }}
  // o con property binding [property]
  pageTitle = 'Angular Portfolio';
  navLinks = ['Inicio', 'Proyectos', 'Contacto'];
  userName = 'Edgardo';
  userRole = 'Desarrollador Angular';
  tagline = 'Construyendo aplicaciones modernas con Angular 22';
  companyName = 'Angular Mastery';
  currentYear = new Date().getFullYear();

  // ─── Manejo de eventos ───
  // onNotify recibe el mensaje que HeroComponent emitió con @Output
  // $event es el string que HeroComponent envió: emit('¡Gracias por visitar mi portfolio!')
  //
  // Flujo completo:
  // 1. Usuario hace click en "Contáctame" (hero.component.ts)
  // 2. HeroComponent ejecuta: notify.emit('¡Gracias por visitar mi portfolio!')
  // 3. Angular detecta el evento (notify) y llama onNotify($event)
  // 4. onNotify recibe el string y ejecuta alert()
  onNotify(msg: string) {
    alert(msg);
  }
}
