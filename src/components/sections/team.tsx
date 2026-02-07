"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { team } from "@/data/team";
import Globe from "@/components/Globe";

gsap.registerPlugin(ScrollTrigger);

// Tool icons (placeholder for now - can be replaced with actual SVGs/images)
const tools = [
  { name: "Figma", icon: "🎨" },
  { name: "Adobe", icon: "🅰️" },
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Tailwind", icon: "💨" },
  { name: "Node.js", icon: "🟢" },
];

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate bento cards
      gsap.from(".about-card", {
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top 75%",
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Animate founder section
      gsap.from(".founder-section", {
        scrollTrigger: {
          trigger: ".founder-section",
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative bg-[#0a0a0a] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <span className="mb-4 block font-mono text-xs text-gray-500">
            // who we are
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            About.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="about-grid relative mb-8 overflow-hidden">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:gap-6">
            {/* Left Column - Stats */}
            <div className="space-y-4 md:col-span-3 lg:space-y-6">
              {/* Stats Card 1 */}
              <div className="about-card rounded-2xl border border-white/5 bg-[#111] p-6">
                <div className="mb-1 text-5xl font-bold text-white lg:text-6xl">
                  5<span className="text-primary">+</span>
                </div>
                <p className="text-sm text-gray-400">Years of Experience</p>
              </div>

              {/* Stats Card 2 */}
              <div className="about-card rounded-2xl border border-white/5 bg-[#111] p-6">
                <div className="mb-1 text-5xl font-bold text-white lg:text-6xl">
                  {team.length}<span className="text-primary">+</span>
                </div>
                <p className="text-sm text-gray-400">Co-founders</p>
              </div>

              {/* Stats Card 3 */}
              <div className="about-card rounded-2xl border border-white/5 bg-[#111] p-6">
                <div className="mb-1 text-5xl font-bold text-white lg:text-6xl">
                  150<span className="text-primary">+</span>
                </div>
                <p className="text-sm text-gray-400">Satisfied Clients</p>
              </div>
            </div>

            {/* Globe Card */}
            <div className="about-card relative md:col-span-9">
              <div className="relative flex h-full min-h-[400px] flex-col rounded-2xl border border-white/5 bg-[#111]">
                <div className="absolute left-0 top-8 z-10 px-8">
                  <p className="mb-1 text-lg font-semibold text-white">
                    Based in Chennai, India
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="flex h-2 w-2">
                      <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                    </span>
                    AVAILABLE WORLDWIDE
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl">
                  <div className="h-[120%] w-[120%] translate-x-[15%]">
                    <Globe
                      markerLat={13.08}
                      markerLng={80.27}
                      autoRotate={true}
                      embedded={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Company Section */}
        <div className="founder-section space-y-8">
          {/* Main Company Overview */}
          <div className="rounded-2xl border border-white/5 bg-[#111] p-8 lg:p-12">
            <span className="mb-6 block font-mono text-xs text-gray-600">
              // about hexora
            </span>
            <div className="mb-8">
              <h3 className="mb-4 text-2xl font-bold text-white lg:text-3xl">
                Transforming MSMEs Through Technology
              </h3>
              <p className="mb-6 text-base leading-relaxed text-gray-300 lg:text-lg">
                We&apos;re a team of passionate technologists and business strategists 
                dedicated to driving digital transformation for Small and Medium-sized Enterprises. 
                With combined decades of experience, we understand the unique challenges businesses 
                face and deliver tailored solutions that drive measurable growth.
              </p>
              <p className="text-sm leading-relaxed text-gray-400">
                Our mission is simple: leverage cutting-edge technology to empower MSMEs with the 
                tools and strategies they need to compete globally. Every project is built on a 
                foundation of technical excellence, business insight, and genuine partnership.
              </p>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="mt-8 rounded-2xl border border-white/5 bg-[#111] p-6 lg:p-8">
          <span className="mb-6 block font-mono text-xs text-gray-600">
            // technology & tooling
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:justify-start">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col items-center gap-2 transition-transform hover:scale-110"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-2xl">
                  {tool.icon}
                </div>
                <span className="text-xs text-gray-500">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
