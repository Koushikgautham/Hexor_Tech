"use client";


import { motion } from "framer-motion";
import { Scale, FileText, Users, Shield, CreditCard, Clock, AlertCircle } from "lucide-react";

const sections = [
  {
    id: 1,
    icon: FileText,
    title: "Introduction & Acceptance",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          Welcome to <span className="text-white font-semibold">Hexor</span> ("we," "us," or "our"). These Terms and Conditions ("Terms") govern your access to and use of our website, services, and client dashboard (collectively, the "Platform").
        </p>
        <p className="text-gray-400 leading-relaxed mb-4">
          By accessing or using our Platform, engaging our services, or creating an account, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Platform or services.
        </p>
        <p className="text-gray-400 leading-relaxed">
          <span className="text-white font-semibold">Last Updated:</span> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </>
    ),
  },
  {
    id: 2,
    icon: FileText,
    title: "Definitions",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">For the purposes of these Terms:</p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">"Services"</span> refers to our digital transformation, automation solutions, ecommerce management, and social media management offerings for MSMEs (Micro, Small, and Medium Enterprises).
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">"Client"</span> means any business or individual engaging Hexor for professional services.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">"Deliverables"</span> refers to the work products, solutions, or outcomes provided by Hexor as part of a project or engagement.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">"Platform"</span> includes our website, client dashboard, and any related digital interfaces.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 3,
    icon: FileText,
    title: "Services Description",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          Hexor provides B2B digital transformation and business automation services designed specifically for MSMEs. Our services include:
        </p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Digital Transformation:</span> Modernizing business processes, cloud migration, legacy system updates, and digital strategy consulting.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Automation Solutions:</span> Workflow automation, RPA implementation, API integrations, and AI/ML-powered business solutions.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Ecommerce Management:</span> End-to-end platform setup, inventory management, multi-channel selling, and online store optimization.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Social Media Management:</span> Content strategy, community management, paid campaigns, and influencer partnership coordination.
          </li>
        </ul>
        <p className="text-gray-400 leading-relaxed mt-4">
          All services are provided on a project-based engagement model and may be customized to meet specific client needs.
        </p>
      </>
    ),
  },
  {
    id: 4,
    icon: Users,
    title: "User Accounts and Access",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          To access certain features of our Platform, including the client dashboard, you must create an account with accurate and complete information.
        </p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Account Security:</span> You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Role-Based Access:</span> Accounts are assigned roles (Admin or Client) with specific access permissions. You may only access features authorized for your role.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Account Suspension:</span> We reserve the right to suspend or deactivate accounts that violate these Terms or engage in unauthorized activity.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Password Requirements:</span> Passwords must meet our security requirements (minimum 8 characters, including uppercase, lowercase, and numbers).
          </li>
        </ul>
        <p className="text-gray-400 leading-relaxed mt-4">
          You must notify us immediately of any unauthorized use of your account or any security breach.
        </p>
      </>
    ),
  },
  {
    id: 5,
    icon: Users,
    title: "Client Responsibilities",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          Successful project completion requires client cooperation. As a client, you agree to:
        </p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            Provide accurate, complete, and timely information necessary for project execution.
          </li>
          <li className="text-gray-400">
            Respond to requests for feedback, approvals, and decisions within agreed timeframes.
          </li>
          <li className="text-gray-400">
            Grant necessary access to systems, platforms, and resources required for service delivery.
          </li>
          <li className="text-gray-400">
            Provide content, materials, credentials, and assets as needed for project completion.
          </li>
          <li className="text-gray-400">
            Comply with all applicable laws, regulations, and third-party service terms in your use of our deliverables.
          </li>
        </ul>
        <p className="text-gray-400 leading-relaxed mt-4">
          Delays or failures caused by client non-cooperation may result in project timeline extensions and additional costs.
        </p>
      </>
    ),
  },
  {
    id: 6,
    icon: Shield,
    title: "Data Collection and Privacy",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          We collect and process information to provide our services and operate our Platform. Data we collect includes:
        </p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Contact Form Data:</span> Name, email, phone number, company name, service interest, and message content.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Account Information:</span> Full name, email address, encrypted password, and assigned role.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Project Data:</span> Project descriptions, timelines, task details, progress metrics, and associated documentation.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Billing Information:</span> Invoice amounts, payment status, due dates, and transaction records.
          </li>
        </ul>
        <p className="text-gray-400 leading-relaxed mt-4">
          We use Supabase for secure backend services and authentication. We implement industry-standard security measures to protect your data. We do not sell your personal information to third parties.
        </p>
        <p className="text-gray-400 leading-relaxed mt-4">
          For detailed information about how we collect, use, and protect your data, please refer to our Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: 7,
    icon: Shield,
    title: "Intellectual Property Rights",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          Intellectual property ownership is governed by the following principles:
        </p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Client Ownership:</span> Upon full payment, clients receive ownership of final deliverables specifically created for their project.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Hexor Proprietary Assets:</span> Our proprietary methodologies, tools, frameworks, templates, and processes remain our exclusive property.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Pre-Existing IP:</span> Any intellectual property owned by either party before the engagement remains with the original owner.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Third-Party Software:</span> Use of third-party software, platforms, or services is subject to their respective licenses and terms.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Portfolio Usage:</span> We reserve the right to showcase completed projects in our portfolio unless otherwise agreed in writing.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 8,
    icon: CreditCard,
    title: "Billing, Invoicing, and Payment Terms",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          Our billing and payment terms are as follows:
        </p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Invoicing System:</span> Clients can view and track invoices through the client dashboard, including amounts, due dates, and payment status.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Payment Terms:</span> Payment is due according to the terms specified in each invoice, typically within 15-30 days of invoice date.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Late Payments:</span> Overdue invoices may incur late fees and may result in suspension of services until payment is received.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Payment Processing:</span> We do not process payments directly through the Platform. Payment instructions will be provided on each invoice.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Disputed Charges:</span> Any billing disputes must be raised within 15 days of invoice date.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Refund Policy:</span> Refunds are evaluated on a case-by-case basis and depend on project stage and work completed.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 9,
    icon: Clock,
    title: "Project Management",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          We provide a transparent project management system through our client dashboard:
        </p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Project Tracking:</span> Clients can view active and completed projects, including progress percentages and task completion metrics.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Milestones:</span> Projects are divided into milestones with specific deliverables and timelines.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Timeline Expectations:</span> Timelines are estimates and may be adjusted based on project complexity and client responsiveness.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Change Requests:</span> Requests for changes to project scope may result in timeline extensions and additional costs.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Communication:</span> Regular updates will be provided through the dashboard and agreed communication channels.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 10,
    icon: Clock,
    title: "Service Level and Support",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          We are committed to providing quality support to our clients:
        </p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Business Hours:</span> Our standard business hours are Monday to Friday, 9:00 AM to 6:00 PM IST, excluding public holidays in India.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Response Time:</span> We aim to respond to client inquiries within 1-2 business days for standard support requests.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Support Channels:</span> Support is available through email, the contact form on our website, and the client dashboard.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Emergency Procedures:</span> For urgent issues during active projects, expedited support may be available as agreed in project terms.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Platform Maintenance:</span> We may perform scheduled maintenance with advance notice when possible.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 11,
    icon: AlertCircle,
    title: "Limitation of Liability",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          Our services are provided with professional care, but with certain limitations:
        </p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Professional Services:</span> Our services are consultative and advisory in nature. We cannot guarantee specific business outcomes or results.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Liability Cap:</span> Our total liability for any claims arising from a project shall not exceed the total fees paid for that specific project.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Indirect Damages:</span> We are not liable for indirect, incidental, consequential, or punitive damages, including lost profits or business interruption.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Third-Party Services:</span> We are not responsible for failures, downtime, or issues with third-party platforms, services, or software.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Force Majeure:</span> We are not liable for delays or failures caused by circumstances beyond our reasonable control.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 12,
    icon: AlertCircle,
    title: "Warranties and Disclaimers",
    content: (
      <>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Professional Standards:</span> We warrant that our services will be performed with reasonable skill and care in accordance with industry standards.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Platform Availability:</span> While we strive for continuous availability, we do not guarantee uninterrupted access to our Platform.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">No Business Outcome Warranty:</span> We make no warranties regarding specific business results, ROI, or performance metrics from our services.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Third-Party Disclaimers:</span> We disclaim all warranties related to third-party platforms, tools, or services integrated into our solutions.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Client Content:</span> Clients warrant that all materials, content, and information provided to us do not infringe on third-party rights.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 13,
    icon: Shield,
    title: "Confidentiality",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          We respect the confidentiality of client information and expect the same in return:
        </p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Mutual Obligation:</span> Both parties agree to keep confidential information disclosed during the engagement confidential and secure.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Confidential Information:</span> Includes business strategies, proprietary data, project details, trade secrets, and non-public information.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Exclusions:</span> Information that is publicly available, independently developed, or required to be disclosed by law is not considered confidential.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Data Protection:</span> We implement appropriate security measures to protect confidential information from unauthorized access or disclosure.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Post-Engagement:</span> Confidentiality obligations survive the termination of our engagement.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 14,
    icon: FileText,
    title: "Term and Termination",
    content: (
      <>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Agreement Duration:</span> These Terms remain in effect as long as you access or use our Platform or engage our services.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Project Termination:</span> Either party may terminate an active project with written notice, subject to project-specific terms.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Notice Requirements:</span> Termination typically requires 15-30 days written notice unless otherwise specified in project agreements.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Effect of Termination:</span> Upon termination, clients remain responsible for payment of services rendered up to the termination date.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Account Deactivation:</span> We may suspend or deactivate accounts for violation of these Terms, non-payment, or fraudulent activity.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Post-Termination:</span> Confidentiality obligations, payment obligations, and IP rights survive termination.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 15,
    icon: FileText,
    title: "Modifications to Terms",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          We may update these Terms from time to time to reflect changes in our services, legal requirements, or business practices:
        </p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Right to Update:</span> We reserve the right to modify these Terms at any time.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Notification:</span> We will notify users of significant changes via email or prominent notice on our Platform.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Effective Date:</span> Changes become effective upon posting to our website unless otherwise specified.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Continued Use:</span> Your continued use of our Platform after changes constitutes acceptance of the modified Terms.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Review Responsibility:</span> You are responsible for reviewing these Terms periodically.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 16,
    icon: Scale,
    title: "Dispute Resolution",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          In the event of disputes, we encourage resolution through the following process:
        </p>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Governing Law:</span> These Terms are governed by the laws of India, without regard to conflict of law principles.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Jurisdiction:</span> Any legal disputes shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu, India.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Good Faith Negotiation:</span> Parties agree to first attempt to resolve disputes through good faith negotiation.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Mediation:</span> If negotiation fails, parties may agree to mediation before pursuing legal action.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Arbitration:</span> For project-specific disputes, arbitration may be available as agreed in project contracts.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 17,
    icon: FileText,
    title: "General Provisions",
    content: (
      <>
        <ul className="space-y-3">
          <li className="text-gray-400">
            <span className="text-white font-semibold">Entire Agreement:</span> These Terms, along with any project-specific agreements, constitute the entire agreement between you and Hexor.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Severability:</span> If any provision is found unenforceable, the remaining provisions shall remain in full effect.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Waiver:</span> Failure to enforce any right or provision does not constitute a waiver of that right or provision.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Assignment:</span> You may not assign or transfer these Terms without our written consent. We may assign our rights and obligations.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Force Majeure:</span> Neither party is liable for delays or failures caused by events beyond reasonable control.
          </li>
          <li className="text-gray-400">
            <span className="text-white font-semibold">Independent Contractor:</span> The relationship between Hexor and clients is that of independent contractors, not employer-employee.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 18,
    icon: Users,
    title: "Contact Information",
    content: (
      <>
        <p className="text-gray-400 leading-relaxed mb-4">
          If you have any questions, concerns, or feedback about these Terms or our services, please contact us:
        </p>
        <div className="space-y-3 text-gray-400">
          <p>
            <span className="text-white font-semibold">Company Name:</span> Hexor
          </p>
          <p>
            <span className="text-white font-semibold">Location:</span> Chennai, Tamil Nadu, India
          </p>
          <p>
            <span className="text-white font-semibold">Website:</span>{' '}
            <a href="/" className="text-primary hover:underline">
              Hexor.com
            </a>
          </p>
          <p>
            <span className="text-white font-semibold">Support:</span> Use the contact form on our website or reach out through your client dashboard
          </p>
        </div>
        <p className="text-gray-400 leading-relaxed mt-6">
          We aim to respond to all inquiries within 1-2 business days during our standard business hours (Monday to Friday, 9:00 AM to 6:00 PM IST).
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
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
              Terms & Conditions
            </h1>
            <p className="text-gray-400 text-lg">
              Please read these terms carefully before using our services
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
                <h3 className="font-semibold text-white mb-2">Important Notice</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  These Terms and Conditions govern your use of Hexor's services and Platform. By accessing our website, creating an account, or engaging our services, you agree to be bound by these Terms. If you have any questions, please contact us before proceeding.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Terms Sections */}
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
            <Scale className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Acknowledgment</h3>
            <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
              By using Hexor's services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. These Terms constitute a legally binding agreement between you and Hexor.
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
