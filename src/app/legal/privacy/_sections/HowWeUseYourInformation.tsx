import { Eye } from "lucide-react";

export const HowWeUseYourInformation = {
  id: 3,
  icon: Eye,
  title: "How We Use Your Information",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">We use the information we collect for various purposes:</p>
      <ul className="space-y-3">
        <li className="text-gray-400">
          <span className="text-white font-semibold">Service Delivery:</span> To provide, maintain, and improve our digital transformation and automation services
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Client Communication:</span> To respond to inquiries, provide support, and send project updates
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Account Management:</span> To create and manage your account, process transactions, and deliver services
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Platform Improvement:</span> To analyze usage patterns, improve user experience, and develop new features
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Marketing:</span> To send promotional materials, newsletters, and service updates (with your consent)
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Legal Compliance:</span> To comply with applicable laws, regulations, and legal processes
        </li>
      </ul>
    </>
  ),
};
