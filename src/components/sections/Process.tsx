"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, Rocket, TrendingUp } from "lucide-react";
import { FadeIn, StaggerChildren, staggerItemVariants } from "@/components/animations";

const processSteps = [
  {
    icon: Search,
    title: "Discovery",
    description:
      "We start by understanding your business, challenges, and goals through in-depth consultations.",
  },
  {
    icon: Lightbulb,
    title: "Strategy",
    description:
      "Our team develops a customized digital strategy tailored to your specific needs.",
  },
  {
    icon: Rocket,
    title: "Execute",
    description:
      "We implement solutions with precision, keeping you informed at every step of the journey.",
  },
  {
    icon: TrendingUp,
    title: "Optimize",
    description:
      "Continuous monitoring and optimization ensure your digital assets deliver maximum ROI.",
  },
];

export function Process() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Our Process
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How We Work
          </h2>
          <p className="text-lg text-gray-400">
            A proven methodology that delivers results. We&apos;ve refined our
            process over hundreds of successful projects.
          </p>
        </FadeIn>

        {/* Process Timeline */}
        <StaggerChildren
          className="relative mt-16"
          staggerDelay={0.2}
        >
          {/* Connecting Line - Desktop */}
          <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={staggerItemVariants}
                className="relative"
              >
                {/* Step Number */}
                <div className="absolute -top-3 left-0 text-6xl font-bold text-muted/30 lg:left-1/2 lg:-translate-x-1/2">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Card */}
                <div className="relative z-10 rounded-xl border border-white/5 bg-[#111] p-6 pt-12 transition-colors hover:border-primary/50 lg:text-center">
                  {/* Icon */}
                  <motion.div
                    className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary lg:mx-auto"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <step.icon className="h-6 w-6" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="mb-2 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="text-sm text-gray-400">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Mobile */}
                {index < processSteps.length - 1 && (
                  <div className="my-4 flex justify-center lg:hidden">
                    <div className="h-8 w-0.5 bg-white/5" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </StaggerChildren>
      </div>
    </section>
  );
}
