/**
 * COMPONENTE CARD COMPARTIDO (CardComponent)
 * ===========================================
 *
 * Componente reutilizable que muestra contenido dentro de una tarjeta.
 * Es como un "contenedor decorativo" que puede envolver cualquier contenido.
 *
 * ANÁLOGÍA: Es como un marco de foto. Puedes poner cualquier foto dentro,
 * y el marco siempre se verá igual de bueno.
 *
 * PALABRAS CLAVE:
 * - <ng-content />: Proyección de contenido - inserta el contenido del padre
 * - standalone: true: El componente es autocontenido (no necesita NgModule)
 *
 * ¿CÓMO FUNCIONA?
 * Cuando usas <app-card><p>Hola</p></app-card>, el contenido <p>Hola</p>
 * se inserta donde está <ng-content />. Es como un "espacio reservado".
 */

// Component: Decorador del componente
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  // Template que envuelve el contenido en una tarjeta estilizada
  template: `
    <div class="card">
      <!-- ng-content: Inserta el contenido del componente padre -->
      <!-- Es como un "espacio reservado" que se llena con contenido externo -->
      <ng-content />
    </div>
  `,
  styles: [`
    .card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
  `]
})
// CardComponent: Componente vacío que solo muestra contenido
export class CardComponent {}
