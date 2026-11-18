import { FileText } from "lucide-react";

export const IntroductionAndAcceptance = {
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
};
