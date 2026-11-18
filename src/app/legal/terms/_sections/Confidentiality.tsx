import { Shield } from "lucide-react";

export const Confidentiality = {
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
};
