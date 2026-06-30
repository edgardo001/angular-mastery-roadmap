// =============================================================================
// ARCHIVO: app.component.ts
// PROPÓSITO: Componente raíz que muestra los componentes Button y Card
// =============================================================================
//
// Este componente es el "escaparate" de la app: muestra los componentes
// documentados con Storybook en un layout simple.
//
// ¿Por qué existe si Storybook ya muestra los componentes?
// Porque la app también funciona SIN Storybook. Este componente
// permite ver los componentes en la app real, no solo en Storybook.
//
// Es como tener el catálogo (Storybook) Y la tienda (la app):
// - Storybook: para diseñadores y desarrolladores
// - App: para el usuario final
// =============================================================================

// Component: Decorador de Angular
import { Component } from '@angular/core';

// Importa los componentes que se van a mostrar
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,

  // imports: Los componentes Button y Card se importan para usarlos en el template.
  // Es como importar piezas LEGO antes de construir algo con ellas.
  imports: [ButtonComponent, CardComponent],

  template: `
    <h1>Storybook — Button & Card</h1>
    <p class="subtitle">Componentes documentados con Storybook</p>

    <!-- SECCIÓN: BOTONES -->
    <section>
      <h2>Botones</h2>
      <!--
        <app-button>: Uso del componente Button.
        
        label="Primary": Pasa el texto del botón (prop string).
        variant="primary": Pasa el estilo (prop con tipo restringido).
        (clicked)="log('Primary clicked')": Escucha el evento click.
        
        Cuando el usuario hace clic, ejecuta log('Primary clicked').
      -->
      <app-button label="Primary" variant="primary" (clicked)="log('Primary clicked')" />
      <app-button label="Secondary" variant="secondary" (clicked)="log('Secondary clicked')" />
    </section>

    <!-- SECCIÓN: TARJETAS -->
    <section>
      <h2>Tarjetas</h2>
      <!-- Tarjeta sin imagen (solo texto) -->
      <app-card title="Angular 22" description="Última versión del framework" />
      <!-- Tarjeta con imagen -->
      <app-card title="Storybook" description="Herramienta de documentación" imageUrl="https://picsum.photos/seed/storybook/400/200" />
    </section>

    <!--
      @if: Control flow que muestra el último mensaje de acción.
      Solo se muestra si lastAction tiene valor (no es string vacío).
    -->
    @if (lastAction) {
      <div class="log">{{ lastAction }}</div>
    }
  `,

  styles: [`
    h1 { text-align: center; margin-bottom: .25rem; }
    .subtitle { text-align: center; color: #666; margin-bottom: 2rem; }
    section { margin-bottom: 2rem; }
    section h2 { margin-bottom: 1rem; }
    app-button { margin-right: .5rem; }
    app-card { display: inline-block; width: 280px; margin-right: 1rem; vertical-align: top; }
    .log { margin-top: 1rem; padding: .75rem; background: #e3f2fd; border-radius: 6px; font-size: .875rem; }
  `]
})
export class AppComponent {
  // Almacena el último mensaje de acción (cuando el usuario hace clic en un botón)
  lastAction = '';

  // Método que se ejecuta cuando un botón emite el evento clicked.
  // Actualiza lastAction con el mensaje recibido, que se muestra en el template.
  log(msg: string) { this.lastAction = msg; }
}
