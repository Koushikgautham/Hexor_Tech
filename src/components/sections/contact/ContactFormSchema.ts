"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const contactInfo = [
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

export const services = [
  { value: "digital-transformation", label: "Digital Transformation" },
  { value: "automation", label: "Automation Solutions" },
  { value: "ecommerce", label: "Ecommerce Management" },
  { value: "social-media", label: "Social Media Management" },
  { value: "web-development", label: "Web Development" },
  { value: "other", label: "Other" },
];
