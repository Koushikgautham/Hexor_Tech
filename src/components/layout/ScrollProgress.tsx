"use client";

/* ENHANCEMENT: Scroll progress indicator with section navigation
 * To remove: Delete this file and remove import from layout.tsx
 */

import React, { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

interface ScrollProgressProps {
  /** Array of section IDs and labels for dot navigation */
  sections?: Section[];
  /** Show dots for section navigation. Default: true */
  showDots?: boolean;
}

export function ScrollProgress({
  sections = [],
  showDots = true,
}: ScrollProgressProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [activeSection, setActiveSection] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // Transform scroll progress to height percentage (0-100%)
  const heightPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Apply spring for smooth animation
  const smoothHeight = useSpring(heightPercent, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Show indicator after scrolling a bit
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section (only on home page where sections exist)
  useEffect(() => {
    if (sections.length === 0 || !isHomePage) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-50% 0px -50% 0px", // Trigger when section is in middle of viewport
    });

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections, isHomePage]);

  // Scroll to section on dot click with offset for fixed header
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      className="fixed left-1/2 bottom-8 z-50 hidden -translate-x-1/2 flex-row items-center gap-4 md:flex"
      aria-label="Page scroll progress"
    >
      {/* Progress bar track - horizontal, centered at bottom */}
      <div
        className="relative h-1 w-32 overflow-hidden rounded-full bg-muted-foreground/20"
        role="progressbar"
      >
        {/* Progress bar fill - grows from left */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full bg-primary"
          style={{
            width: smoothHeight,
          }}
        />
      </div>

      {/* Section dots - only show on home page, horizontal layout */}
      {showDots && sections.length > 0 && isHomePage && (
        <div className="flex flex-row gap-3">
          {sections.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="group relative flex items-center"
                aria-label={`Go to ${label}`}
              >
                {/* Dot */}
                <span
                  className={`block h-2 w-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? "scale-[1.3] bg-primary"
                      : "bg-muted-foreground/50 hover:scale-125 hover:bg-muted-foreground"
                  }`}
                />
                {/* Tooltip - show above the dot */}
                <span className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-xs font-medium text-card-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

export default ScrollProgress;
