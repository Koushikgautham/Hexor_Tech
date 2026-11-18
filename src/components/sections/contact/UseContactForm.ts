"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useGsapReady } from "@/hooks/UseGsapReady";
import { contactSchema, ContactFormData } from "./ContactFormSchema";

export function useContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactFormReady = useGsapReady('.contact-form');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const selectedService = watch("service");

  useEffect(() => {
    if (!contactFormReady) return; // Wait for DOM
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(".contact-header", {
        scrollTrigger: {
          trigger: ".contact-header",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate form
      gsap.from(".contact-form", {
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate info cards
      gsap.from(".contact-info-card", {
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [contactFormReady]); // Add dependency

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    toast.success("Message sent successfully! We'll get back to you soon.");
    reset();
    setIsSubmitting(false);
  };

  return {
    sectionRef,
    isSubmitting,
    setIsSubmitting,
    contactFormReady,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    errors,
    selectedService,
    onSubmit,
  };
}

export type ContactFormState = ReturnType<typeof useContactForm>;
