import { FileText } from "lucide-react";

export const Introduction = {
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
};
