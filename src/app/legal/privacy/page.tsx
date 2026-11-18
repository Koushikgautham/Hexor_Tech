"use client";

import { motion } from "framer-motion";
import { Shield, AlertCircle } from "lucide-react";
import { sections } from "./_sections/Sections";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="font-mono text-sm text-primary">// legal</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mt-2 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-lg">
              How we collect, use, and protect your personal information
            </p>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 p-6 rounded-lg border border-primary/30 bg-primary/5"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">Your Privacy Matters</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  At Hexor, we take your privacy seriously. This Privacy Policy describes how we collect, use, and protect your personal information. By using our services, you consent to the data practices described in this policy.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                className="group rounded-xl border border-white/10 bg-white/5 p-6 sm:p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="font-mono text-xs text-gray-500">{String(section.id).padStart(2, '0')}</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">{section.title}</h2>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      {section.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Acknowledgment Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 p-8 rounded-xl border border-white/10 bg-white/5 text-center"
          >
            <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Commitment to Privacy</h3>
            <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
              We are committed to maintaining the trust and confidence of our clients. If you have any questions or concerns about our privacy practices, please don't hesitate to contact us.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
