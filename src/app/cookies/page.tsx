"use client";

import { motion } from "framer-motion";
import { Cookie, Settings, Eye, Shield, FileText, Clock, Globe, AlertCircle } from "lucide-react";

const sections = [
  {
    id: 1,
    icon: FileText,
    title: "Introduction",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          This Cookie Policy explains how <span className="text-white font-semibold">Hexor</span> ("we," "us," or "our") uses cookies and similar tracking technologies on our website and Platform. This policy provides you with clear and comprehensive information about the cookies we use and the purposes for using them.
        </p>
        <p className="text-gray-400 leading-relaxed mb-4">
          By continuing to browse or use our website, you agree to our use of cookies as described in this Cookie Policy. If you do not agree to our use of cookies, you should set your browser settings accordingly or refrain from using our website.
        </p>
        <p className="text-gray-400 leading-relaxed">
          <span className="text-white font-semibold">Last Updated:</span> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </>
    ),
  },
  {
    id: 2,
    icon: Cookie,
    title: "What Are Cookies?",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
        </p>
        
        <h4 className="text-white font-semibold mb-3 mt-6">Key Characteristics of Cookies:</h4>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Storage:</span> Cookies are stored in your browser's cookie folder
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Information:</span> They contain information about your browsing session and preferences
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Purpose:</span> Help websites remember your actions and preferences over time
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Expiration:</span> Can be temporary (session) or persistent (stored for longer periods)
          </li>
        </ul>

        <p className="text-gray-400 leading-relaxed mt-4">
          Cookies do not typically contain personal information that directly identifies you, but they can store information about your device and browsing patterns.
        </p>
      </>
    ),
  },
  {
    id: 3,
    icon: Settings,
    title: "Types of Cookies We Use",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          We use different types of cookies on our website, each serving specific purposes:
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="text-white font-semibold mb-3">1. Essential/Strictly Necessary Cookies</h4>
            <p className="text-gray-400 leading-relaxed mb-2">
              These cookies are required for the basic functionality of our website. Without these cookies, our website cannot function properly.
            </p>
            <ul className="space-y-2 ml-4">
              <li className="text-gray-400">• Authentication and security cookies</li>
              <li className="text-gray-400">• Load balancing cookies</li>
              <li className="text-gray-400">• Session management</li>
              <li className="text-gray-400">• User interface customization</li>
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-white">Legal Basis:</span> These cookies are necessary for the operation of our website and cannot be disabled.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">2. Performance/Analytics Cookies</h4>
            <p className="text-gray-400 leading-relaxed mb-2">
              These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
            </p>
            <ul className="space-y-2 ml-4">
              <li className="text-gray-400">• Page views and navigation patterns</li>
              <li className="text-gray-400">• Time spent on pages</li>
              <li className="text-gray-400">• Error messages encountered</li>
              <li className="text-gray-400">• Website performance metrics</li>
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-white">Tools Used:</span> Google Analytics, internal analytics systems
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">3. Functional Cookies</h4>
            <p className="text-gray-400 leading-relaxed mb-2">
              These cookies enable enhanced functionality and personalization, such as remembering your preferences.
            </p>
            <ul className="space-y-2 ml-4">
              <li className="text-gray-400">• Language preferences</li>
              <li className="text-gray-400">• Theme selection (dark/light mode)</li>
              <li className="text-gray-400">• Region/location settings</li>
              <li className="text-gray-400">• Recently viewed content</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">4. Targeting/Advertising Cookies</h4>
            <p className="text-gray-400 leading-relaxed mb-2">
              These cookies are used to deliver advertisements that are relevant to you and your interests.
            </p>
            <ul className="space-y-2 ml-4">
              <li className="text-gray-400">• Track browsing activity across websites</li>
              <li className="text-gray-400">• Build profiles of user interests</li>
              <li className="text-gray-400">• Deliver targeted advertisements</li>
              <li className="text-gray-400">• Measure advertising campaign effectiveness</li>
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-white">Note:</span> You can opt-out of these cookies without affecting core website functionality.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 4,
    icon: Clock,
    title: "Session vs. Persistent Cookies",
    content: (
      <>
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-3">Session Cookies (Temporary)</h4>
            <p className="text-gray-400 leading-relaxed mb-2">
              These cookies are temporary and are deleted when you close your browser.
            </p>
            <ul className="space-y-2 ml-4">
              <li className="text-gray-400">• Enable navigation through our website</li>
              <li className="text-gray-400">• Maintain your login session</li>
              <li className="text-gray-400">• Store temporary data during your visit</li>
              <li className="text-gray-400">• Essential for secure transactions</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Persistent Cookies (Stored)</h4>
            <p className="text-gray-400 leading-relaxed mb-2">
              These cookies remain on your device for a set period or until you manually delete them.
            </p>
            <ul className="space-y-2 ml-4">
              <li className="text-gray-400">• Remember your preferences across visits</li>
              <li className="text-gray-400">• Enable "Remember Me" functionality</li>
              <li className="text-gray-400">• Provide personalized content</li>
              <li className="text-gray-400">• Track user behavior over time</li>
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-white">Duration:</span> Our persistent cookies typically last between 30 days to 2 years, depending on their purpose.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 5,
    icon: Globe,
    title: "First-Party vs. Third-Party Cookies",
    content: (
      <>
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-3">First-Party Cookies</h4>
            <p className="text-gray-400 leading-relaxed mb-2">
              These cookies are set directly by Hexor and can only be read by our website.
            </p>
            <ul className="space-y-2 ml-4">
              <li className="text-gray-400">• Created and managed by us</li>
              <li className="text-gray-400">• Used for core website functionality</li>
              <li className="text-gray-400">• Store your preferences and settings</li>
              <li className="text-gray-400">• Enhance your user experience</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Third-Party Cookies</h4>
            <p className="text-gray-400 leading-relaxed mb-2">
              These cookies are set by domains other than Hexor, typically by our service providers and partners.
            </p>
            <ul className="space-y-2 ml-4">
              <li className="text-gray-400">• Analytics tools (e.g., Google Analytics)</li>
              <li className="text-gray-400">• Social media plugins</li>
              <li className="text-gray-400">• Advertising networks</li>
              <li className="text-gray-400">• Customer support chat widgets</li>
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-white">Note:</span> Third-party cookies are governed by the privacy policies of the respective third parties.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 6,
    icon: Eye,
    title: "How We Use Cookies",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          We use cookies for the following specific purposes:
        </p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Authentication:</span> To keep you signed in to your account and remember your login status
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Security:</span> To detect and prevent security risks, fraud, and abuse
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Preferences:</span> To remember your settings, language, and customization choices
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Analytics:</span> To understand how you use our website and improve our services
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Performance:</span> To monitor and optimize website speed and functionality
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Marketing:</span> To deliver relevant content and measure campaign effectiveness
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Social Media:</span> To enable sharing of content on social platforms
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 7,
    icon: Settings,
    title: "Managing Your Cookie Preferences",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          You have several options to control or limit how cookies are used on your device:
        </p>

        <h4 className="text-white font-semibold mb-3 mt-6">Browser Settings</h4>
        <p className="text-gray-400 leading-relaxed mb-2">
          Most web browsers allow you to control cookies through their settings preferences. You can:
        </p>
        <ul className="space-y-2 ml-4 mb-4">
          <li className="text-gray-400">• Delete all cookies from your browser</li>
          <li className="text-gray-400">• Block all cookies by default</li>
          <li className="text-gray-400">• Block third-party cookies specifically</li>
          <li className="text-gray-400">• Receive notifications when cookies are being sent</li>
        </ul>

        <h4 className="text-white font-semibold mb-3 mt-6">Browser-Specific Instructions</h4>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 space-y-2">
          <p className="text-gray-400">• <span className="text-white">Chrome:</span> Settings → Privacy and security → Cookies and other site data</p>
          <p className="text-gray-400">• <span className="text-white">Firefox:</span> Options → Privacy & Security → Cookies and Site Data</p>
          <p className="text-gray-400">• <span className="text-white">Safari:</span> Preferences → Privacy → Manage Website Data</p>
          <p className="text-gray-400">• <span className="text-white">Edge:</span> Settings → Privacy, search, and services → Cookies</p>
        </div>

        <h4 className="text-white font-semibold mb-3 mt-6">Cookie Consent Tool</h4>
        <p className="text-gray-400 leading-relaxed mb-2">
          When you first visit our website, we provide a cookie consent banner that allows you to:
        </p>
        <ul className="space-y-2 ml-4">
          <li className="text-gray-400">• Accept all cookies</li>
          <li className="text-gray-400">• Reject non-essential cookies</li>
          <li className="text-gray-400">• Customize your cookie preferences by category</li>
          <li className="text-gray-400">• Change your preferences at any time</li>
        </ul>

        <div className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-sm text-gray-400 leading-relaxed">
            <span className="text-yellow-500 font-semibold">Important:</span> Disabling certain cookies may affect the functionality of our website and limit your ability to use some features.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 8,
    icon: Shield,
    title: "Third-Party Cookie Providers",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          We work with the following third-party service providers who may set cookies on our website:
        </p>

        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-white font-semibold mb-2">Google Analytics</h4>
            <p className="text-gray-400 text-sm mb-2">
              Purpose: Website analytics and performance monitoring
            </p>
            <p className="text-gray-400 text-sm">
              Opt-out: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out Browser Add-on</a>
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-white font-semibold mb-2">Social Media Platforms</h4>
            <p className="text-gray-400 text-sm mb-2">
              Purpose: Enable social sharing and track engagement
            </p>
            <p className="text-gray-400 text-sm">
              Providers: LinkedIn, Twitter, Facebook (where applicable)
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-white font-semibold mb-2">Customer Support Tools</h4>
            <p className="text-gray-400 text-sm mb-2">
              Purpose: Live chat functionality and support ticket management
            </p>
            <p className="text-gray-400 text-sm">
              Used for: Providing real-time customer support
            </p>
          </div>
        </div>

        <p className="text-gray-400 leading-relaxed mt-4">
          Each of these third parties has their own privacy and cookie policies. We encourage you to review their policies to understand how they use cookies.
        </p>
      </>
    ),
  },
  {
    id: 9,
    icon: FileText,
    title: "Do Not Track Signals",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked.
        </p>
        <p className="text-gray-400 leading-relaxed mb-4">
          Currently, there is no industry standard for how companies should respond to DNT signals. We do not currently respond to DNT browser signals, but we provide you with the ability to control cookies as described in this policy.
        </p>
        <p className="text-gray-400 leading-relaxed">
          We will update this Cookie Policy if our practices change regarding DNT signals.
        </p>
      </>
    ),
  },
  {
    id: 10,
    icon: Clock,
    title: "Cookie Lifespan and Retention",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          Different cookies have different lifespans on your device:
        </p>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10 space-y-3">
          <div>
            <p className="text-white font-semibold">Session Cookies:</p>
            <p className="text-gray-400 text-sm">Deleted when you close your browser (immediate expiration)</p>
          </div>
          <div>
            <p className="text-white font-semibold">Authentication Cookies:</p>
            <p className="text-gray-400 text-sm">30 days (or until logout)</p>
          </div>
          <div>
            <p className="text-white font-semibold">Preference Cookies:</p>
            <p className="text-gray-400 text-sm">1 year</p>
          </div>
          <div>
            <p className="text-white font-semibold">Analytics Cookies:</p>
            <p className="text-gray-400 text-sm">2 years</p>
          </div>
          <div>
            <p className="text-white font-semibold">Marketing Cookies:</p>
            <p className="text-gray-400 text-sm">90 days to 1 year</p>
          </div>
        </div>

        <p className="text-gray-400 leading-relaxed mt-4">
          You can delete cookies at any time using your browser settings, regardless of their intended lifespan.
        </p>
      </>
    ),
  },
  {
    id: 11,
    icon: Shield,
    title: "Updates to This Cookie Policy",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          We may update this Cookie Policy from time to time to reflect changes in our use of cookies, legal requirements, or best practices.
        </p>
        <p className="text-gray-400 leading-relaxed mb-4">
          When we make significant changes, we will notify you by:
        </p>
        <ul className="space-y-2 ml-4 mb-4">
          <li className="text-gray-400">• Posting the updated policy on this page</li>
          <li className="text-gray-400">• Updating the "Last Updated" date</li>
          <li className="text-gray-400">• Displaying a notification on our website</li>
          <li className="text-gray-400">• Sending an email to registered users (for material changes)</li>
        </ul>
        <p className="text-gray-400 leading-relaxed">
          We recommend that you review this Cookie Policy periodically to stay informed about our use of cookies.
        </p>
      </>
    ),
  },
  {
    id: 12,
    icon: FileText,
    title: "Contact Us",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          If you have any questions or concerns about our use of cookies or this Cookie Policy, please contact us:
        </p>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-white mb-2">
            <span className="text-white font-semibold">Email:</span> privacy@Hexor.com
          </p>
          <p className="text-white mb-2">
            <span className="text-white font-semibold">Subject Line:</span> Cookie Policy Inquiry
          </p>
          <p className="text-white mb-2">
            <span className="text-white font-semibold">Address:</span> Chennai, Tamil Nadu, India
          </p>
          <p className="text-white">
            <span className="text-white font-semibold">Support:</span> Use the contact form on our website
          </p>
        </div>
        <p className="text-gray-400 leading-relaxed mt-6">
          We will respond to all cookie-related inquiries within 5-7 business days.
        </p>
      </>
    ),
  },
];

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
