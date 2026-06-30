/**
 * Componente raíz de la aplicación de WebSockets.
 *
 * Este componente actúa como el contenedor principal, similar a la
 * carcasa de un televisor que muestra el contenido.
 *
 * @Component — Decorador que define un componente Angular.
 *   - selector: 'app-root' — Etiqueta HTML para usar este componente (<app-root>).
 *   - standalone: true — No necesita módulos NgModule. Trae todo lo que necesita.
 *   - imports: [ChatComponent] — Importa el componente hijo que contiene el chat.
 *     En standalone, los componentes hijos se importan directamente aquí.
 *
 * Analogía: Este componente es como la pantalla principal de una app de celular
 * que solo muestra el título y carga el componente de chat.
 */
import { Component } from '@angular/core';
import { ChatComponent } from './chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponent],
  template: `
    <h1>WebSockets con RxJS</h1>
    <p class="subtitle">Chat en tiempo real usando <code>webSocket</code> con reconexión automática</p>
    <app-chat />
  `,
  styles: [`
    h1 { text-align: center; margin-bottom: .25rem; }
    .subtitle { text-align: center; color: #666; margin-bottom: 2rem; }
    code { background: #e8e8e8; padding: .125rem .375rem; border-radius: 4px; font-size: .875rem; }
  `]
})
export class AppComponent {}
