// ============================================================
// app.ts — Componente raíz de la app Three.js
// ============================================================
// Este componente es el contenedor principal que muestra el encabezado
// y el visor 3D. Es como la "caja" que contiene la ventana al mundo 3D.

import { Component } from '@angular/core';

// ThreeJsViewerComponent: el componente que muestra el canvas 3D.
// Se carga bajo demanda con @defer para reducir el bundle inicial.
import { ThreeJsViewerComponent } from './viewer';

@Component({
  selector: 'app-root',
  standalone: true,

  // imports: incluye ThreeJsViewerComponent para usar <app-viewer />.
  // Con @defer, Angular separa este componente en un chunk lazy-loaded.
  imports: [ThreeJsViewerComponent],

  template: `
    <div class="app-container">
      <header>
        <h1>Three.js 3D Viewer</h1>
        <p>Angular 22 + Three.js with OrbitControls</p>
      </header>
      <!-- @defer: carga diferida del componente 3D.
           on viewport = se carga cuando el placeholder entra en el viewport del usuario.
           Esto reduce el bundle inicial de ~700kB a ~50kB (solo Angular core).
           El componente 3D + Three.js se descarga bajo demanda. -->
      @defer (on viewport) {
        <div class="viewer-container">
          <app-viewer />
        </div>
      } @placeholder {
        <!-- Placeholder: se muestra mientras el componente 3D se carga.
             Evita layout shift y da feedback visual al usuario. -->
        <div class="viewer-container viewer-placeholder">
          <p>Loading 3D viewer...</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .app-container { display: flex; flex-direction: column; height: 100vh; background: #0f172a; color: white; }
    header { padding: 1rem 2rem; text-align: center; }
    header h1 { font-size: 1.5rem; }
    header p { color: #94a3b8; font-size: 0.875rem; }
    .viewer-container { flex: 1; overflow: hidden; }
    .viewer-placeholder { display: flex; align-items: center; justify-content: center; color: #64748b; }
  `]
})
export class App {}
