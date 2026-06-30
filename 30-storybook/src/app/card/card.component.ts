// =============================================================================
// ARCHIVO: card.component.ts
// PROPÓSITO: Componente reutilizable de tarjeta (Card) documentado con Storybook
// =============================================================================
//
// Este es un componente de UI puro: muestra una tarjeta con imagen opcional,
// título y descripción. Está diseñado para ser reutilizado en toda la app.
//
// ¿Qué es un componente "presentacional"?
// Es como una plantilla de PowerPoint: solo muestra datos, no tiene
// lógica de negocio. Recibe datos por input y los presenta bonitos.
//
// Storybook permite ver este componente aislado del resto de la app,
// probando diferentes configuraciones (con imagen, sin imagen, texto largo).
// =============================================================================

// Component: Decorador de Angular que define un componente
// input: Función para crear propiedades de entrada reactivas (signals)
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,

  template: `
    <div class="card">
      <!--
        @if: Control flow de Angular que reemplaza *ngIf.
        Solo muestra la imagen si imageUrl() tiene valor (no es string vacío).
        imageUrl() es una signal: se lee como una función con paréntesis.
      -->
      @if (imageUrl()) {
        <!--
          [src]="imageUrl()": Binding de atributo.
          El corchete [] indica que el valor es una expresión JavaScript,
          no un string literal. imageUrl() lee el valor de la signal.
        -->
        <img [src]="imageUrl()" [alt]="title()" />
      }
      <!--
        {{ title() }}: Interpolación de Angular.
        Inserta el valor de la signal title() como texto dentro del <h3>.
        Es como un marcador de posición que se llena con datos reales.
      -->
      <h3>{{ title() }}</h3>
      <p>{{ description() }}</p>
      
      <!--
        <ng-content />: Proyección de contenido (Content Projection).
        Es como un "hueco" donde los PADRES pueden insertar contenido.
        
        Ejemplo: Si uso <app-card><span>Hola</span></app-card>,
        el <span>Hola</span> aparecería aquí, dentro de ng-content.
        
        Es como un molde de Jell-O: tú defines la forma (el componente)
        y quien lo usa llena el contenido.
      -->
      <ng-content />
    </div>
  `,

  styles: [`
    .card { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,.08); }
    img { width: 100%; border-radius: 4px; margin-bottom: .75rem; }
    h3 { margin: 0 0 .25rem; font-size: 1.1rem; }
    p { color: #555; font-size: .875rem; line-height: 1.5; }
  `]
})
export class CardComponent {
  // input(): Crea una propiedad de entrada (prop) reactiva.
  // Es como un "parámetro" que los padres pueden pasar al componente.
  //
  // readonly: No se puede reasignar después de la inicialización.
  // input(''): Crea la signal con un valor por defecto (string vacío).
  //
  // Diferencia con @Input() decorador:
  // - input() es más moderno, type-safe, y funciona con signals
  // - @Input() es la forma tradicional (aún funciona, pero es más verboso)
  //
  // Ejemplo de uso:
  // <app-card [title]="'Mi Tarjeta'" [description]="'Descripción'" />
  readonly title = input('');
  readonly description = input('');
  readonly imageUrl = input('');
}
