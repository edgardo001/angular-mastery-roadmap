import { Injectable, ElementRef, signal, WritableSignal } from '@angular/core';
import * as THREE from 'three';

@Injectable({ providedIn: 'root' })
export class RendererService {
  renderer: WritableSignal<THREE.WebGLRenderer | null> = signal(null);

  createRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    this.renderer.set(renderer);
    return renderer;
  }

  resize(renderer: THREE.WebGLRenderer, width: number, height: number) {
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  render(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
    renderer.render(scene, camera);
  }
}
