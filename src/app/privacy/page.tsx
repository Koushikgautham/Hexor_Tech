"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, Database, Users, Mail, Cookie, FileText, AlertCircle } from "lucide-react";

const sections = [
  {
    id: 1,
    icon: FileText,
    title: "Introduction",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          Welcome to <span className="text-white font-semibold">Hexor's</span> Privacy Policy. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
        </p>
        <p className="text-gray-400 leading-relaxed mb-4">
          By accessing or using our Platform, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
        </p>
        <p className="text-gray-400 leading-relaxed">
          <span className="text-white font-semibold">Last Updated:</span> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </>
    ),
  },
  {
    id: 2,
    icon: Database,
    title: "Information We Collect",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">We collect information that you provide directly to us and information automatically collected when you use our services:</p>
        
        <h4 className="text-white font-semibold mb-3 mt-6">Personal Information:</h4>
        <ul className="space-y-2 mb-4">
          <li className="text-gray-400">• Name, email address, phone number, and company information</li>
          <li className="text-gray-400">• Account credentials and login information</li>
          <li className="text-gray-400">• Business details, project requirements, and preferences</li>
          <li className="text-gray-400">• Payment information (processed securely through third-party providers)</li>
        </ul>

        <h4 className="text-white font-semibold mb-3 mt-6">Automatically Collected Information:</h4>
        <ul className="space-y-2">
          <li className="text-gray-400">• IP address, browser type, and operating system</li>
          <li className="text-gray-400">• Device information and unique identifiers</li>
          <li className="text-gray-400">• Usage data, page views, and navigation patterns</li>
          <li className="text-gray-400">• Cookies and similar tracking technologies</li>
        </ul>
      </>
    ),
  },
  {
    id: 3,
    icon: Eye,
    title: "How We Use Your Information",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">We use the information we collect for various purposes:</p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Service Delivery:</span> To provide, maintain, and improve our digital transformation and automation services
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Client Communication:</span> To respond to inquiries, provide support, and send project updates
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Account Management:</span> To create and manage your account, process transactions, and deliver services
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Platform Improvement:</span> To analyze usage patterns, improve user experience, and develop new features
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Marketing:</span> To send promotional materials, newsletters, and service updates (with your consent)
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Legal Compliance:</span> To comply with applicable laws, regulations, and legal processes
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 4,
    icon: Lock,
    title: "Data Security",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
        </p>
        
        <h4 className="text-white font-semibold mb-3 mt-6">Security Measures Include:</h4>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Encryption:</span> SSL/TLS encryption for data transmission and secure storage protocols
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Access Controls:</span> Role-based access restrictions and authentication requirements
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Regular Audits:</span> Security assessments and vulnerability testing
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Data Minimization:</span> Collection and retention of only necessary information
          </li>
        </ul>

        <p className="text-gray-400 leading-relaxed mt-4">
          However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security.
        </p>
      </>
    ),
  },
  {
    id: 5,
    icon: Users,
    title: "Information Sharing and Disclosure",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
        </p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Service Providers:</span> With trusted third-party vendors who assist in delivering our services (e.g., hosting, analytics, payment processing)
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Business Transfers:</span> In connection with mergers, acquisitions, or sale of assets
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Legal Requirements:</span> When required by law, subpoena, or legal process
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Consent:</span> With your explicit consent for specific purposes
          </li>
        </ul>
        <p className="text-gray-400 leading-relaxed mt-4">
          All third-party service providers are contractually obligated to maintain the confidentiality and security of your information.
        </p>
      </>
    ),
  },
  {
    id: 6,
    icon: Cookie,
    title: "Cookies and Tracking Technologies",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          We use cookies and similar tracking technologies to enhance your experience on our Platform.
        </p>
        
        <h4 className="text-white font-semibold mb-3 mt-6">Types of Cookies We Use:</h4>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Essential Cookies:</span> Required for the Platform to function properly
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Performance Cookies:</span> Help us analyze how visitors use our Platform
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Functional Cookies:</span> Remember your preferences and settings
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Marketing Cookies:</span> Track your activity to deliver relevant advertisements
          </li>
        </ul>

        <p className="text-gray-400 leading-relaxed mt-4">
          You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our Platform.
        </p>
      </>
    ),
  },
  {
    id: 7,
    icon: Shield,
    title: "Your Privacy Rights",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          Depending on your location, you may have certain rights regarding your personal information:
        </p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Access:</span> Request access to the personal information we hold about you
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Correction:</span> Request correction of inaccurate or incomplete information
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Deletion:</span> Request deletion of your personal information (subject to legal obligations)
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Portability:</span> Request a copy of your data in a structured, machine-readable format
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Objection:</span> Object to processing of your personal information for certain purposes
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Withdraw Consent:</span> Withdraw consent for data processing where consent was the legal basis
          </li>
        </ul>
        <p className="text-gray-400 leading-relaxed mt-4">
          To exercise these rights, please contact us using the information provided at the end of this Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: 8,
    icon: Database,
    title: "Data Retention",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
        </p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Active Accounts:</span> Information is retained while your account is active or as needed to provide services
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Inactive Accounts:</span> May be retained for up to 3 years after last activity
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Legal Requirements:</span> Some information may be retained longer to comply with legal obligations
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Anonymized Data:</span> We may retain anonymized data indefinitely for analytical purposes
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 9,
    icon: Users,
    title: "Third-Party Links and Services",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          Our Platform may contain links to third-party websites, services, or applications. We are not responsible for the privacy practices of these third parties.
        </p>
        <p className="text-gray-400 leading-relaxed mb-4">
          We encourage you to review the privacy policies of any third-party services before providing them with your personal information.
        </p>
        <p className="text-gray-400 leading-relaxed">
          This Privacy Policy applies only to information collected by Hexor through our Platform and services.
        </p>
      </>
    ),
  },
  {
    id: 10,
    icon: FileText,
    title: "Children's Privacy",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          Our services are designed for businesses and are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
        </p>
        <p className="text-gray-400 leading-relaxed">
          If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete that information promptly.
        </p>
      </>
    ),
  },
  {
    id: 11,
    icon: FileText,
    title: "Changes to This Privacy Policy",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.
        </p>
        <p className="text-gray-400 leading-relaxed mb-4">
          We will notify you of any material changes by posting the updated Privacy Policy on this page and updating the "Last Updated" date. For significant changes, we may provide additional notice through email or prominent notices on our Platform.
        </p>
        <p className="text-gray-400 leading-relaxed">
          Your continued use of our services after changes to this Privacy Policy constitutes acceptance of the updated terms.
        </p>
      </>
    ),
  },
  {
    id: 12,
    icon: Mail,
    title: "Contact Us",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
        </p>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-white mb-2">
            <span className="text-white font-semibold">Email:</span> privacy@Hexor.com
          </p>
          <p className="text-white mb-2">
            <span className="text-white font-semibold">Address:</span> Chennai, Tamil Nadu, India
          </p>
          <p className="text-white">
            <span className="text-white font-semibold">Support:</span> Use the contact form on our website or reach out through your client dashboard
          </p>
        </div>
        <p className="text-gray-400 leading-relaxed mt-6">
          We aim to respond to all privacy-related inquiries within 5-7 business days. For urgent matters, please indicate "URGENT" in your subject line.
        </p>
      </>
    ),
  },
];

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
