"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Linkedin, Twitter } from "lucide-react";
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
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const currentMember = team[currentMemberIndex];

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

  const nextMember = () => {
    setCurrentMemberIndex((prev) => (prev + 1) % team.length);
  };

  const prevMember = () => {
    setCurrentMemberIndex((prev) => (prev - 1 + team.length) % team.length);
  };

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

        {/* Founder Section with Carousel */}
        <div className="founder-section rounded-2xl border border-white/5 bg-[#111] overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Photo Side */}
            <div className="relative h-96 md:h-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#0a0a0a]">
                <img
                  src={currentMember.avatar}
                  alt={currentMember.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if image fails
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
              {/* Name overlay on photo */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white lg:text-3xl">
                  {currentMember.name}
                </h3>
                <p className="text-sm font-medium text-primary-foreground/80">
                  {currentMember.role}
                </p>
              </div>
            </div>

            {/* Bio Side */}
            <div className="flex flex-col justify-between p-8 lg:p-12">
              <div>
                <span className="mb-6 block font-mono text-xs text-gray-600">
                  // the founders
                </span>
                <p className="mb-6 text-base leading-relaxed text-gray-300 lg:text-lg">
                  {currentMember.bio}
                </p>
                <p className="mb-8 text-sm leading-relaxed text-gray-400">
                  We&apos;re a team of passionate technologists and business strategists
                  dedicated to transforming MSMEs through innovative digital solutions.
                  With combined decades of experience, we bring both technical expertise
                  and business acumen to every project.
                </p>

                {/* Social Links */}
                <div className="flex gap-3">
                  <a
                    href={currentMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={currentMember.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-gray-600">
                    {String(currentMemberIndex + 1).padStart(2, '0')} / {String(team.length).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prevMember}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                    aria-label="Previous team member"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextMember}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                    aria-label="Next team member"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
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
