import { Settings } from "lucide-react";

export const ManagingYourCookiePreferences = {
  id: 7,
  icon: Settings,
  title: "Managing Your Cookie Preferences",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        You have several options to control or limit how cookies are used on your device:
      </p>

      <h4 className="text-white font-semibold mb-3 mt-6">Browser Settings</h4>
      <p className="text-gray-400 leading-relaxed mb-2">
        Most web browsers allow you to control cookies through their settings preferences. You can:
      </p>
      <ul className="space-y-2 ml-4 mb-4">
        <li className="text-gray-400">• Delete all cookies from your browser</li>
        <li className="text-gray-400">• Block all cookies by default</li>
        <li className="text-gray-400">• Block third-party cookies specifically</li>
        <li className="text-gray-400">• Receive notifications when cookies are being sent</li>
      </ul>

      <h4 className="text-white font-semibold mb-3 mt-6">Browser-Specific Instructions</h4>
      <div className="bg-white/5 rounded-lg p-4 border border-white/10 space-y-2">
        <p className="text-gray-400">• <span className="text-white">Chrome:</span> Settings → Privacy and security → Cookies and other site data</p>
        <p className="text-gray-400">• <span className="text-white">Firefox:</span> Options → Privacy & Security → Cookies and Site Data</p>
        <p className="text-gray-400">• <span className="text-white">Safari:</span> Preferences → Privacy → Manage Website Data</p>
        <p className="text-gray-400">• <span className="text-white">Edge:</span> Settings → Privacy, search, and services → Cookies</p>
      </div>

      <h4 className="text-white font-semibold mb-3 mt-6">Cookie Consent Tool</h4>
      <p className="text-gray-400 leading-relaxed mb-2">
        When you first visit our website, we provide a cookie consent banner that allows you to:
      </p>
      <ul className="space-y-2 ml-4">
        <li className="text-gray-400">• Accept all cookies</li>
        <li className="text-gray-400">• Reject non-essential cookies</li>
        <li className="text-gray-400">• Customize your cookie preferences by category</li>
        <li className="text-gray-400">• Change your preferences at any time</li>
      </ul>

      <div className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
        <p className="text-sm text-gray-400 leading-relaxed">
          <span className="text-yellow-500 font-semibold">Important:</span> Disabling certain cookies may affect the functionality of our website and limit your ability to use some features.
        </p>
      </div>
    </>
  ),
};
