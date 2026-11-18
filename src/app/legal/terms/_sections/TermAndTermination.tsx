import { FileText } from "lucide-react";

export const TermAndTermination = {
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
};
