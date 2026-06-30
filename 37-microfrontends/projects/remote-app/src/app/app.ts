/**
 * Componente raíz de la Remote App (microaplicación remota).
 *
 * Esta app se ejecuta independientemente en el puerto 4201.
 * Expone componentes via Module Federation para que el Shell los consuma.
 * Cuando corre dentro del Shell, este componente no se ve — solo se ven
 * los componentes que expone (RemoteFeatureComponent).
 *
 * standalone: true — No necesita NgModule, se configura a sí mismo.
 *
 * Analogía: La Remote App es como una tienda en línea independiente.
 *   Tiene su propio catálogo (componentes expuestos), su propio servidor
 *   (puerto 4201), y el Shell es como un agregador que muestra productos
 *   de múltiples tiendas en un solo lugar.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div style="padding: 20px; background: #16213e; color: white; min-height: 100vh;">
      <h2>Remote Application</h2>
      <p>Esta es la aplicación remota. Puerto: 4201</p>
      <p>Expone componentes via Module Federation para que el Shell los consuma.</p>
      <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 8px;">
        <h4>Lo que expone este remote:</h4>
        <ul>
          <li><code>./RemoteFeature</code> → <code>RemoteFeatureComponent</code></li>
          <li>El Shell lo carga dinámicamente al navegar a <code>/remote</code></li>
          <li>No necesita copiar código — se descarga del remote en runtime</li>
        </ul>
      </div>
    </div>
  `,
})
export class AppComponent {
  title = 'remote-app';
}
