import { Shield } from "lucide-react";

export const YourPrivacyRights = {
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
};
