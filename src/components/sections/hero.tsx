"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { ThreadsBackground } from "@/components/animations/threads-background";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".hero-fade", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.from(".hero-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative bg-[#0a0a0a] pt-24 overflow-hidden"
    >
      {/* Threads Background */}
      <ThreadsBackground amplitude={1.5} className="opacity-70" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top Section */}
        <div className="pt-12 lg:pt-20">
          {/* Code-style tag */}
          <div className="hero-line mb-8">
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-gray-500">
              <span className="text-primary">&lt;</span>
              hexor.tech
              <span className="text-primary">/&gt;</span>
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mb-6 max-w-4xl">
            <div className="hero-line text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              We craft digital
            </div>
            <div className="hero-line text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-white">experiences that </span>
              <span className="text-primary">move</span>
            </div>
            <div className="hero-line text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              brands forward.
            </div>
          </h1>

          {/* Description */}
          <p className="hero-fade mb-10 max-w-xl text-base leading-relaxed text-gray-400 lg:text-lg">
            A digital agency specializing in web development, e-commerce, and
            brand systems for ambitious businesses.
          </p>

          {/* CTA Buttons */}
          <div className="hero-fade flex flex-wrap items-center gap-4">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90"
            >
              View Our Work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Start a Project
            </Link>
          </div>
        </div>

        {/* Services Preview */}
        <div className="mt-12 border-t border-white/5 pt-8 lg:mt-16">
          <div className="hero-fade mb-8 flex items-center justify-between">
            <span className="font-mono text-xs text-gray-500">
              // what we do
            </span>
            <Link
              href="/services"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              All services →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "01", title: "Web Development", desc: "Custom websites & apps" },
              { num: "02", title: "E-Commerce", desc: "Online stores & platforms" },
              { num: "03", title: "Brand Identity", desc: "Logo & visual systems" },
              { num: "04", title: "Digital Marketing", desc: "SEO & social media" },
            ].map((service) => (
              <div
                key={service.num}
                className="hero-card group cursor-pointer"
              >
                <div className="mb-3 font-mono text-xs text-primary">
                  {service.num}
                </div>
                <h3 className="mb-1 text-lg font-semibold text-white transition-colors group-hover:text-primary">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-20" />
      </div>
    </section>
  );
}
