"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContactForm } from "./UseContactForm";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const {
    sectionRef,
    isSubmitting,
    register,
    handleSubmit,
    setValue,
    errors,
    selectedService,
    onSubmit,
  } = useContactForm();

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
          <ContactForm isSubmitting={isSubmitting} register={register} handleSubmit={handleSubmit} setValue={setValue} errors={errors} selectedService={selectedService} onSubmit={onSubmit} />

          {/* Contact Info */}
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}
