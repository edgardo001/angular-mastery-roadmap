// ──────────────────────────────────────────────
// hero.component.ts — Sección principal del portfolio
// ──────────────────────────────────────────────
//
// ANÁLOGÍA DEL MUNDO REAL:
// Imagina que HeroComponent es como el "cartel principal" de una tienda.
// El dueño (AppComponent) le dice qué texto poner en el cartel,
// y cuando un cliente hace click en "Contáctame", el cartel le avisa
// al dueño que alguien quiere comunicarse.
//
// HeroComponent demuestra:
// 1. @Input() → recibir datos del componente padre (como recibir instrucciones)
// 2. @Output() + EventEmitter → enviar eventos al padre (como presionar un botón de emergencia)
// 3. Event binding (click) → escuchar clicks del usuario (como un sensor de presión)
// 4. Template con interpolación y eventos (como un formulario dinámico)
//
// Flujo de datos:
//   AppComponent → [name], [role], [tagline] → HeroComponent  (datos bajan como lluvia)
//   AppComponent ← (notify) ← HeroComponent                    (evento sube como humo)

import { Component, Input, Output, EventEmitter } from '@angular/core';

// @Component: Decorador que le dice a Angular "esta clase es un componente"
//
// ANÁLOGÍA: Es como una etiqueta de nombre en una oficina.
// Sin la etiqueta, no sabrías quién es quién o qué hace cada persona.
//
// El decorador tiene varias propiedades importantes:
//   - selector: nombre HTML del componente (como 'app-hero')
//   - standalone: true significa que este componente no necesita un NgModule
//   - template: el HTML que el componente muestra en pantalla
//   - styles: los CSS que se aplican SOLO a este componente
@Component({
  // selector: 'app-hero' → cómo se usa este componente en HTML
  // Es como un "apodo" del componente. En el template del padre verás:
  //   <app-hero></app-hero>
  // Angular reemplaza esto con el template de este componente.
  selector: 'app-hero',

  // standalone: true → este componente es independiente
  // No necesita ser declarado en un NgModule.
  // Es como un empleado que trabaja desde casa: no necesita una oficina física.
  standalone: true,

  // template: el HTML que se muestra cuando se usa <app-hero>
  // Es como el "disfraz" del componente: le da apariencia visual.
  template: `
    <section>
      <!--
        Interpolación con interpolación dentro:
        {{ name }} se reemplaza por el valor de name
        Ejemplo: <h2>Hola, soy <span>Edgardo</span></h2>
      -->
      <h2>Hola, soy <span>{{ name }}</span></h2>

      <!--
        Interpolación simple: {{ role }} → 'Desarrollador Angular'
        Cada {{ }} se reemplaza una sola vez. Si el valor cambia,
        Angular actualiza automáticamente el DOM (reactividad).
      -->
      <p class="role">{{ role }}</p>
      <p class="tagline">{{ tagline }}</p>

      <!--
        Event binding: (click)="expresión"
        - (click) → escucha el evento click del botón
        - notify.emit('...') → llama al EventEmitter y envía un mensaje
        - El mensaje llega al padre (AppComponent) como $event
        - El padre ejecuta onNotify($event) que muestra un alert

        Flujo completo:
        1. Usuario hace click
        2. Angular ejecuta: notify.emit('¡Gracias por visitar mi portfolio!')
        3. Angular detecta el binding (notify)="onNotify($event)"
        4. Llama onNotify('¡Gracias por visitar mi portfolio!')
        5. AppComponent ejecuta alert('¡Gracias por visitar mi portfolio!')
      -->
      <button (click)="notify.emit('¡Gracias por visitar mi portfolio!')">
        Contáctame
      </button>
    </section>
  `,

  // styles: CSS que solo se aplica a ESTE componente
  // ANÁLOGÍA: Es como pintar solo una habitación de una casa.
  // Los colores no se "filtran" a las otras habitaciones.
  //
  // Los estilos scoped usan un atributo único (ej: _nghost-abc123)
  // que Angular agrega automáticamente a cada elemento del componente.
  // Así, CSS como "section { ... }" solo afecta las secciones de ESTE componente.
  styles: [`
    section { text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
    h2 { font-size: 2.5rem; margin-bottom: 0.5rem; }
    span { color: #fdd835; }
    .role { font-size: 1.25rem; opacity: 0.9; margin-bottom: 0.5rem; }
    .tagline { font-size: 1rem; opacity: 0.8; margin-bottom: 2rem; }
    button { padding: 0.75rem 2rem; border: none; border-radius: 8px;
             background: white; color: #1a1a2e; font-size: 1rem;
             cursor: pointer; font-weight: 600; }
    button:hover { transform: scale(1.05); }
  `]
})
export class HeroComponent {
  // @Input({ required: true }): estos 3 datos son obligatorios
  // El componente no puede funcionar sin ellos
  //
  // ANÁLOGÍA: Es como un restaurante que necesita ingredientes para cocinar.
  // Si no tienes (name), (role) y (tagline), no puedes "cocinar" el contenido.
  //
  // El { required: true } le dice a Angular: "si el padre no pasa esto,
  // ¡lanza un error de compilación!". Es como una receta que dice
  // "necesitas estos 3 ingredientes, no puedes cocinar sin ellos".
  @Input({ required: true }) name!: string;
  @Input({ required: true }) role!: string;
  @Input({ required: true }) tagline: string;

  // @Output(): crea un EventEmitter que puede enviar datos al padre
  // EventEmitter<string>: el tipo de dato que envía es string
  //
  // ANÁLOGÍA: Es como un timbre de puerta.
  // Cuando alguien presiona el botón (notify.emit), suena el timbre
  // y el dueño (AppComponent) recibe la señal.
  //
  // El ! (non-null assertion) le dice a TypeScript:
  // "confía en mí, este valor siempre va a tener un valor después del constructor"
  // Es como decir "sé que este campo no estará vacío cuando se use".
  //
  // Uso en el template:
  //   notify.emit('mensaje') → envía 'mensaje' al padre
  //
  // Uso en el padre (AppComponent):
  //   <app-hero (notify)="onNotify($event)" />
  //   onNotify(msg: string) { alert(msg); }
  @Output() notify = new EventEmitter<string>();
}
