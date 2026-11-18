import { Database } from "lucide-react";

export const InformationWeCollect = {
  id: 2,
  icon: Database,
  title: "Information We Collect",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">We collect information that you provide directly to us and information automatically collected when you use our services:</p>
      
      <h4 className="text-white font-semibold mb-3 mt-6">Personal Information:</h4>
      <ul className="space-y-2 mb-4">
        <li className="text-gray-400">• Name, email address, phone number, and company information</li>
        <li className="text-gray-400">• Account credentials and login information</li>
        <li className="text-gray-400">• Business details, project requirements, and preferences</li>
        <li className="text-gray-400">• Payment information (processed securely through third-party providers)</li>
      </ul>

      <h4 className="text-white font-semibold mb-3 mt-6">Automatically Collected Information:</h4>
      <ul className="space-y-2">
        <li className="text-gray-400">• IP address, browser type, and operating system</li>
        <li className="text-gray-400">• Device information and unique identifiers</li>
        <li className="text-gray-400">• Usage data, page views, and navigation patterns</li>
        <li className="text-gray-400">• Cookies and similar tracking technologies</li>
      </ul>
    </>
  ),
};
