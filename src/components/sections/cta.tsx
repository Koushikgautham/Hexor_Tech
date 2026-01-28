"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FadeIn,
  Particles,
  MagneticButton,
} from "@/components/animations";

export function CTA() {
  return (
    // ENHANCEMENT: Added id for scroll progress navigation
    <section id="cta" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <Particles quantity={30} className="opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/20 bg-card/80 p-8 text-center backdrop-blur-sm sm:p-12 lg:p-16">
          <FadeIn>
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to{" "}
              <span className="text-primary">Transform</span> Your Business?
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Let&apos;s discuss how Hexor can help your MSME embrace digital
              transformation. Schedule a free consultation today.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:gap-6 md:flex-row md:gap-8">
              <MagneticButton>
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full px-6 text-base sm:w-auto sm:px-8"
                >
                  <Link href="/contact">
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full px-6 text-base sm:w-auto sm:px-8"
                >
                  <Link href="/contact">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat With Us
                  </Link>
                </Button>
              </MagneticButton>
            </div>
          </FadeIn>

          {/* Trust Elements */}
          <FadeIn delay={0.6}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                No obligation
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                Quick response
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                Free consultation
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
