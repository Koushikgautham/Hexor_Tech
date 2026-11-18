"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/ClassNameMerge";
import { useGsapReady } from "@/hooks/UseGsapReady";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Digital Transformation",
    description: "Modernize your business with digital-first approaches. We handle cloud migration, process automation, and legacy system updates.",
    tags: ["Cloud Migration", "Process Digitization", "Data Analytics"],
  },
  {
    num: "02",
    title: "Automation Solutions",
    description: "Streamline operations with intelligent automation. Reduce manual work, minimize errors, and focus on what matters.",
    tags: ["Workflow Automation", "API Integrations", "AI/ML Solutions"],
  },
  {
    num: "03",
    title: "E-Commerce",
    description: "Launch and scale your online store. From platform setup to inventory management, we handle the tech side.",
    tags: ["Store Setup", "Inventory Systems", "Multi-channel Selling"],
  },
  {
    num: "04",
    title: "Social Media",
    description: "Build your brand presence across platforms. Strategic content, community engagement, and data-driven campaigns.",
    tags: ["Content Strategy", "Community Management", "Paid Campaigns"],
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const serviceItemsReady = useGsapReady('.service-item');

  useEffect(() => {
    if (!serviceItemsReady) return; // Wait for DOM
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(".services-header", {
        scrollTrigger: {
          trigger: ".services-header",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate each service item
      gsap.from(".service-item", {
        scrollTrigger: {
          trigger: ".services-list",
          start: "top 75%",
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Animate CTA
      gsap.from(".services-cta", {
        scrollTrigger: {
          trigger: ".services-cta",
          start: "top 85%",
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [serviceItemsReady]); // Add dependency

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-[#0a0a0a] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="services-header mb-16 lg:mb-24">
          <div className="flex items-center justify-between">
            <div>
              <span className="mb-4 block font-mono text-xs text-gray-500">
                // what we do
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Services
              </h2>
            </div>
            <div className="hidden text-right md:block">
              <span className="font-mono text-xs text-gray-500">
                // expertise
              </span>
              <p className="mt-1 max-w-xs text-sm text-gray-400">
                Comprehensive digital solutions tailored for ambitious businesses
              </p>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="services-list space-y-1">
          {services.map((service, index) => (
            <div
              key={service.num}
              className="service-item group"
            >
              {/* Main Row */}
              <div
                onClick={() => toggleExpand(index)}
                className={cn(
                  "flex cursor-pointer items-center justify-between border-t border-white/10 py-6 transition-all duration-300 lg:py-8",
                  expandedIndex === index && "border-white/20"
                )}
              >
                {/* Left: Number */}
                <div className="flex items-center gap-6 lg:gap-12">
                  <div className="relative flex items-center font-mono">
                    {/* Number - always visible */}
                    <span
                      className={cn(
                        "inline-block font-bold transition-all duration-500 ease-out",
                        expandedIndex === index
                          ? "text-xl text-white lg:text-2xl"
                          : "text-base text-primary lg:text-lg"
                      )}
                    >
                      {service.num}
                    </span>
                    {/* Slash - moves from right to left */}
                    <span
                      className={cn(
                        "inline-block font-bold text-primary transition-all duration-500 ease-out",
                        expandedIndex === index
                          ? "order-first text-xl lg:text-2xl -mr-1"
                          : "order-last text-base lg:text-lg ml-0"
                      )}
                    >
                      /
                    </span>
                  </div>
                  <h3 className={cn(
                    "text-xl font-semibold tracking-tight transition-colors duration-300 lg:text-2xl",
                    expandedIndex === index ? "text-white" : "text-gray-300 group-hover:text-white"
                  )}>
                    {service.title}
                  </h3>
                </div>

                {/* Right: Tags + Expand Icon */}
                <div className="flex items-center gap-4 lg:gap-8">
                  {/* Tags - hidden on mobile, visible on larger screens */}
                  <div className="hidden items-center gap-2 md:flex">
                    {service.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-500 transition-colors duration-300 group-hover:border-white/20 group-hover:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expand/Collapse Icon */}
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300",
                    expandedIndex === index
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-white/10 text-gray-500 group-hover:border-white/20 group-hover:text-white"
                  )}>
                    {expandedIndex === index ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              <div
                className={cn(
                  "grid transition-all duration-500 ease-out",
                  expandedIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="pb-8 pl-12 lg:pl-24">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                      {/* Description */}
                      <div>
                        <span className="mb-3 block font-mono text-xs text-gray-600">
                          // overview
                        </span>
                        <p className="max-w-md text-base leading-relaxed text-gray-400">
                          {service.description}
                        </p>
                      </div>

                      {/* Tags for mobile + CTA */}
                      <div>
                        <span className="mb-3 block font-mono text-xs text-gray-600">
                          // capabilities
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a
                          href="#contact"
                          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                        >
                          Learn more
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom border */}
          <div className="border-t border-white/10" />
        </div>

        {/* CTA Section */}
        <div className="services-cta mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/5 bg-[#111] p-8 lg:mt-24 lg:flex-row lg:p-12">
          <div>
            <span className="mb-2 block font-mono text-xs text-gray-500">
              // ready to start?
            </span>
            <h3 className="text-xl font-semibold text-white lg:text-2xl">
              Let&apos;s discuss your project
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Get a free consultation and custom proposal for your business needs.
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90"
          >
            Start a Project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
