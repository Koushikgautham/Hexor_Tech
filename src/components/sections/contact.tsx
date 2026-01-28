"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useGsapReady } from "@/hooks/useGsapReady";

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@hexor.tech",
    href: "mailto:hello@hexor.tech",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Chennai, India",
    href: "#",
  },
];

const services = [
  { value: "digital-transformation", label: "Digital Transformation" },
  { value: "automation", label: "Automation Solutions" },
  { value: "ecommerce", label: "Ecommerce Management" },
  { value: "social-media", label: "Social Media Management" },
  { value: "web-development", label: "Web Development" },
  { value: "other", label: "Other" },
];

export function Contact() {
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

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#0a0a0a] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="contact-header mb-12 lg:mb-16">
          <span className="mb-4 block font-mono text-xs text-gray-500">
            // let&apos;s connect
          </span>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Get in <span className="text-gray-400">touch.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-400">
                Ready to transform your business? Let&apos;s discuss how we can help
                you achieve your digital goals.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3">
                <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
              </span>
              <span className="text-sm text-gray-400">
                Available for new projects
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Contact Form */}
          <div className="contact-form lg:col-span-7">
            <div className="rounded-2xl border border-white/5 bg-[#111] p-8 lg:p-10">
              <span className="mb-6 block font-mono text-xs text-gray-600">
                // send a message
              </span>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                      Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      {...register("name")}
                      className={cn(
                        "w-full rounded-lg border bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 transition-all",
                        errors.name
                          ? "border-red-500/50 focus:ring-red-500/50"
                          : "border-white/10 focus:border-primary/50 focus:ring-primary/50"
                      )}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      {...register("email")}
                      className={cn(
                        "w-full rounded-lg border bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 transition-all",
                        errors.email
                          ? "border-red-500/50 focus:ring-red-500/50"
                          : "border-white/10 focus:border-primary/50 focus:ring-primary/50"
                      )}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      {...register("phone")}
                      className="w-full rounded-lg border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Your company name"
                      {...register("company")}
                      className="w-full rounded-lg border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300">
                    Service <span className="text-primary">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <button
                        key={service.value}
                        type="button"
                        onClick={() => setValue("service", service.value)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-xs font-medium transition-all",
                          selectedService === service.value
                            ? "border-primary bg-primary/20 text-primary"
                            : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                        )}
                      >
                        {service.label}
                      </button>
                    ))}
                  </div>
                  {errors.service && (
                    <p className="text-xs text-red-400">{errors.service.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    {...register("message")}
                    className={cn(
                      "w-full rounded-lg border bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 transition-all resize-none",
                      errors.message
                        ? "border-red-500/50 focus:ring-red-500/50"
                        : "border-white/10 focus:border-primary/50 focus:ring-primary/50"
                    )}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-info lg:col-span-5">
            <div className="space-y-4">
              {/* Info Cards */}
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="contact-info-card group flex items-center gap-4 rounded-2xl border border-white/5 bg-[#111] p-6 transition-all hover:border-white/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="font-medium text-white">{item.value}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-600 transition-all group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}

              {/* Why Choose Us Card */}
              <div className="contact-info-card rounded-2xl border border-white/5 bg-gradient-to-br from-primary/10 to-[#111] p-6">
                <span className="mb-4 block font-mono text-xs text-gray-600">
                  // why choose us
                </span>
                <ul className="space-y-3">
                  {[
                    "150+ successful projects delivered",
                    "98% client satisfaction rate",
                    "24/7 dedicated support",
                    "MSME-focused affordable solutions",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response Time Card */}
              <div className="contact-info-card rounded-2xl border border-white/5 bg-[#111] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Average response time</p>
                    <p className="text-2xl font-bold text-white">
                      &lt;2<span className="text-primary">hrs</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Business hours</p>
                    <p className="text-sm font-medium text-white">Mon - Fri, 9AM - 6PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
