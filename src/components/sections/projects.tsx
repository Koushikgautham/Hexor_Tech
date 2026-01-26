"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, CardSwap, Card } from "@/components/animations";
import "@/components/animations/card-swap.css";

// Placeholder projects - will be replaced with real data
const placeholderProjects = [
  {
    id: 1,
    title: "Project Coming Soon",
    client: "Client Name",
    category: "Digital Transformation",
    description: "An exciting case study showcasing our digital transformation expertise for a leading MSME.",
    results: [
      { metric: "200%", label: "Growth" },
      { metric: "50%", label: "Cost Saved" },
    ],
    tags: ["Automation", "Cloud", "Analytics"],
  },
  {
    id: 2,
    title: "Project Coming Soon",
    client: "Ecommerce Brand",
    category: "Ecommerce Solutions",
    description: "Complete ecommerce platform development and scaling for rapid business growth.",
    results: [
      { metric: "3x", label: "Revenue" },
      { metric: "40%", label: "Conversion" },
    ],
    tags: ["Shopify", "Payments", "Inventory"],
  },
  {
    id: 3,
    title: "Project Coming Soon",
    client: "Social Brand",
    category: "Social Media Management",
    description: "Strategic social media campaigns that drove exceptional engagement and growth.",
    results: [
      { metric: "500%", label: "Reach" },
      { metric: "10x", label: "Engagement" },
    ],
    tags: ["Content", "Ads", "Analytics"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div>
            <FadeIn>
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Our Work
              </span>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Success Stories
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Real results for real businesses. See how we&apos;ve helped MSMEs
                transform and grow with our digital solutions.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-6">
                {placeholderProjects.slice(0, 3).map((project, index) => (
                  <div
                    key={project.id}
                    className="group flex items-start gap-4 rounded-lg border border-transparent p-4 transition-all hover:border-border hover:bg-secondary/50 cursor-pointer"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                        {project.description}
                      </p>
                      <div className="mt-2 flex gap-3">
                        {project.results.slice(0, 2).map((result, i) => (
                          <span key={i} className="text-xs">
                            <span className="font-semibold text-primary">
                              {result.metric}
                            </span>{" "}
                            <span className="text-muted-foreground">
                              {result.label}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.4} className="mt-8">
              <p className="mb-4 text-muted-foreground text-sm">
                More case studies coming soon. Want to be our next success story?
              </p>
              <Button
                className="rounded-full"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </FadeIn>
          </div>

          {/* Right Column - Card Swap Animation */}
          <FadeIn delay={0.3} className="relative hidden lg:block">
            <div className="relative h-[500px] flex items-center justify-center">
              <CardSwap
                width={400}
                height={320}
                cardDistance={50}
                verticalDistance={60}
                delay={4000}
                pauseOnHover={true}
                skewAmount={4}
                easing="elastic"
              >
                {placeholderProjects.map((project) => (
                  <Card key={project.id} className="group bg-background">
                    {/* Card Image Area - Gradient placeholder */}
                    <div className="relative h-40 overflow-hidden bg-secondary">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-muted">
                        <span className="text-6xl font-bold text-primary/30">
                          {project.client.charAt(0)}
                        </span>
                      </div>
                      {/* Category Badge */}
                      <Badge className="absolute top-3 left-3" variant="secondary">
                        {project.category}
                      </Badge>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 bg-background">
                      <h3 className="mb-1 text-base font-semibold line-clamp-1 text-foreground">
                        {project.title}
                      </h3>
                      <p className="mb-3 text-xs text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>

                      {/* Results */}
                      <div className="flex gap-4 mb-3">
                        {project.results.map((result, i) => (
                          <div key={i} className="text-center">
                            <span className="block text-lg font-bold text-primary">
                              {result.metric}
                            </span>
                            <span className="text-[10px] text-muted-foreground uppercase">
                              {result.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </FadeIn>

          {/* Mobile Cards - Shown on smaller screens */}
          <div className="lg:hidden">
            <FadeIn delay={0.3}>
              <div className="grid gap-4 sm:grid-cols-2">
                {placeholderProjects.slice(0, 2).map((project) => (
                  <div
                    key={project.id}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <Badge className="mb-3" variant="secondary">
                      {project.category}
                    </Badge>
                    <h3 className="font-semibold mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {project.description}
                    </p>
                    <div className="flex gap-4">
                      {project.results.map((result, i) => (
                        <div key={i}>
                          <span className="font-bold text-primary">{result.metric}</span>
                          <span className="text-xs text-muted-foreground ml-1">{result.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
