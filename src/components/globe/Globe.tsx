'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createLatLongLines, createLocationMarker } from './GlobeGeometry';
import { loadCountries } from './GlobeCountryLoader';
import { attachGlobeControls } from './GlobeDragControls';
import type { GlobeScene } from './GlobeSceneTypes';

interface GlobeProps {
  title?: string;
  subtitle?: string;
  markerLat?: number;
  markerLng?: number;
  autoRotate?: boolean;
  className?: string;
  embedded?: boolean; // When true, renders just the globe without wrapper/header
}

export default function Globe({
  title = 'Based in Chennai, India',
  subtitle = 'Available Worldwide',
  markerLat = 13.08,
  markerLng = 80.27,
  autoRotate: initialAutoRotate = true,
  className = '',
  embedded = false,
}: GlobeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<GlobeScene | null>(null);
  const isVisibleRef = useRef(true);

  // Setup Intersection Observer to pause animation when out of viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2.8;
    camera.position.y = 0.3;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Globe group for rotation
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Create globe sphere (dark background matching Hexor theme)
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0x0a0a0a, // Near black matching dark theme
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globe);

    createLatLongLines(globeGroup);

    // Store country polygons for land detection
    let countryPolygons: number[][][] = [];

    const marker = createLocationMarker(globeGroup, markerLat, markerLng);

    // Load countries
    loadCountries({ globeGroup, countryPolygons, setIsLoading, setLoadError });

    // Store refs
    sceneRef.current = {
      scene,
      camera,
      renderer,
      globeGroup,
      marker,
      countryPolygons,
      targetRotationY: 2.5,
      targetRotationX: 0,
      autoRotate: initialAutoRotate,
      isDragging: false,
      previousMousePosition: { x: 0, y: 0 },
      animationId: 0,
    };

    // Add event listeners
    const detachControls = attachGlobeControls(container, sceneRef, containerRef);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return;

      // Only update and render if component is visible
      if (isVisibleRef.current) {
        if (sceneRef.current.autoRotate) {
          sceneRef.current.targetRotationY += 0.0015;
        }

        sceneRef.current.globeGroup.rotation.y +=
          (sceneRef.current.targetRotationY - sceneRef.current.globeGroup.rotation.y) * 0.05;
        sceneRef.current.globeGroup.rotation.x +=
          (sceneRef.current.targetRotationX - sceneRef.current.globeGroup.rotation.x) * 0.05;

        sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      }
      
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.renderer.dispose();
      }
      detachControls();

      // Remove canvas
      const canvas = container.querySelector('canvas');
      if (canvas) container.removeChild(canvas);
    };
  }, [markerLat, markerLng, initialAutoRotate]);

  // Embedded mode: just render the globe canvas container
  if (embedded) {
    return (
      <div className={`w-full h-full relative ${className}`}>
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-radial from-primary/10 pointer-events-none">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          </div>
        )}
      </div>
    );
  }

  // Full mode with header and overlays
  return (
    <div className={`relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden ${className}`}>
      {/* Vignette overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] z-[1]" />

      {/* Header */}
      <div className="text-center mb-5 z-10 relative">
        <h1 className="text-3xl font-normal tracking-wide mb-3 text-white">
          {title}
        </h1>
        <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase text-gray-400">
          <span className="w-3 h-3 bg-[#e11d48] rounded-full shadow-[0_0_20px_#e11d48,0_0_40px_rgba(225,29,72,0.4)] animate-pulse" />
          {subtitle}
        </div>
      </div>

      {/* Globe container */}
      <div
        ref={containerRef}
        className="w-full h-[70vh] max-h-[700px] relative cursor-grab active:cursor-grabbing"
      />

      {/* Bottom gradient overlay */}
      <div className="fixed bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-black to-transparent z-[5]" />
    </div>
  );
}
