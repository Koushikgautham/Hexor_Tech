"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Work" },
  { href: "#team", label: "About" },
  { href: "#contact", label: "Contact" },
];

const handleSmoothScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string
) => {
  e.preventDefault();
  const targetId = href.replace("#", "");
  const element = document.getElementById(targetId);
  if (element) {
    const headerOffset = -30;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition =
      elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export function Header() {
  const [isCompact, setIsCompact] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("hero");
  const lastScrollY = React.useRef(0);
  const scrollUpStartY = React.useRef(0);

  React.useEffect(() => {
    const sectionIds = ["hero", ...navItems.map((item) => item.href.replace("#", ""))];
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

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 100;
      const scrollUpThreshold = 80; // User needs to scroll up 80px before navbar expands

      if (currentScrollY <= scrollThreshold) {
        // At or near top - always expanded
        setIsCompact(false);
        scrollUpStartY.current = 0;
      } else {
        // Past threshold - check scroll direction
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down - compact and reset scroll up start position
          setIsCompact(true);
          scrollUpStartY.current = 0;
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling up - track how much they've scrolled up
          if (scrollUpStartY.current === 0) {
            // Just started scrolling up, record the position
            scrollUpStartY.current = lastScrollY.current;
          }

          // Only expand if user has scrolled up by the threshold amount
          const scrolledUpDistance = scrollUpStartY.current - currentScrollY;
          if (scrolledUpDistance >= scrollUpThreshold) {
            setIsCompact(false);
          }
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      {/* Outer container for positioning */}
      <div className="relative w-full max-w-7xl flex justify-center">
        {/* The navbar pill */}
        <div
          className={cn(
            "rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-700 ease-in-out",
            isCompact
              ? "bg-[#111]/90 w-auto"
              : "bg-[#0a0a0a]/80 w-full"
          )}
          style={{
            transformOrigin: "center"
          }}
        >
          <div className="flex h-16 items-center px-6 gap-6">
            {/* Logo - left side */}
            <div
              className={cn(
                "flex-shrink-0 transition-all duration-700 ease-in-out",
                isCompact ? "opacity-0 scale-95 max-w-0 overflow-hidden" : "opacity-100 scale-100 max-w-xs"
              )}
            >
              <Link href="/" className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-mono text-sm text-primary">&lt;/&gt;</span>
                <span className="text-lg font-semibold tracking-tight text-white">
                  hexor
                </span>
              </Link>
            </div>

            {/* Left spacer - collapses when compact */}
            <div className={cn(
              "transition-all duration-700 ease-in-out",
              isCompact ? "flex-none w-0" : "flex-1"
            )} />

            {/* Navigation - center, always visible */}
            <nav className="hidden items-center gap-2 md:flex flex-shrink-0">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className={cn(
                      "rounded-lg px-4 py-2 text-sm font-medium transition-all whitespace-nowrap",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:text-white"
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Right spacer - collapses when compact */}
            <div className={cn(
              "transition-all duration-700 ease-in-out",
              isCompact ? "flex-none w-0" : "flex-1"
            )} />

            {/* Right side - buttons */}
            <div
              className={cn(
                "hidden items-center gap-4 md:flex flex-shrink-0 transition-all duration-700 ease-in-out",
                isCompact ? "opacity-0 scale-95 max-w-0 overflow-hidden" : "opacity-100 scale-100 max-w-xs"
              )}
            >
              <Link
                href="/auth/login"
                className="text-sm font-medium text-gray-400 transition-colors hover:text-white whitespace-nowrap"
              >
                Login
              </Link>
              <Link
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary/90 whitespace-nowrap"
              >
                Start a Project
              </Link>
            </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/5"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-sm border-white/5 bg-[#0a0a0a]"
            >
              <div className="mt-4 font-mono text-xs text-gray-500">
                // navigation
              </div>
              <nav className="mt-4 flex flex-col gap-1">
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
                        "block rounded-lg px-4 py-3 text-lg font-medium transition-all",
                        activeSection === item.href.replace("#", "")
                          ? "bg-white/5 text-white"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="mt-8 space-y-3"
              >
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full rounded-lg border border-white/10 py-3 text-center text-sm font-medium text-white transition-all hover:bg-white/5"
                >
                  Login
                </Link>
                <a
                  href="#contact"
                  onClick={(e) => {
                    handleSmoothScroll(e, "#contact");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full rounded-lg bg-primary py-3 text-center text-sm font-medium text-white"
                >
                  Start a Project
                </a>
              </motion.div>
            </SheetContent>
          </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
