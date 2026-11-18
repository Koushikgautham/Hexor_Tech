import { AlertCircle } from "lucide-react";

export const LimitationOfLiability = {
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
};
