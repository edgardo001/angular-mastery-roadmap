// ──────────────────────────────────────────────
// hero.component.ts — Sección principal del portfolio
// ──────────────────────────────────────────────
//
// HeroComponent demuestra:
// 1. @Input() → recibir datos del componente padre
// 2. @Output() + EventEmitter → enviar eventos al padre
// 3. Event binding (click) → escuchar clicks del usuario
// 4. Template con interpolación y eventos
//
// Flujo de datos:
//   AppComponent → [name], [role], [tagline] → HeroComponent  (datos bajan)
//   AppComponent ← (notify) ← HeroComponent                    (evento sube)

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
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

  // Estilos scoped: gradient de fondo, botón interactivo
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
  @Input({ required: true }) name!: string;
  @Input({ required: true }) role!: string;
  @Input({ required: true }) tagline!: string;

  // @Output(): crea un EventEmitter que puede enviar datos al padre
  // EventEmitter<string>: el tipo de dato que envía es string
  //
  // Uso en el template:
  //   notify.emit('mensaje') → envía 'mensaje' al padre
  //
  // Uso en el padre (AppComponent):
  //   <app-hero (notify)="onNotify($event)" />
  //   onNotify(msg: string) { alert(msg); }
  @Output() notify = new EventEmitter<string>();
}
