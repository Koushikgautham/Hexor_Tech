import { Eye } from "lucide-react";

export const HowWeUseCookies = {
  id: 6,
  icon: Eye,
  title: "How We Use Cookies",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        We use cookies for the following specific purposes:
      </p>
      <ul className="space-y-3">
        <li className="text-gray-400">
          <span className="text-white font-semibold">Authentication:</span> To keep you signed in to your account and remember your login status
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Security:</span> To detect and prevent security risks, fraud, and abuse
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Preferences:</span> To remember your settings, language, and customization choices
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Analytics:</span> To understand how you use our website and improve our services
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Performance:</span> To monitor and optimize website speed and functionality
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Marketing:</span> To deliver relevant content and measure campaign effectiveness
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Social Media:</span> To enable sharing of content on social platforms
        </li>
      </ul>
    </>
  ),
};
