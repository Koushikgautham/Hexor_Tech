import type { RefObject } from 'react';
import type { GlobeScene } from './GlobeSceneTypes';

// Mouse / touch drag-to-rotate and resize handling.
// Returns a function that removes every listener it added.
export function attachGlobeControls(
  container: HTMLDivElement,
  sceneRef: RefObject<GlobeScene | null>,
  containerRef: RefObject<HTMLDivElement | null>
) {
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

  return () => {
    container.removeEventListener('mousedown', handleMouseDown);
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseup', handleMouseUp);
    container.removeEventListener('mouseleave', handleMouseUp);
    container.removeEventListener('touchstart', handleTouchStart);
    container.removeEventListener('touchmove', handleTouchMove);
    container.removeEventListener('touchend', handleTouchEnd);
    window.removeEventListener('resize', handleResize);
  };
}
