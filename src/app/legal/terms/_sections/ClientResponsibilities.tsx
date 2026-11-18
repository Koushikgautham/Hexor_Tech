import { Users } from "lucide-react";

export const ClientResponsibilities = {
  id: 5,
  icon: Users,
  title: "Client Responsibilities",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        Successful project completion requires client cooperation. As a client, you agree to:
      </p>
      <ul className="space-y-3">
        <li className="text-gray-400">
          Provide accurate, complete, and timely information necessary for project execution.
        </li>
        <li className="text-gray-400">
          Respond to requests for feedback, approvals, and decisions within agreed timeframes.
        </li>
        <li className="text-gray-400">
          Grant necessary access to systems, platforms, and resources required for service delivery.
        </li>
        <li className="text-gray-400">
          Provide content, materials, credentials, and assets as needed for project completion.
        </li>
        <li className="text-gray-400">
          Comply with all applicable laws, regulations, and third-party service terms in your use of our deliverables.
        </li>
      </ul>
      <p className="text-gray-400 leading-relaxed mt-4">
        Delays or failures caused by client non-cooperation may result in project timeline extensions and additional costs.
      </p>
    </>
  ),
};
