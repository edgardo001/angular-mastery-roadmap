import { Injectable, signal, WritableSignal } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

@Injectable({ providedIn: 'root' })
export class SceneService {
  scene: WritableSignal<THREE.Scene | null> = signal(null);
  camera: WritableSignal<THREE.PerspectiveCamera | null> = signal(null);
  controls: WritableSignal<OrbitControls | null> = signal(null);

  createScene(canvas: HTMLCanvasElement): { scene: THREE.Scene; camera: THREE.PerspectiveCamera; controls: OrbitControls } {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(5, 5, 10);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false;
    controls.target.set(0, 0, 0);

    this.setupLights(scene);

    this.scene.set(scene);
    this.camera.set(camera);
    this.controls.set(controls);

    return { scene, camera, controls };
  }

  private setupLights(scene: THREE.Scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0x8888ff, 0.3);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x362d59, 0.4);
    scene.add(hemiLight);
  }

  resizeAspect(camera: THREE.PerspectiveCamera, width: number, height: number) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}
