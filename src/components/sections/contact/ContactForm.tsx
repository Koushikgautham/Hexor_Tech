"use client";

import { Send } from "lucide-react";
import { cn } from "@/lib/ClassNameMerge";
import { services } from "./ContactFormSchema";
import type { ContactFormState } from "./UseContactForm";

export function ContactForm({ isSubmitting, register, handleSubmit, setValue, errors, selectedService, onSubmit }: Pick<ContactFormState, "isSubmitting" | "register" | "handleSubmit" | "setValue" | "errors" | "selectedService" | "onSubmit">) {
    return (
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
    );
}
