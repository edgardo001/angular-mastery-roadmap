// ============================================================
// viewer.ts — Componente visor 3D con Three.js
// ============================================================
// Este componente es la "ventana" al mundo 3D. Muestra un canvas
// donde Three.js dibuja la escena 3D. Es como una ventana de un
// avión: tú miras a través de ella, y el piloto (Three.js) mueve
// la vista según tus instrucciones (rotar, zoom, pan).

import { Component, ElementRef, OnInit, OnDestroy, viewChild } from '@angular/core';

// type import: solo importa el TIPO de Three.js, no el código.
// Es útil para tipado sin agregar peso al bundle final.
import type * as THREE from 'three';

// Servicios de Three.js: separan la lógica en partes responsables.
import { RendererService } from './renderer.service';   // El "motor" que dibuja
import { SceneService } from './scene.service';          // La "escena" con cámara y luces
import { ObjectsService } from './objects.service';      // Los "objetos" 3D

@Component({
  selector: 'app-viewer',
  standalone: true,

  template: `
    <div class="viewer-wrapper">
      <!-- canvas: el lienzo donde Three.js dibuja. Es como un caballete digital. -->
      <!-- #canvas — referencia local: podemos acceder al elemento DOM desde TypeScript -->
      <!-- (window:resize)="onResize()" — escucha el evento de redimensionar la ventana -->
      <canvas #canvas (window:resize)="onResize()"></canvas>
      <div class="controls-hint">
        Drag to rotate · Scroll to zoom · Right-click to pan
      </div>
    </div>
  `,
  styles: [`
    .viewer-wrapper { position: relative; width: 100%; height: 100%; }
    canvas { display: block; width: 100%; height: 100%; }
    .controls-hint { position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.6); color: white; padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.75rem; pointer-events: none; }
  `]
})
export class ThreeJsViewerComponent implements OnInit, OnDestroy {
  // viewChild: obtiene una referencia al elemento canvas del template.
  // "required" significa que TypeScript garantiza que siempre existirá.
  readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  // ID del requestAnimationFrame para poder cancelarlo al destruir el componente.
  private animationFrameId = 0;

  // Inyectamos los servicios: Angular los crea automáticamente y nos los da.
  constructor(
    private rendererService: RendererService,
    private sceneService: SceneService,
    private objectsService: ObjectsService
  ) {}

  // ngOnInit: se ejecuta cuando el componente está listo.
  ngOnInit() {
    // requestAnimationFrame: espera al siguiente frame de dibujado antes de inicializar.
    // Es como decir "espera a que el navegador esté listo para dibujar".
    requestAnimationFrame(() => this.initScene());
  }

  // initScene: configura la escena 3D completa.
  private initScene() {
    const canvasEl = this.canvas().nativeElement;

    // Crea el renderer (motor de dibujo) vinculado al canvas.
    const renderer = this.rendererService.createRenderer(canvasEl);

    // Crea la escena con cámara y controles.
    const { scene, camera, controls } = this.sceneService.createScene(canvasEl);

    // Crea los objetos 3D de la escena (cubos, suelo, etc.).
    this.objectsService.createDemoScene(scene);

    // Ajusta el tamaño inicial.
    this.resize();

    // Inicia el bucle de animación.
    this.animate(renderer, scene, camera, controls);
  }

  // animate: el "corazón" de la animación 3D.
  // Se ejecuta ~60 veces por segundo (60 FPS) para crear movimiento fluido.
  private animate(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    controls: any
  ) {
    // Mueve los objetos animados (rotación de cubos).
    this.objectsService.animate();

    // Actualiza los controles (zoom, rotación, pan).
    controls.update();

    // Dibuja la escena desde la perspectiva de la cámara.
    renderer.render(scene, camera);

    // Pide al navegador que ejecute este método en el siguiente frame.
    // Es como un loop infinito: dibuja → espera → dibuja → espera → ...
    this.animationFrameId = requestAnimationFrame(() => this.animate(renderer, scene, camera, controls));
  }

  // onResize: se ejecuta cuando el usuario redimensiona la ventana.
  onResize() {
    this.resize();
  }

  // resize: ajusta el tamaño del renderer y la cámara al nuevo tamaño del canvas.
  private resize() {
    const canvasEl = this.canvas()?.nativeElement;
    if (!canvasEl) return;
    const w = canvasEl.clientWidth;
    const h = canvasEl.clientHeight;
    const renderer = this.rendererService.renderer();
    const camera = this.sceneService.camera();
    if (renderer && camera) {
      this.rendererService.resize(renderer, w, h);
      this.sceneService.resizeAspect(camera, w, h);
    }
  }

  // ngOnDestroy: se ejecuta cuando el componente se destruye.
  // cancelAnimationFrame: detiene el bucle de animación para evitar memory leaks.
  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
  }
}
