import * as THREE from 'three';

// Building blocks for the 3D globe scene (pure helpers, no React).

// Convert lat/lng to a 3D position on the sphere
export function latLngToVector3(lat: number, lng: number, radius = 1.002): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (-lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Create lat/long lines (dark red for black & red theme)
export function createLatLongLines(globeGroup: THREE.Group) {
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
}

// Point-in-polygon test
export function pointInPolygon(point: [number, number], polygon: number[][]): boolean {
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
}

// Check if point is on land
export function isOnLand(countryPolygons: number[][][], lng: number, lat: number): boolean {
  for (const polygon of countryPolygons) {
    if (pointInPolygon([lng, lat], polygon)) {
      return true;
    }
  }
  return false;
}

// Create dots only on land
export function createLandDots(globeGroup: THREE.Group, countryPolygons: number[][][]) {
  const positions: number[] = [];
  const dotSpacing = 1.2; // Reduced for closer dots

  for (let lat = -90; lat <= 90; lat += dotSpacing) {
    const lngSpacing = dotSpacing / Math.max(0.15, Math.cos((lat * Math.PI) / 180));

    for (let lng = -180; lng <= 180; lng += Math.min(lngSpacing, 5)) {
      if (isOnLand(countryPolygons, lng, lat)) {
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
}

// Process polygon for rendering
export function processPolygon(globeGroup: THREE.Group, coordinates: number[][][], material: THREE.LineBasicMaterial) {
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
}

// Create location marker
export function createLocationMarker(globeGroup: THREE.Group, lat: number, lng: number): THREE.Group {
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
}
