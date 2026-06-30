/**
 * Componente Home del Shell App.
 *
 * Muestra información sobre la arquitectura Module Federation.
 * Es la página por defecto que se carga al iniciar la aplicación.
 *
 * standalone: true — El componente se define a sí mismo, no necesita
 *   declararse en un NgModule. Es el estándar en Angular 22+.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div style="padding: 20px;">
      <h2>🏠 Shell Application</h2>
      <p>Esta es la aplicación principal (Host). Puerto: 4200</p>
      <p>Usa el menú para navegar al componente remoto.</p>
      <div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 8px;">
        <h4>Module Federation en acción:</h4>
        <ul>
          <li>Shell corre en <code>localhost:4200</code></li>
          <li>Remote corre en <code>localhost:4201</code></li>
          <li>El componente remoto se carga <strong>dinámicamente</strong> al navegar a <code>/remote</code></li>
          <li>Ambas apps comparten dependencias (Angular, RxJS, etc.)</li>
        </ul>
      </div>
    </div>
  `,
})
export class HomeComponent {}
