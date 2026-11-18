import { AlertCircle } from "lucide-react";

export const WarrantiesAndDisclaimers = {
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
};
