"use client";

import { motion } from "framer-motion";
import { Cookie, AlertCircle } from "lucide-react";
import { sections } from "./_sections/Sections";

export default function CookiePolicyPage() {
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
              Cookie Policy
            </h1>
            <p className="text-gray-400 text-lg">
              Understanding how we use cookies and tracking technologies
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
                <h3 className="font-semibold text-white mb-2">About Cookies</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  This Cookie Policy explains what cookies are, how we use them, and how you can control them. By using our website, you consent to our use of cookies in accordance with this policy.
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
            <Cookie className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Your Control Matters</h3>
            <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
              We believe in transparency and giving you control over your data. You can manage your cookie preferences at any time through your browser settings or our cookie consent tool.
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
