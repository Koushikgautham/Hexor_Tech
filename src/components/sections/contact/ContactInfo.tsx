"use client";

import { ArrowUpRight } from "lucide-react";
import { contactInfo } from "./ContactFormSchema";

export function ContactInfo() {
    return (
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
    );
}
