"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HexorLogo3DProps {
  className?: string;
  autoRotate?: boolean;
  glbPath?: string; // Path to GLB file when available
}

export function HexorLogo3D({
  className = "",
  autoRotate = true,
  glbPath,
}: HexorLogo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    logo: THREE.Group;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xe11d48, 0.5);
    directionalLight2.position.set(-5, -5, 5);
    scene.add(directionalLight2);

    // Create hexagonal 6 shape (placeholder - will be replaced by GLB)
    const logo = new THREE.Group();

    // Hexor red color
    const hexoraRed = new THREE.Color(0xe11d48);

    // Create the "6" shape with hexagonal style
    const material = new THREE.MeshStandardMaterial({
      color: hexoraRed,
      metalness: 0.3,
      roughness: 0.4,
    });

    // Top curved part of 6 (using torus)
    const topCurveGeometry = new THREE.TorusGeometry(0.6, 0.15, 16, 32, Math.PI * 1.3);
    const topCurve = new THREE.Mesh(topCurveGeometry, material);
    topCurve.position.set(0, 0.3, 0);
    topCurve.rotation.z = Math.PI * 0.85;
    logo.add(topCurve);

    // Bottom hexagonal circle of 6
    const hexagonShape = new THREE.Shape();
    const hexRadius = 0.55;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * hexRadius;
      const y = Math.sin(angle) * hexRadius;
      if (i === 0) hexagonShape.moveTo(x, y);
      else hexagonShape.lineTo(x, y);
    }
    hexagonShape.closePath();

    // Inner hexagon (hole)
    const innerHexagon = new THREE.Path();
    const innerRadius = 0.35;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * innerRadius;
      const y = Math.sin(angle) * innerRadius;
      if (i === 0) innerHexagon.moveTo(x, y);
      else innerHexagon.lineTo(x, y);
    }
    innerHexagon.closePath();
    hexagonShape.holes.push(innerHexagon);

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
    };

    const hexGeometry = new THREE.ExtrudeGeometry(hexagonShape, extrudeSettings);
    const hexMesh = new THREE.Mesh(hexGeometry, material);
    hexMesh.position.set(0, -0.5, -0.15);
    logo.add(hexMesh);

    // Vertical bar connecting top curve to hexagon
    const barGeometry = new THREE.BoxGeometry(0.25, 0.5, 0.3);
    const barMesh = new THREE.Mesh(barGeometry, material);
    barMesh.position.set(-0.55, 0.05, 0);
    logo.add(barMesh);

    // Position and add logo
    logo.rotation.x = 0.2;
    logo.rotation.y = -0.3;
    scene.add(logo);

    // Mouse interaction
    let targetRotationX = 0.2;
    let targetRotationY = -0.3;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Animation
    let time = 0;
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      sceneRef.current!.animationId = animationId;

      time += 0.01;

      if (autoRotate) {
        targetRotationY = Math.sin(time * 0.5) * 0.5 - 0.3;
        targetRotationX = Math.cos(time * 0.3) * 0.2 + 0.2;
      }

      // Smooth mouse follow
      targetRotationY += mouseX * 0.3;
      targetRotationX += mouseY * 0.2;

      logo.rotation.y += (targetRotationY - logo.rotation.y) * 0.05;
      logo.rotation.x += (targetRotationX - logo.rotation.x) * 0.05;

      // Floating effect
      logo.position.y = Math.sin(time) * 0.1;

      renderer.render(scene, camera);
    };

    sceneRef.current = { scene, camera, renderer, logo, animationId: 0 };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        renderer.dispose();
        container.removeChild(renderer.domElement);
      }
    };
  }, [autoRotate, glbPath]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={{ minHeight: "300px" }}
    />
  );
}
