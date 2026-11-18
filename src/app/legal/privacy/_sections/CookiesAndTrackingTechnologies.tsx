import { Cookie } from "lucide-react";

export const CookiesAndTrackingTechnologies = {
  id: 6,
  icon: Cookie,
  title: "Cookies and Tracking Technologies",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        We use cookies and similar tracking technologies to enhance your experience on our Platform.
      </p>
      
      <h4 className="text-white font-semibold mb-3 mt-6">Types of Cookies We Use:</h4>
      <ul className="space-y-3">
        <li className="text-gray-400">
          <span className="text-white font-semibold">Essential Cookies:</span> Required for the Platform to function properly
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Performance Cookies:</span> Help us analyze how visitors use our Platform
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Functional Cookies:</span> Remember your preferences and settings
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Marketing Cookies:</span> Track your activity to deliver relevant advertisements
        </li>
      </ul>

      <p className="text-gray-400 leading-relaxed mt-4">
        You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our Platform.
      </p>
    </>
  ),
};
