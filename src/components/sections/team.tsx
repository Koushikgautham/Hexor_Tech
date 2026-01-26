"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";
import {
  FadeIn,
  StaggerChildren,
  staggerItemVariants,
} from "@/components/animations";
import { team } from "@/data/team";

export function Team() {
  return (
    <section id="team" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Meet The Team
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            The Minds Behind Hexora
          </h2>
          <p className="text-lg text-muted-foreground">
            A passionate team of co-founders dedicated to transforming MSMEs through
            innovative digital solutions.
          </p>
        </FadeIn>

        {/* Team Grid */}
        <StaggerChildren
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.1}
        >
          {team.map((member) => (
            <motion.div
              key={member.id}
              variants={staggerItemVariants}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                {/* Avatar */}
                <div className="mb-4 flex justify-center">
                  <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-primary/20 transition-all duration-300 group-hover:border-primary/50">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="mb-3 text-sm font-medium text-primary">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Social Links */}
                <div className="mt-4 flex justify-center gap-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
