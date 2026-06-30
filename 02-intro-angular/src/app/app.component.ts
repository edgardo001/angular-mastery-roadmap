// ──────────────────────────────────────────────
// app.component.ts — Componente raíz de la aplicación
// ──────────────────────────────────────────────
//
// ANÁLOGÍA DEL MUNDO REAL:
// AppComponent es como el "Director General" de una empresa.
// Tiene las decisiones importantes (estado), organiza a los empleados
// (componentes hijos) y recibe reportes de ellos (eventos).
//
// AppComponent es el "tronco" del árbol de componentes.
// Todos los demás componentes son hijos de este.
//
// Responsabilidades:
// 1. Contener y organizar los componentes hijos (como un gerente que organiza su equipo)
// 2. Mantener el estado global de la aplicación (como un director que conoce todos los números)
// 3. Manejar eventos que vienen de los hijos (como un jefe que recibe quejas de clientes)
//
// Flujo de datos en Angular:
//   Padre → [property] → Hijo  (datos bajan con @Input - como dar instrucciones)
//   Padre ← (event) ← Hijo    (eventos suben con @Output - como recibir reportes)

import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';

// @Component: Decorador que le dice a Angular "esta clase es un componente"
//
// ANÁLOGÍA: Es como una "ficha de empleado" que describe:
// - Qué nombre tiene (selector)
// - Qué habilidades tiene (imports)
// - Cómo se ve (template)
// - Cómo se viste (styles)
@Component({
  selector: 'app-root',
  // standalone: true es el default en Angular 22, pero se puede omitir
  // ANÁLOGÍA: Es como un empleado que puede trabajar sin supervisión directa.
  standalone: true,

  // imports: lista de componentes que este componente usa en su template
  // Angular necesita saber qué componentes están disponibles
  // En Angular con NgModules, esto se hacía en declarations[]
  //
  // ANÁLOGÍA: Es como la "lista de herramientas" de un carpintero.
  // Si quiere usar un martillo (HeaderComponent), lo pone en la caja de herramientas.
  // Sin esto, no podría usar ninguno de estos componentes en su template.
  imports: [HeaderComponent, HeroComponent, FooterComponent],

  // Template inline: HTML del componente
  // Cada tag personalizada (<app-header>, <app-hero>, etc.)
  // corresponde a un componente importado
  //
  // ANÁLOGÍA: Es como el "plano de construcción" de una casa.
  // Cada habitación (<app-header>, <app-hero>, etc.) está dibujada aquí.
  template: `
    <!--
      Property binding: [title]="pageTitle"
      - [title] → propiedad del componente hijo (@Input)
      - pageTitle → variable de este componente
      - Flujo: AppComponent → HeaderComponent (dato baja)
      
      ANÁLOGÍA: Es como pasar un mensaje de un empleado a otro.
      El gerente (AppComponent) dice: "Oye, pon este título en el letrero".
      El brackets [] significan "esto es una propiedad del componente hijo".
    -->
    <app-header [title]="pageTitle" [navLinks]="navLinks" />

    <!--
      HeroComponent recibe datos (@Input) Y envía eventos (@Output)
      - [name], [role], [tagline] → datos que bajan al hijo
      - (notify) → evento que sube del hijo al padre
      
      ANÁLOGÍA: Es como una conversación bidireccional.
      El gerente le dice al empleado qué poner en el cartel (datos bajan),
      y el empleado le avisa al gerente cuando alguien hace click (evento sube).
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
      
      ANÁLOGÍA: Es como un letrero estático en la entrada.
      Solo muestra información, no interactúa con nadie.
    -->
    <app-footer [year]="currentYear" [company]="companyName" />
  `,
})
export class AppComponent {
  // ─── Estado del componente ───
  // Estas propiedades se enlazan al template con interpolación {{ }}
  // o con property binding [property]
  //
  // ANÁLOGÍA: Es como las "variables de control" de un panel de mandos.
  // El director tiene estos valores y los pasa a los empleados que los necesitan.
  pageTitle = 'Angular Portfolio';
  navLinks = ['Inicio', 'Proyectos', 'Contacto'];
  userName = 'Edgardo';
  userRole = 'Desarrollador Angular';
  tagline = 'Construyendo aplicaciones modernas con Angular 22';
  companyName = 'Angular Mastery';
  // new Date().getFullYear(): obtiene el año actual (ej: 2026)
  // Es como un reloj que siempre muestra la hora correcta.
  currentYear = new Date().getFullYear();

  // ─── Manejo de eventos ───
  // onNotify recibe el mensaje que HeroComponent emitió con @Output
  // $event es el string que HeroComponent envió: emit('¡Gracias por visitar mi portfolio!')
  //
  // ANÁLOGÍA: Es como un teléfono en la oficina del director.
  // Cuando suena (evento notify), el director contesta y hace algo (alert).
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
