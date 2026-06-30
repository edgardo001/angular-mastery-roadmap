/**
 * ARCHIVO: app.component.ts - Componente raíz de la aplicación
 *
 * Este es el componente "padre" de toda la aplicación. Todos los demás
 * componentes se renderizan dentro de este componente.
 *
 * Analogía: Es como la estructura principal de una casa. Todos los
 * muebles (otros componentes) se colocan dentro de las habitaciones
 * que define esta estructura.
 */

// Component: Decorador de Angular que define las propiedades de un componente.
import { Component } from '@angular/core';

// RouterOutlet: Directiva especial de Angular que muestra el componente
// correspondiente a la URL actual del navegador.
import { RouterOutlet } from '@angular/router';

/**
 * @Component: Decorador que le dice a Angular "esta clase es un componente".
 *
 * Propiedades:
 * - selector: Nombre HTML que se usa para insertar este componente en un template.
 * - standalone: true significa que este componente NO necesita ser declarado en un módulo NgModule.
 * - imports: Lista de componentes/directivas/pipes que este componente usa en su template.
 * - template: El HTML que este componente renderiza (<router-outlet />).
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent {}
