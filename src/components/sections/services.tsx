"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FadeIn,
  StaggerChildren,
  staggerItemVariants,
  SpotlightCard,
} from "@/components/animations";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            What We Do
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Services That Drive Growth
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive digital solutions tailored for MSMEs. We handle the
            technology so you can focus on your business.
          </p>
        </FadeIn>

        {/* Services Grid */}
        <StaggerChildren
          className="mt-16 grid gap-8 lg:grid-cols-2"
          staggerDelay={0.15}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={staggerItemVariants}>
              <SpotlightCard className="h-full">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <service.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                      Key Features
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.slice(0, 4).map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                          <span className="line-clamp-1">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits Preview */}
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <div className="flex flex-wrap gap-2">
                      {service.benefits.slice(0, 3).map((benefit, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </StaggerChildren>

        {/* CTA */}
        <FadeIn delay={0.4} className="mt-12 text-center">
          <Button
            size="lg"
            className="rounded-full"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Discuss Your Needs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
