import * as THREE from 'three';
import * as topojson from 'topojson-client';
import { createLandDots, processPolygon } from './GlobeGeometry';

interface LoadCountriesOptions {
  globeGroup: THREE.Group;
  countryPolygons: number[][][];
  setIsLoading: (loading: boolean) => void;
  setLoadError: (error: boolean) => void;
}

// Load and render countries from TopoJSON with retry logic
export async function loadCountries(
  { globeGroup, countryPolygons, setIsLoading, setLoadError }: LoadCountriesOptions,
  retryCount = 0
): Promise<void> {
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
        processPolygon(globeGroup, geometry.coordinates as number[][][], lineMaterial);
      } else if (geometry.type === 'MultiPolygon') {
        (geometry.coordinates as number[][][][]).forEach((polygon) => {
          processPolygon(globeGroup, polygon as number[][][], lineMaterial);
        });
      }
    });

    // Use land data for polygon detection (includes Antarctica)
    const landGeometry = (land as GeoJSON.Feature)?.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon | null;
    if (!landGeometry) {
      createLandDots(globeGroup, countryPolygons);
      setIsLoading(false);
      return;
    }
    if (landGeometry.type === 'Polygon') {
      countryPolygons.push(landGeometry.coordinates[0] as number[][]);
      // Also render Antarctica outline
      processPolygon(globeGroup, landGeometry.coordinates as number[][][], lineMaterial);
    } else if (landGeometry.type === 'MultiPolygon') {
      (landGeometry.coordinates as number[][][][]).forEach((polygon) => {
        countryPolygons.push(polygon[0] as number[][]);
        // Check if this polygon is in Antarctica region (lat < -60)
        const isAntarctica = polygon[0].some((coord: number[]) => coord[1] < -60);
        if (isAntarctica) {
          processPolygon(globeGroup, polygon as number[][][], lineMaterial);
        }
      });
    }

    // After loading land data, create dots on land
    createLandDots(globeGroup, countryPolygons);
    setIsLoading(false);
    setLoadError(false);
  } catch (error) {
    console.error(`Error loading countries (attempt ${retryCount + 1}/${maxRetries}):`, error);

    if (retryCount < maxRetries - 1) {
      // Retry with delay
      setTimeout(() => {
        loadCountries({ globeGroup, countryPolygons, setIsLoading, setLoadError }, retryCount + 1);
      }, retryDelay);
    } else {
      // Final failure - render basic globe with dots
      console.error('Failed to load country data after retries, rendering basic globe');
      setLoadError(true);
      setIsLoading(false);
      // Create dots anyway for basic globe appearance
      createLandDots(globeGroup, countryPolygons);
    }
  }
}
