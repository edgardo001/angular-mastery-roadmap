import { Component, ElementRef, OnInit, OnDestroy, viewChild } from '@angular/core';
import type * as THREE from 'three';
import { RendererService } from './renderer.service';
import { SceneService } from './scene.service';
import { ObjectsService } from './objects.service';

@Component({
  selector: 'app-viewer',
  standalone: true,
  template: `
    <div class="viewer-wrapper">
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
  readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private animationFrameId = 0;

  constructor(
    private rendererService: RendererService,
    private sceneService: SceneService,
    private objectsService: ObjectsService
  ) {}

  ngOnInit() {
    requestAnimationFrame(() => this.initScene());
  }

  private initScene() {
    const canvasEl = this.canvas().nativeElement;
    const renderer = this.rendererService.createRenderer(canvasEl);
    const { scene, camera, controls } = this.sceneService.createScene(canvasEl);

    this.objectsService.createDemoScene(scene);
    this.resize();
    this.animate(renderer, scene, camera, controls);
  }

  private animate(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    controls: any
  ) {
    this.objectsService.animate();
    controls.update();
    renderer.render(scene, camera);
    this.animationFrameId = requestAnimationFrame(() => this.animate(renderer, scene, camera, controls));
  }

  onResize() {
    this.resize();
  }

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

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
  }
}
