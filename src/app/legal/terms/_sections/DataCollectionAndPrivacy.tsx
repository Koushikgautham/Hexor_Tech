import { Shield } from "lucide-react";

export const DataCollectionAndPrivacy = {
  id: 6,
  icon: Shield,
  title: "Data Collection and Privacy",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        We collect and process information to provide our services and operate our Platform. Data we collect includes:
      </p>
      <ul className="space-y-3">
        <li className="text-gray-400">
          <span className="text-white font-semibold">Contact Form Data:</span> Name, email, phone number, company name, service interest, and message content.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Account Information:</span> Full name, email address, encrypted password, and assigned role.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Project Data:</span> Project descriptions, timelines, task details, progress metrics, and associated documentation.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Billing Information:</span> Invoice amounts, payment status, due dates, and transaction records.
        </li>
      </ul>
      <p className="text-gray-400 leading-relaxed mt-4">
        We use Supabase for secure backend services and authentication. We implement industry-standard security measures to protect your data. We do not sell your personal information to third parties.
      </p>
      <p className="text-gray-400 leading-relaxed mt-4">
        For detailed information about how we collect, use, and protect your data, please refer to our Privacy Policy.
      </p>
    </>
  ),
};
