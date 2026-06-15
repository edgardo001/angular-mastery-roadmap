import { Component } from '@angular/core';
import { ThreeJsViewerComponent } from './viewer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ThreeJsViewerComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>Three.js 3D Viewer</h1>
        <p>Angular 22 + Three.js with OrbitControls</p>
      </header>
      <div class="viewer-container">
        <app-viewer />
      </div>
    </div>
  `,
  styles: [`
    .app-container { display: flex; flex-direction: column; height: 100vh; background: #0f172a; color: white; }
    header { padding: 1rem 2rem; text-align: center; }
    header h1 { font-size: 1.5rem; }
    header p { color: #94a3b8; font-size: 0.875rem; }
    .viewer-container { flex: 1; overflow: hidden; }
  `]
})
export class App {}
