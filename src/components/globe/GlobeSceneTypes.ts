import * as THREE from 'three';

// Everything the globe keeps between frames
export interface GlobeScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  globeGroup: THREE.Group;
  marker: THREE.Group;
  countryPolygons: number[][][];
  targetRotationY: number;
  targetRotationX: number;
  autoRotate: boolean;
  isDragging: boolean;
  previousMousePosition: { x: number; y: number };
  animationId: number;
}
