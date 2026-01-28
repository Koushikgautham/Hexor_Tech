"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { testimonials } from "@/data/testimonials";
import { useGsapReady } from "@/hooks/useGsapReady";

gsap.registerPlugin(ScrollTrigger);

// Stats for the bottom row
const stats = [
  {
    value: "4.6",
    suffix: "s",
    label: "Average page load time across all client websites we've deployed",
  },
  {
    value: "18",
    suffix: "+",
    label: "Countries where brands use websites built by Hexor",
  },
  {
    value: "72",
    suffix: "%",
    label: "Average improvement in conversion rates after a Hexor-led redesign",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialCardsReady = useGsapReady('.testimonial-card');

  useEffect(() => {
    if (!testimonialCardsReady) return; // Wait for DOM
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(".testimonials-header", {
        scrollTrigger: {
          trigger: ".testimonials-header",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate featured quote
      gsap.from(".featured-quote", {
        scrollTrigger: {
          trigger: ".featured-quote",
          start: "top 80%",
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate testimonial cards
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: ".testimonials-grid",
          start: "top 75%",
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Animate stats
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: ".stats-row",
          start: "top 85%",
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [testimonialCardsReady]); // Add dependency

  // Get featured testimonial (first one)
  const featuredTestimonial = testimonials[0];
  // Get grid testimonials (rest)
  const gridTestimonials = testimonials.slice(1, 5);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-[#0a0a0a] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="testimonials-header mb-12 flex flex-col items-start justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
          <div>
            <span className="mb-4 block font-mono text-xs text-gray-500">
              // what they say
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Client <span className="text-gray-400">stories.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-400">
              Hear directly from our clients about their experiences with Hexor—from
              seamless collaboration to impactful design solutions that elevate their brands.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Client avatars stack */}
            <div className="flex -space-x-3">
              {testimonials.slice(0, 4).map((t, i) => (
                <div
                  key={t.id}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-primary/20 text-xs font-semibold text-primary"
                  style={{ zIndex: 4 - i }}
                >
                  {t.author.charAt(0)}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              We&apos;ve successfully completed{" "}
              <span className="font-semibold text-white">150+ projects</span>
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="testimonials-grid grid gap-4 lg:grid-cols-12 lg:gap-6">
          {/* Featured Quote - Left Side */}
          <div className="featured-quote lg:col-span-4">
            <div className="flex h-full flex-col rounded-2xl border border-white/5 bg-[#111] p-8">
              <Quote className="mb-6 h-12 w-12 text-primary" strokeWidth={1} />
              <blockquote className="mb-8 flex-1 text-lg leading-relaxed text-gray-300 lg:text-xl">
                {featuredTestimonial.quote}
              </blockquote>
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                    {featuredTestimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{featuredTestimonial.author}</p>
                    <p className="text-xs text-gray-500">
                      {featuredTestimonial.role}, {featuredTestimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Cards Grid - Right Side */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:gap-6">
            {gridTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={cn(
                  "testimonial-card group rounded-2xl border border-white/5 bg-[#111] p-6 transition-all hover:border-white/10",
                  index === 0 && "sm:col-span-2 lg:col-span-1"
                )}
              >
                {/* Author Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{testimonial.author}</p>
                      <p className="text-xs text-gray-500">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <p className="mb-6 text-sm leading-relaxed text-gray-400">
                  {testimonial.quote}
                </p>

                {/* Stats */}
                <div className="flex items-end justify-between border-t border-white/10 pt-4">
                  <div>
                    <span className="block text-2xl font-bold text-primary">
                      +{35 + index * 10}%
                    </span>
                    <span className="text-xs text-gray-500">
                      {index % 2 === 0 ? "User engagement" : "Conversion rate"}
                    </span>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 opacity-0 transition-all group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats Row */}
        <div className="stats-row mt-8 grid gap-4 md:grid-cols-4 lg:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item rounded-2xl border border-white/5 bg-[#111] p-6"
            >
              <div className="mb-2 flex items-baseline">
                <span className="text-4xl font-bold text-white lg:text-5xl">
                  {stat.value}
                </span>
                <span className="text-2xl font-bold text-primary lg:text-3xl">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-gray-500">{stat.label}</p>
            </div>
          ))}

          {/* CTA Card */}
          <div className="stat-item flex flex-col justify-between rounded-2xl border border-white/5 bg-gradient-to-br from-primary/10 to-[#111] p-6">
            <div>
              <span className="mb-2 block font-mono text-xs text-gray-600">
                // feedback
              </span>
              <p className="text-sm text-gray-300">
                If you&apos;ve enjoyed working with us, we&apos;d love to hear from you
              </p>
            </div>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-white"
            >
              Leave a Review
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
