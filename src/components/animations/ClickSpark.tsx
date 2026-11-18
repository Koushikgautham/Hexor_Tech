"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
  children?: React.ReactNode;
  // Added: global mode to attach click listener to entire document
  global?: boolean;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

export function ClickSpark({
  sparkColor = "hsl(var(--primary))",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children,
  // Added: global mode defaults to false for backwards compatibility
  global = false,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const startTimeRef = useRef<number | null>(null);
  // Added: track mount state for global mode
  const [isMounted, setIsMounted] = useState(false);

  // Added: mount effect for global mode
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Changed: Added isMounted dependency for global mode canvas sizing
  useEffect(() => {
    // Changed: Wait for mount in global mode before accessing canvas
    if (global && !isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Changed: For global mode, use window dimensions; otherwise use parent
    if (global) {
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      return () => window.removeEventListener("resize", resizeCanvas);
    }

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);

    resizeCanvas();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, [global, isMounted]);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  // Changed: Added isMounted dependency for global mode animation loop
  useEffect(() => {
    // Changed: Wait for mount in global mode before starting animation
    if (global && !isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const draw = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      // Changed: Get theme-aware color by checking if dark mode is active
      // Canvas 2D doesn't support oklch, so we use hex colors based on theme
      let resolvedColor = sparkColor;
      if (sparkColor.includes("var(--primary)")) {
        const isDark = document.documentElement.classList.contains("dark");
        // Light: #E11D48 (Rose 600), Dark: #F43F5E (Rose 500)
        resolvedColor = isDark ? "#F43F5E" : "#E11D48";
      }

      sparksRef.current = sparksRef.current.filter((spark: Spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = resolvedColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale, global, isMounted]);

  // Changed: Unified click handler for both global and local modes
  const handleClick = useCallback((e: MouseEvent | React.MouseEvent<HTMLDivElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Changed: For global mode, use clientX/Y directly; for local, offset by canvas position
    let x: number, y: number;
    if (global) {
      x = e.clientX;
      y = e.clientY;
    } else {
      const rect = canvas.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    const now = performance.now();
    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }));

    sparksRef.current.push(...newSparks);
  }, [global, sparkCount]);

  // Added: Attach global click listener when in global mode
  // Changed: Added isMounted dependency to ensure canvas is ready
  useEffect(() => {
    if (!global || !isMounted) return;

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [global, handleClick, isMounted]);

  // Added: For global mode, render fixed full-screen canvas
  if (global) {
    if (!isMounted) return null;
    return (
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9999]"
        style={{ width: "100vw", height: "100vh" }}
      />
    );
  }

  return (
    // Changed: Use inline-block with fit-content sizing so it wraps children properly
    <div className="relative inline-block" onClick={handleClick as React.MouseEventHandler<HTMLDivElement>}>
      <canvas
        ref={canvasRef}
        // Changed: Canvas needs higher z-index to render sparks above children
        className="pointer-events-none absolute inset-0 z-50"
        style={{ width: "100%", height: "100%" }}
      />
      {children}
    </div>
  );
}

export default ClickSpark;
