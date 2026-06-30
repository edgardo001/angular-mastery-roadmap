// ============================================================
// objects.service.ts — Servicio de objetos 3D
// ============================================================
// Este servicio crea y maneja los objetos 3D de la escena.
// Cada objeto tiene una geometría (su forma), un material (su color/textura)
// y una posición en el espacio 3D. Es como un catálogo de piezas de LEGO:
// cada pieza tiene forma, color y posición.

import { Injectable, signal, WritableSignal } from '@angular/core';

// THREE: la librería Three.js.
import * as THREE from 'three';

// AnimatedObject: define un objeto que se mueve (rota) en la escena.
export interface AnimatedObject {
  mesh: THREE.Mesh;        // El objeto 3D (geometría + material)
  speed: number;           // Qué tan rápido rota
  axis: 'x' | 'y' | 'z'; // Eje de rotación
}

@Injectable({ providedIn: 'root' })
export class ObjectsService {
  // animatedObjects: lista de objetos que se animan (rotan).
  animatedObjects: WritableSignal<AnimatedObject[]> = signal([]);

  // createDemoScene: crea la escena de demostración con cubos, suelo y cuadrícula.
  createDemoScene(scene: THREE.Scene) {
    // GridHelper: una cuadrícula en el suelo que ayuda a orientarse.
    // Parámetros: tamaño, divisiones, color de las líneas, color del centro.
    const gridHelper = new THREE.GridHelper(20, 20, 0x3b82f6, 0x1e293b);
    scene.add(gridHelper);

    const objects: AnimatedObject[] = [];

    // Definición de los cubos: cada uno tiene color, posición, velocidad y eje.
    const shapes = [
      { color: 0x3b82f6, pos: [-3, 0.5, 0], speed: 0.01, axis: 'y' as const },
      { color: 0x22c55e, pos: [0, 0.5, 0], speed: 0.015, axis: 'x' as const },
      { color: 0xef4444, pos: [3, 0.5, 0], speed: 0.02, axis: 'z' as const },
      { color: 0xeab308, pos: [-1.5, 0.5, 3], speed: 0.012, axis: 'y' as const },
      { color: 0xa855f7, pos: [1.5, 0.5, 3], speed: 0.018, axis: 'x' as const },
    ];

    for (const shape of shapes) {
      // BoxGeometry: define la forma del cubo (1x1x1 unidad).
      const geometry = new THREE.BoxGeometry(1, 1, 1);

      // MeshStandardMaterial: material que reacciona a las luces.
      // roughness: qué tan "rugoso" es (0 = espejo, 1 = mate).
      // metalness: qué tan metálico es (0 = plástico, 1 = metal).
      const material = new THREE.MeshStandardMaterial({
        color: shape.color,
        roughness: 0.3,
        metalness: 0.7,
        envMapIntensity: 0.5
      });

      // Mesh: combina geometría + material = un objeto 3D visible.
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(shape.pos[0], shape.pos[1], shape.pos[2]);
      mesh.castShadow = true;  // Este objeto proyecta sombras
      scene.add(mesh);

      objects.push({ mesh, speed: shape.speed, axis: shape.axis });

      // EdgesGeometry + LineBasicMaterial: dibuja las aristas del cubo
      // como líneas blancas semi-transparentes (efecto estético).
      const edges = new THREE.EdgesGeometry(geometry);
      const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      mesh.add(wireframe);  // wireframe es "hijo" del mesh (se mueve con él)
    }

    // Crea el suelo de la escena.
    this.createFloor(scene);

    // Guarda los objetos animados en el signal.
    this.animatedObjects.set(objects);
  }

  // createFloor: crea un suelo plano que recibe sombras.
  private createFloor(scene: THREE.Scene) {
    // PlaneGeometry: un plano rectangular de 20x20 unidades.
    const floorGeom = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
      metalness: 0.1,
      transparent: true,
      opacity: 0.8
    });
    const floor = new THREE.Mesh(floorGeom, floorMat);
    floor.rotation.x = -Math.PI / 2;  // Rota 90° para que sea horizontal
    floor.position.y = -0.5;           // Lo pone debajo de los cubos
    floor.receiveShadow = true;        // Este suelo recibe sombras
    scene.add(floor);
  }

  // animate: rota cada objeto animado en su eje correspondiente.
  // Se llama ~60 veces por segundo desde el bucle de animación.
  animate() {
    for (const obj of this.animatedObjects()) {
      // rotation[obj.axis] += obj.speed: incrementa la rotación en el eje indicado.
      // Es como girar una peña: cada objeto gira a su velocidad y en su dirección.
      obj.mesh.rotation[obj.axis] += obj.speed;
    }
  }
}
