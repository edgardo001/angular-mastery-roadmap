// ============================================================
// scene.service.ts — Servicio de escena 3D
// ============================================================
// Este servicio maneja la escena de Three.js: el "mundo" donde
// existen los objetos 3D. Incluye la cámara (nuestros "ojos"),
// los controles (cómo nos movemos) y las luces (cómo iluminamos).
//
// Es como el set de una película: tiene la cámara, las luces,
// y el escenario donde ocurre la acción.

import { Injectable, signal, WritableSignal } from '@angular/core';

// THREE: la librería Three.js para gráficos 3D.
import * as THREE from 'three';

// OrbitControls: controles que permiten rotar, hacer zoom y pan
// con el ratón. Es como mover una cámara alrededor de un objeto.
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

@Injectable({ providedIn: 'root' })
export class SceneService {
  // Signals que almacenan los objetos 3D para que otros servicios puedan acceder.
  scene: WritableSignal<THREE.Scene | null> = signal(null);
  camera: WritableSignal<THREE.PerspectiveCamera | null> = signal(null);
  controls: WritableSignal<OrbitControls | null> = signal(null);

  // createScene: configura la escena completa con cámara, controles y luces.
  createScene(canvas: HTMLCanvasElement): { scene: THREE.Scene; camera: THREE.PerspectiveCamera; controls: OrbitControls } {
    // Scene: el contenedor de todos los objetos 3D.
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);  // Color de fondo oscuro

    // PerspectiveCamera: simula la perspectiva humana (los objetos lejanos parecen más pequeños).
    // Parámetros: ángulo de visión, relación de aspecto, plano cercano, plano lejano.
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(5, 5, 10);  // Posición de la cámara en el espacio 3D
    camera.lookAt(0, 0, 0);         // Mira hacia el centro de la escena

    // OrbitControls: permite al usuario rotar, zoom y pan con el ratón.
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;    // Suaviza el movimiento (menos "brusco")
    controls.dampingFactor = 0.05;    // Qué tan suave es el movimiento
    controls.autoRotate = false;      // No rota automáticamente
    controls.target.set(0, 0, 0);    // Punto que la cámara mira

    // Configura las luces de la escena.
    this.setupLights(scene);

    // Guarda los objetos en signals para que otros servicios los usen.
    this.scene.set(scene);
    this.camera.set(camera);
    this.controls.set(controls);

    return { scene, camera, controls };
  }

  // setupLights: configura diferentes tipos de luces para iluminar la escena.
  // Las luces son como las luces de un set de filmación: cada una tiene un propósito.
  private setupLights(scene: THREE.Scene) {
    // AmbientLight: iluminación general suave. Como la luz de un día nublado.
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // DirectionalLight: luz direccional (como el sol). Cre sombras.
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);  // Posición de la "fuente de luz"
    directionalLight.castShadow = true;          // Activa sombras
    directionalLight.shadow.mapSize.width = 2048;  // Resolución de las sombras
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // FillLight: luz de relleno que suaviza las sombras duras.
    const fillLight = new THREE.DirectionalLight(0x8888ff, 0.3);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    // HemisphereLight: simula la luz del cielo (azul arriba, marrón abajo).
    const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x362d59, 0.4);
    scene.add(hemiLight);
  }

  // resizeAspect: ajusta la cámara cuando la ventana cambia de tamaño.
  resizeAspect(camera: THREE.PerspectiveCamera, width: number, height: number) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();  // Recalcula la matriz de proyección
  }
}
