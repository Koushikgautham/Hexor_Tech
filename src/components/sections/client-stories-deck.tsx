"use client";

import { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

// Memoized story card component to prevent unnecessary re-renders
const StoryCardMemo = memo(({ testimonial, cardIndex, anglePerCard, cylinderRadius }: any) => (
  <motion.div
    className="absolute left-1/2 top-1/2 w-64"
    style={{
      transform: `
        translateX(-50%)
        translateY(-50%)
        rotateY(${cardIndex * anglePerCard}deg)
        translateZ(${cylinderRadius}px)
      `,
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      willChange: "transform",
    }}
  >
    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#111]/80 to-[#0a0a0a]/80 backdrop-blur-sm p-6 shadow-xl hover:border-primary/40 transition-all h-full flex flex-col select-none">
      {/* Quote Icon */}
      <Quote className="mb-4 h-8 w-8 text-primary flex-shrink-0" strokeWidth={1.5} />

      {/* Quote Text */}
      <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-gray-200 pointer-events-none">
        "{testimonial.quote}"
      </blockquote>

      {/* Author Info */}
      <div className="border-t border-white/10 pt-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary flex-shrink-0">
            {testimonial.author.charAt(0)}
          </div>
          <div className="min-w-0 pointer-events-none">
            <p className="font-semibold text-white text-xs truncate">
              {testimonial.author}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
));

StoryCardMemo.displayName = "StoryCard";

export function ClientStoriesDeck() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartRotation, setDragStartRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);

  const totalCards = testimonials.length;
  const anglePerCard = 360 / totalCards;
  const cylinderRadius = 300; // Slightly smaller radius

  // Handle mouse down to start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartRotation(rotation);
  };

  // Handle mouse move while dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartX;
    // Drag 1px = 0.5deg rotation
    const newRotation = dragStartRotation + deltaX * 0.5;
    setRotation(newRotation);
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add keyboard support for fine-tuning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setRotation((prev) => prev + 5);
      if (e.key === "ArrowRight") setRotation((prev) => prev - 5);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="client-stories" className="relative bg-[#0a0a0a] py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center lg:mb-16 select-none">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3 block font-mono text-xs text-gray-500 pointer-events-none"
          >
            // what they say
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl pointer-events-none"
          >
            Client <span className="text-gray-400">stories.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 mx-auto max-w-2xl text-sm leading-relaxed text-gray-400 pointer-events-none"
          >
            Drag to explore real experiences from our satisfied clients.
          </motion.p>
        </div>

        {/* Cylinder Container */}
        <div
          ref={containerRef}
          className={`relative mx-auto h-96 max-w-3xl flex items-center justify-center select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ perspective: "1200px", touchAction: "none" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Cylinder with cards */}
          <motion.div
            ref={cylinderRef}
            className="relative w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            animate={{ rotateY: rotation }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Looped cards for seamless cycling */}
            {[...testimonials, ...testimonials].map((testimonial, index) => {
              const cardIndex = index % totalCards;

              return (
                <StoryCardMemo
                  key={`${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  cardIndex={cardIndex}
                  anglePerCard={anglePerCard}
                  cylinderRadius={cylinderRadius}
                />
              );
            })}
          </motion.div>

          {/* Center Glow Effect */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.div
              className="w-48 h-48 rounded-full bg-primary/5 blur-2xl"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        {/* Controls Info */}
        <div className="mt-10 text-center select-none pointer-events-none">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs text-gray-600"
          >
            <span className="inline-block">Click & drag left/right to rotate</span>
            <span className="mx-2 text-gray-700">•</span>
            <span className="inline-block">Use arrow keys to fine-tune</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
