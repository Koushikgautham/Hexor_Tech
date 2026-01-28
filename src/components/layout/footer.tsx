"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, Twitter, Instagram, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Digital Transformation", href: "#services" },
      { label: "Automation Solutions", href: "#services" },
      { label: "Ecommerce Management", href: "#services" },
      { label: "Social Media", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#team" },
      { label: "Projects", href: "#projects" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-content", {
        scrollTrigger: {
          trigger: ".footer-content",
          start: "top 90%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-white/5 bg-[#0a0a0a]"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="footer-content">
          {/* Main Footer Content */}
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block">
                <span className="text-2xl font-bold tracking-tight">
                  <span className="text-primary">Hex</span>
                  <span className="text-white">or</span>
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
                Empowering MSMEs with cutting-edge digital transformation
                solutions. We help businesses automate, scale, and thrive in the
                digital age.
              </p>

              {/* Social Links */}
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-primary hover:bg-primary hover:text-white"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
              {footerLinks.map((group) => (
                <div key={group.title}>
                  <span className="mb-4 block font-mono text-xs text-gray-600">
                    // {group.title.toLowerCase()}
                  </span>
                  <ul className="space-y-3">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="group inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Hexor. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              <span className="font-mono">// </span>
              Crafted with passion in Chennai, India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
