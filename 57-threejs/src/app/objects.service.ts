import { Injectable, signal, WritableSignal } from '@angular/core';
import * as THREE from 'three';

export interface AnimatedObject {
  mesh: THREE.Mesh;
  speed: number;
  axis: 'x' | 'y' | 'z';
}

@Injectable({ providedIn: 'root' })
export class ObjectsService {
  animatedObjects: WritableSignal<AnimatedObject[]> = signal([]);

  createDemoScene(scene: THREE.Scene) {
    const gridHelper = new THREE.GridHelper(20, 20, 0x3b82f6, 0x1e293b);
    scene.add(gridHelper);

    const objects: AnimatedObject[] = [];

    const shapes = [
      { color: 0x3b82f6, pos: [-3, 0.5, 0], speed: 0.01, axis: 'y' as const },
      { color: 0x22c55e, pos: [0, 0.5, 0], speed: 0.015, axis: 'x' as const },
      { color: 0xef4444, pos: [3, 0.5, 0], speed: 0.02, axis: 'z' as const },
      { color: 0xeab308, pos: [-1.5, 0.5, 3], speed: 0.012, axis: 'y' as const },
      { color: 0xa855f7, pos: [1.5, 0.5, 3], speed: 0.018, axis: 'x' as const },
    ];

    for (const shape of shapes) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({
        color: shape.color,
        roughness: 0.3,
        metalness: 0.7,
        envMapIntensity: 0.5
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(shape.pos[0], shape.pos[1], shape.pos[2]);
      mesh.castShadow = true;
      scene.add(mesh);

      objects.push({ mesh, speed: shape.speed, axis: shape.axis });

      const edges = new THREE.EdgesGeometry(geometry);
      const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      mesh.add(wireframe);
    }

    this.createFloor(scene);
    this.animatedObjects.set(objects);
  }

  private createFloor(scene: THREE.Scene) {
    const floorGeom = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
      metalness: 0.1,
      transparent: true,
      opacity: 0.8
    });
    const floor = new THREE.Mesh(floorGeom, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.5;
    floor.receiveShadow = true;
    scene.add(floor);
  }

  animate() {
    for (const obj of this.animatedObjects()) {
      obj.mesh.rotation[obj.axis] += obj.speed;
    }
  }
}
