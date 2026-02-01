'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import * as topojson from 'topojson-client';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
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
  } | null>(null);

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

    // Function to convert lat/lng to 3D position
    const latLngToVector3 = (lat: number, lng: number, radius = 1.002): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (-lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    // Create lat/long lines (dark red for black & red theme)
    const createLatLongLines = () => {
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x5b5b5b, // Dark red
        transparent: true,
        opacity: 0.4,
      });

      // Latitude lines
      for (let lat = -60; lat <= 80; lat += 20) {
        const points: THREE.Vector3[] = [];
        const phi = (90 - lat) * (Math.PI / 180);
        for (let lng = 0; lng <= 360; lng += 2) {
          const theta = lng * (Math.PI / 180);
          const x = 1.001 * Math.sin(phi) * Math.cos(theta);
          const y = 1.001 * Math.cos(phi);
          const z = 1.001 * Math.sin(phi) * Math.sin(theta);
          points.push(new THREE.Vector3(x, y, z));
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        globeGroup.add(line);
      }

      // Longitude lines
      for (let lng = 0; lng < 360; lng += 20) {
        const points: THREE.Vector3[] = [];
        const theta = lng * (Math.PI / 180);
        for (let lat = -90; lat <= 90; lat += 2) {
          const phi = (90 - lat) * (Math.PI / 180);
          const x = 1.001 * Math.sin(phi) * Math.cos(theta);
          const y = 1.001 * Math.cos(phi);
          const z = 1.001 * Math.sin(phi) * Math.sin(theta);
          points.push(new THREE.Vector3(x, y, z));
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        globeGroup.add(line);
      }
    };

    createLatLongLines();

    // Store country polygons for land detection
    let countryPolygons: number[][][] = [];

    // Point-in-polygon test
    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];

        if (((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)) {
          inside = !inside;
        }
      }
      return inside;
    };

    // Check if point is on land
    const isOnLand = (lng: number, lat: number): boolean => {
      for (const polygon of countryPolygons) {
        if (pointInPolygon([lng, lat], polygon)) {
          return true;
        }
      }
      return false;
    };

    // Create dots only on land
    const createLandDots = () => {
      const positions: number[] = [];
      const dotSpacing = 1.2; // Reduced for closer dots

      for (let lat = -90; lat <= 90; lat += dotSpacing) {
        const lngSpacing = dotSpacing / Math.max(0.15, Math.cos((lat * Math.PI) / 180));

        for (let lng = -180; lng <= 180; lng += Math.min(lngSpacing, 5)) {
          if (isOnLand(lng, lat)) {
            const jitterLat = lat + (Math.random() - 0.5) * 0.6;
            const jitterLng = lng + (Math.random() - 0.5) * 0.6;

            const pos = latLngToVector3(jitterLat, jitterLng, 1.002);
            positions.push(pos.x, pos.y, pos.z);
          }
        }
      }

      const dotGeometry = new THREE.BufferGeometry();
      dotGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

      const dotMaterial = new THREE.PointsMaterial({
        color: 0xe11d48, // Hexor red for land dots
        size: 0.008, // Smaller dots since they're closer together
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      });

      const dots = new THREE.Points(dotGeometry, dotMaterial);
      globeGroup.add(dots);
    };

    // Process polygon for rendering
    const processPolygon = (coordinates: number[][][], material: THREE.LineBasicMaterial) => {
      coordinates.forEach((ring) => {
        const points: THREE.Vector3[] = [];
        ring.forEach((coord) => {
          const [lng, lat] = coord;
          points.push(latLngToVector3(lat, lng, 1.003));
        });

        if (points.length > 1) {
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, material);
          globeGroup.add(line);
        }
      });
    };

    // Load and render countries from TopoJSON with retry logic
    const loadCountries = async (retryCount = 0): Promise<void> => {
      const maxRetries = 3;
      const retryDelay = 1000 * (retryCount + 1); // Exponential backoff

      try {
        setIsLoading(true);

        // Load both countries (for borders) and land (for dot placement including Antarctica)
        const [countriesResponse, landResponse] = await Promise.all([
          fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'),
          fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json')
        ]);

        if (!countriesResponse.ok || !landResponse.ok) {
          throw new Error('Failed to fetch TopoJSON data');
        }

        const countryTopology = await countriesResponse.json();
        const landTopology = await landResponse.json();

        // Convert TopoJSON to GeoJSON for country borders
        const countries = topojson.feature(
          countryTopology,
          countryTopology.objects.countries
        ) as unknown as GeoJSON.FeatureCollection;

        // Convert land TopoJSON for accurate land detection (includes Antarctica)
        const land = topojson.feature(
          landTopology,
          landTopology.objects.land
        ) as unknown as GeoJSON.Feature | GeoJSON.FeatureCollection;

        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0xffffff, // White country borders on black
          transparent: true,
          opacity: 0.4,
        });

        // Process each country for border rendering
        countries.features.forEach((feature) => {
          const geometry = feature.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon;

          if (geometry.type === 'Polygon') {
            processPolygon(geometry.coordinates as number[][][], lineMaterial);
          } else if (geometry.type === 'MultiPolygon') {
            (geometry.coordinates as number[][][][]).forEach((polygon) => {
              processPolygon(polygon as number[][][], lineMaterial);
            });
          }
        });

        // Use land data for polygon detection (includes Antarctica)
        const landGeometry = (land as GeoJSON.Feature)?.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon | null;
        if (!landGeometry) {
          createLandDots();
          setIsLoading(false);
          return;
        }
        if (landGeometry.type === 'Polygon') {
          countryPolygons.push(landGeometry.coordinates[0] as number[][]);
          // Also render Antarctica outline
          processPolygon(landGeometry.coordinates as number[][][], lineMaterial);
        } else if (landGeometry.type === 'MultiPolygon') {
          (landGeometry.coordinates as number[][][][]).forEach((polygon) => {
            countryPolygons.push(polygon[0] as number[][]);
            // Check if this polygon is in Antarctica region (lat < -60)
            const isAntarctica = polygon[0].some((coord: number[]) => coord[1] < -60);
            if (isAntarctica) {
              processPolygon(polygon as number[][][], lineMaterial);
            }
          });
        }

        // After loading land data, create dots on land
        createLandDots();
        setIsLoading(false);
        setLoadError(false);
      } catch (error) {
        console.error(`Error loading countries (attempt ${retryCount + 1}/${maxRetries}):`, error);

        if (retryCount < maxRetries - 1) {
          // Retry with delay
          setTimeout(() => {
            loadCountries(retryCount + 1);
          }, retryDelay);
        } else {
          // Final failure - render basic globe with dots
          console.error('Failed to load country data after retries, rendering basic globe');
          setLoadError(true);
          setIsLoading(false);
          // Create dots anyway for basic globe appearance
          createLandDots();
        }
      }
    };

    // Create location marker
    const createLocationMarker = (lat: number, lng: number): THREE.Group => {
      const markerGroup = new THREE.Group();
      const pos = latLngToVector3(lat, lng, 1.008);

      // Main dot (reduced size) - Hexor primary red
      const dotGeometry = new THREE.SphereGeometry(0.016, 16, 16);
      const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xe11d48 }); // Hexor primary red
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.position.copy(pos);
      markerGroup.add(dot);

      // Outer glow (reduced size) - Hexor primary red
      const glowGeometry = new THREE.SphereGeometry(0.025, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xe11d48, // Hexor primary red
        transparent: true,
        opacity: 0.4,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(pos);
      markerGroup.add(glow);

      markerGroup.userData = { pos };
      globeGroup.add(markerGroup);
      return markerGroup;
    };

    const marker = createLocationMarker(markerLat, markerLng);

    // Load countries
    loadCountries();

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

    // Mouse handlers
    const handleMouseDown = (e: MouseEvent) => {
      if (!sceneRef.current) return;
      sceneRef.current.isDragging = true;
      sceneRef.current.autoRotate = false;
      sceneRef.current.previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current || !sceneRef.current.isDragging) return;

      const deltaX = e.clientX - sceneRef.current.previousMousePosition.x;
      const deltaY = e.clientY - sceneRef.current.previousMousePosition.y;

      sceneRef.current.targetRotationY += deltaX * 0.005;
      sceneRef.current.targetRotationX += deltaY * 0.005;
      sceneRef.current.targetRotationX = Math.max(
        -Math.PI / 3,
        Math.min(Math.PI / 3, sceneRef.current.targetRotationX)
      );

      sceneRef.current.previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      if (!sceneRef.current) return;
      sceneRef.current.isDragging = false;
      setTimeout(() => {
        if (sceneRef.current) sceneRef.current.autoRotate = true;
      }, 3000);
    };

    // Touch handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (!sceneRef.current) return;
      sceneRef.current.isDragging = true;
      sceneRef.current.autoRotate = false;
      sceneRef.current.previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!sceneRef.current || !sceneRef.current.isDragging) return;

      const deltaX = e.touches[0].clientX - sceneRef.current.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - sceneRef.current.previousMousePosition.y;

      sceneRef.current.targetRotationY += deltaX * 0.005;
      sceneRef.current.targetRotationX += deltaY * 0.005;
      sceneRef.current.targetRotationX = Math.max(
        -Math.PI / 3,
        Math.min(Math.PI / 3, sceneRef.current.targetRotationX)
      );

      sceneRef.current.previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = () => {
      if (!sceneRef.current) return;
      sceneRef.current.isDragging = false;
      setTimeout(() => {
        if (sceneRef.current) sceneRef.current.autoRotate = true;
      }, 3000);
    };

    // Resize handler
    const handleResize = () => {
      if (!sceneRef.current || !containerRef.current) return;
      const { camera, renderer } = sceneRef.current;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    // Add event listeners
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return;

      if (sceneRef.current.autoRotate) {
        sceneRef.current.targetRotationY += 0.0015;
      }

      sceneRef.current.globeGroup.rotation.y +=
        (sceneRef.current.targetRotationY - sceneRef.current.globeGroup.rotation.y) * 0.05;
      sceneRef.current.globeGroup.rotation.x +=
        (sceneRef.current.targetRotationX - sceneRef.current.globeGroup.rotation.x) * 0.05;

      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.renderer.dispose();
      }
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

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
