// ============================================================
// renderer.service.ts — Servicio de renderizado 3D
// ============================================================
// El renderer es el "motor de dibujo" de Three.js: toma la escena
// (objetos, luces, cámara) y la dibuja en el canvas del navegador.
// Es como una impresora 3D: convierte un modelo digital en algo visible.

import { Injectable, ElementRef, signal, WritableSignal } from '@angular/core';

// Named imports de Three.js: solo lo que este servicio necesita.
// WebGLRenderer: motor de dibujo WebGL para gráficos 3D.
// PCFSoftShadowMap: tipo de sombra suave (Percentage Closer Filtering).
// ACESFilmicToneMapping: estándar cinematográfico para colores naturales.
import {
  WebGLRenderer,
  PCFSoftShadowMap,
  ACESFilmicToneMapping,
  Scene,
  Camera
} from 'three';

@Injectable({ providedIn: 'root' })
export class RendererService {
  // renderer: almacena la instancia del motor de renderizado.
  renderer: WritableSignal<WebGLRenderer | null> = signal(null);

  // createRenderer: crea y configura el motor de renderizado.
  createRenderer(canvas: HTMLCanvasElement): WebGLRenderer {
    // WebGLRenderer: el motor de dibujo de Three.js usando WebGL.
    // WebGL es la tecnología del navegador para gráficos 3D acelerados por GPU.
    const renderer = new WebGLRenderer({
      canvas,          // El elemento canvas donde dibujará
      antialias: true, // Suaviza los bordes de los objetos (menos "pixelado")
      alpha: false     // No transparencia de fondo
    });

    // setPixelRatio: ajusta la nitidez según la pantalla del dispositivo.
    // Math.min(window.devicePixelRatio, 2) limita a 2x para no sobrecargar.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // shadowMap: habilita las sombras en la escena.
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;  // Sombras suaves

    // toneMapping: ajusta los colores para que se vean más naturales.
    // ACESFilmicToneMapping es un estándar de la industria cinematográfica.
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;  // Exposición de la luz

    this.renderer.set(renderer);
    return renderer;
  }

  // resize: ajusta el tamaño del canvas cuando la ventana cambia.
  resize(renderer: WebGLRenderer, width: number, height: number) {
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  // render: dibuja la escena desde la perspectiva de la cámara.
  // Este método se llama ~60 veces por segundo en el bucle de animación.
  render(renderer: WebGLRenderer, scene: Scene, camera: Camera) {
    renderer.render(scene, camera);
  }
}
