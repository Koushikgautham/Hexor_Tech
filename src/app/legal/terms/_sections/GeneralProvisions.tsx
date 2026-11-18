import { FileText } from "lucide-react";

export const GeneralProvisions = {
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
};
