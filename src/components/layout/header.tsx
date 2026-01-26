"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// Removed: ClickSpark import - now using global ClickSpark in layout.tsx
import { cn } from "@/lib/utils";
// Added: GSAP for Reactbits-style pill hover animation
import { gsap } from "gsap";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

// Smooth scroll handler for anchor links
const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const targetId = href.replace("#", "");
  const element = document.getElementById(targetId);
  if (element) {
    const headerOffset = -30;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("hero");
  const [isCursorNearTop, setIsCursorNearTop] = React.useState(false);
  const lastScrollY = React.useRef(0);
  const transitionTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Added: Refs for GSAP pill hover animation
  const circleRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = React.useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweenRefs = React.useRef<(gsap.core.Tween | null)[]>([]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Track active section with IntersectionObserver
  React.useEffect(() => {
    const sectionIds = navItems.map(item => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Added: GSAP setup for Reactbits-style pill hover animation
  React.useEffect(() => {
    const ease = "power3.out";

    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        // Calculate circle size to cover the pill from bottom
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const hoverLabel = pill.querySelector<HTMLElement>(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

        // Kill existing timeline
        tlRefs.current[index]?.kill();

        // Create new timeline for this pill
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
        }

        if (hoverLabel) {
          gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    window.addEventListener("resize", layout);
    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    return () => window.removeEventListener("resize", layout);
  }, []);

  // Added: GSAP hover handlers for pill animation
  const handlePillEnter = (index: number) => {
    const tl = tlRefs.current[index];
    if (!tl) return;
    activeTweenRefs.current[index]?.kill();
    activeTweenRefs.current[index] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handlePillLeave = (index: number) => {
    const tl = tlRefs.current[index];
    if (!tl) return;
    activeTweenRefs.current[index]?.kill();
    activeTweenRefs.current[index] = tl.tweenTo(0, {
      duration: 0.2,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  // Mouse proximity detection - show navbar when cursor is near top
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const PROXIMITY_THRESHOLD = 100; // Show navbar when cursor is within 100px of top
      setIsCursorNearTop(e.clientY < PROXIMITY_THRESHOLD);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Show/hide navbar based on cursor proximity
  React.useEffect(() => {
    const currentScrollY = window.scrollY;
    
    // If cursor is near top and we're scrolled down, show navbar
    if (isCursorNearTop && currentScrollY > 80) {
      if (isHidden) {
        setIsTransitioning(true);
        setIsHidden(false);
        
        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current);
        }
        
        transitionTimeoutRef.current = setTimeout(() => {
          setIsTransitioning(false);
        }, 350);
      }
    }
    // If cursor moves away from top and we're scrolled down, hide navbar
    else if (!isCursorNearTop && currentScrollY > lastScrollY.current && currentScrollY > 80) {
      if (!isHidden) {
        setIsTransitioning(true);
        setIsHidden(true);
        
        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current);
        }
        
        transitionTimeoutRef.current = setTimeout(() => {
          setIsTransitioning(false);
        }, 350);
      }
    }
  }, [isCursorNearTop, isHidden]);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled past threshold for styling
      setIsScrolled(currentScrollY > 20);

      // Hide on scroll down, show on scroll up
      const wasHidden = isHidden;
      let newHidden = wasHidden;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling down & past threshold - hide (unless cursor is near top)
        newHidden = !isCursorNearTop;
      } else {
        // Scrolling up - show
        newHidden = false;
      }

      // If visibility is changing, disable layoutId animations temporarily
      if (wasHidden !== newHidden) {
        setIsTransitioning(true);
        setIsHidden(newHidden);

        // Clear any existing timeout
        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current);
        }

        // Re-enable layout animations after the header transition completes
        transitionTimeoutRef.current = setTimeout(() => {
          setIsTransitioning(false);
        }, 350); // Slightly longer than the 300ms transition
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [isHidden, isCursorNearTop]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-primary">Hex</span>
                <span className="text-foreground">ora</span>
              </span>
            </motion.div>
          </Link>

          {/* Center Navigation - Pill Style Container */}
          {/* Changed: Added GSAP Reactbits-style hover animation with expanding circle and text slide */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-border bg-card/80 p-1 shadow-sm backdrop-blur-sm md:flex">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={cn(
                    "relative overflow-hidden inline-flex items-center justify-center h-full px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer",
                    /* Changed: Base color uses card background */
                    "bg-card/80"
                  )}
                  onMouseEnter={() => handlePillEnter(index)}
                  onMouseLeave={() => handlePillLeave(index)}
                >
                  {/* Changed: Expanding circle for hover effect */}
                  <span
                    ref={(el) => { circleRefs.current[index] = el; }}
                    className="pointer-events-none absolute bottom-0 left-1/2 z-[1] block rounded-full bg-primary"
                    style={{ willChange: "transform" }}
                    aria-hidden="true"
                  />
                  {/* Changed: Label stack for text animation */}
                  <span className="label-stack relative z-[2] inline-block leading-[1]">
                    {/* Changed: Default label that slides up on hover */}
                    <span
                      className={cn(
                        "pill-label relative z-[2] inline-block leading-[1]",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                      style={{ willChange: "transform" }}
                    >
                      {item.label}
                    </span>
                    {/* Changed: Hover label that slides in from bottom */}
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block text-primary-foreground"
                      style={{ willChange: "transform, opacity" }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  {/* Changed: Active indicator dot */}
                  {isActive && (
                    <span
                      className="absolute -bottom-[6px] left-1/2 z-[4] h-2 w-2 -translate-x-1/2 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle - Changed: Removed ClickSpark wrapper, now using global ClickSpark */}
            {mounted && (
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-foreground transition-colors hover:bg-secondary"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* CTA Button - Desktop - Changed: Removed ClickSpark wrapper, now using global ClickSpark */}
            <div className="hidden md:block">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild className="rounded-full px-6">
                  <a href="#contact" onClick={(e) => handleSmoothScroll(e, "#contact")}>Get Started</a>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="relative">
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                      >
                        <X className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                      >
                        <Menu className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm">
                <nav className="mt-8 flex flex-col gap-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => {
                          handleSmoothScroll(e, item.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                          "block px-4 py-3 text-lg font-medium transition-colors",
                          activeSection === item.href.replace("#", "")
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.label}
                      </a>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    className="mt-4 px-4"
                  >
                    <Button asChild className="w-full rounded-full">
                      <a
                        href="#contact"
                        onClick={(e) => {
                          handleSmoothScroll(e, "#contact");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Get Started
                      </a>
                    </Button>
                  </motion.div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
