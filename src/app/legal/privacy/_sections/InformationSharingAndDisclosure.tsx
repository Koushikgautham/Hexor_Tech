import { Users } from "lucide-react";

export const InformationSharingAndDisclosure = {
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
};
