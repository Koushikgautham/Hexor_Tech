"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/ClassNameMerge";

gsap.registerPlugin(ScrollTrigger);

// Placeholder projects - will be replaced with real data
const placeholderProjects = [
  {
    id: 1,
    title: "Coming Soon",
    client: "Enterprise Client",
    category: "Branding",
    year: "2025",
    description: "Digital transformation and brand identity redesign for a leading enterprise.",
    tags: ["Branding", "Design", "Strategy"],
    image: null, // Placeholder for future images
  },
  {
    id: 2,
    title: "Coming Soon",
    client: "E-Commerce Brand",
    category: "Development",
    year: "2024",
    description: "Full-stack e-commerce platform with custom inventory management.",
    tags: ["Development", "E-Commerce"],
    image: null,
  },
  {
    id: 3,
    title: "Coming Soon",
    client: "Tech Startup",
    category: "Design",
    year: "2024",
    description: "UI/UX design system and web application development.",
    tags: ["Design", "Development"],
    image: null,
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(".projects-header", {
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate stat block
      gsap.from(".projects-stat", {
        scrollTrigger: {
          trigger: ".projects-stat",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      // Remove the problematic project card animation
      // Cards will be visible by default to prevent loading issues
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#0a0a0a] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="projects-header mb-16 lg:mb-20">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <span className="mb-4 block font-mono text-xs text-gray-500">
                // our work
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Projects.
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-sm leading-relaxed text-gray-400">
                Real creativity. Tangible results. Discover our innovative digital
                experiences across multiple industries.
              </p>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid gap-4 md:grid-cols-2 lg:gap-6">
          {placeholderProjects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                "project-card group relative overflow-hidden rounded-2xl border border-white/5 bg-[#111] transition-all hover:border-white/10",
                index === 0 && "md:col-span-2 md:row-span-2"
              )}
            >
              {/* Project Image/Placeholder */}
              <div
                className={cn(
                  "relative overflow-hidden bg-gradient-to-br from-primary/10 via-[#111] to-[#111]",
                  index === 0 ? "h-80 lg:h-96" : "h-64"
                )}
              >
                {/* Placeholder gradient */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl font-bold text-white/5">
                    {project.client.charAt(0)}
                  </span>
                </div>

                {/* Year Badge */}
                <div className="absolute right-4 top-4">
                  <span className="rounded-full border border-white/10 bg-[#111]/80 px-3 py-1 font-mono text-xs text-gray-400 backdrop-blur-sm">
                    /{project.year}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full border border-white/10 bg-[#111]/80 px-3 py-1 text-xs text-gray-400 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
              </div>

              {/* Project Info */}
              <div className="p-6 lg:p-8">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <span className="mb-2 block font-mono text-xs text-gray-600">
                      // {project.client.toLowerCase().replace(/ /g, "_")}
                    </span>
                    <h3 className="mb-2 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-primary lg:text-2xl">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-500 transition-colors group-hover:border-white/20 group-hover:text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats/CTA Block */}
        <div className="projects-stat mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/5 bg-gradient-to-br from-primary/5 to-transparent p-6 lg:mt-16 lg:flex-row lg:p-8">
          <div>
            <span className="mb-2 block font-mono text-xs text-gray-600">
              // track record
            </span>
            <div className="mb-1 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white lg:text-5xl">
                150<span className="text-primary">+</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">
              projects delivered with excellence across{" "}
              <span className="text-white">multiple industries.</span>
            </p>
          </div>
          <a
            href="#contact"
            className="group flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90"
          >
            View all
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
