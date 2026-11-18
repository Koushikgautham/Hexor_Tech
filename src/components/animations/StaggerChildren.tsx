"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/ClassNameMerge";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0,
  once = true,
}: StaggerChildrenProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};
