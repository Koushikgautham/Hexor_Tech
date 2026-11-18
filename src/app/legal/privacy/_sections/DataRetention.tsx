import { Database } from "lucide-react";

export const DataRetention = {
  id: 8,
  icon: Database,
  title: "Data Retention",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
      </p>
      <ul className="space-y-3">
        <li className="text-gray-400">
          <span className="text-white font-semibold">Active Accounts:</span> Information is retained while your account is active or as needed to provide services
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Inactive Accounts:</span> May be retained for up to 3 years after last activity
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Legal Requirements:</span> Some information may be retained longer to comply with legal obligations
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Anonymized Data:</span> We may retain anonymized data indefinitely for analytical purposes
        </li>
      </ul>
    </>
  ),
};
