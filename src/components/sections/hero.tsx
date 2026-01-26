"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AuroraBackground,
  SplitText,
  BlurText,
  MagneticButton,
  InfiniteScroll,
} from "@/components/animations";

const clientLogos = [
  "TechMart",
  "GreenLeaf",
  "Fashionista",
  "UrbanFit",
  "Patel Industries",
  "CloudNine",
  "SwiftLogistics",
  "DigitalFirst",
];

export function Hero() {
  return (
    // ENHANCEMENT: Added id for scroll progress navigation
    <AuroraBackground id="hero" className="min-h-screen pt-20 pb-32 relative">
      {/* Gradient fade to black at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black via-black/80 to-transparent z-[1] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Empowering MSMEs since 2019
            </span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="mb-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <SplitText
              text="Transform Your Business"
              className="text-foreground"
              delay={0.2}
            />
            <br />
            <span className="text-primary">
              <SplitText text="Into The Future" delay={0.5} />
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            <BlurText
              text="We help MSMEs embrace digital transformation with automation, ecommerce, and social media solutions that drive real results."
              delay={0.8}
              duration={1}
            />
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 md:gap-8"
          >
            <MagneticButton>
              <Button asChild size="lg" className="rounded-full px-8 text-base">
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 text-base"
              >
                <Link href="/portfolio">
                  <Play className="mr-2 h-4 w-4" />
                  See Our Work
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16"
          >
            {[
              { value: "150+", label: "Projects Delivered" },
              { value: "50+", label: "Happy Clients" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary sm:text-3xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Trust Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="mt-20 w-full"
          >
            <p className="mb-6 text-center text-sm text-muted-foreground">
              Trusted by leading businesses
            </p>
            <InfiniteScroll speed={40} className="py-4">
              {clientLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex h-12 w-32 items-center justify-center rounded-lg border border-border/50 bg-card/50 px-4"
                >
                  <span className="text-sm font-semibold text-muted-foreground">
                    {logo}
                  </span>
                </div>
              ))}
            </InfiniteScroll>
          </motion.div>
        </div>
      </div>
    </AuroraBackground>
  );
}
