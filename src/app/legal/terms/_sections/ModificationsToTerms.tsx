import { FileText } from "lucide-react";

export const ModificationsToTerms = {
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
};
