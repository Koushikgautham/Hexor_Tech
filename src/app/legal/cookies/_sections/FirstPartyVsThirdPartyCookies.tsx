import { Globe } from "lucide-react";

export const FirstPartyVsThirdPartyCookies = {
  id: 5,
  icon: Globe,
  title: "First-Party vs. Third-Party Cookies",
  content: (
    <>
      <div className="space-y-4">
        <div>
          <h4 className="text-white font-semibold mb-3">First-Party Cookies</h4>
          <p className="text-gray-400 leading-relaxed mb-2">
            These cookies are set directly by Hexor and can only be read by our website.
          </p>
          <ul className="space-y-2 ml-4">
            <li className="text-gray-400">• Created and managed by us</li>
            <li className="text-gray-400">• Used for core website functionality</li>
            <li className="text-gray-400">• Store your preferences and settings</li>
            <li className="text-gray-400">• Enhance your user experience</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Third-Party Cookies</h4>
          <p className="text-gray-400 leading-relaxed mb-2">
            These cookies are set by domains other than Hexor, typically by our service providers and partners.
          </p>
          <ul className="space-y-2 ml-4">
            <li className="text-gray-400">• Analytics tools (e.g., Google Analytics)</li>
            <li className="text-gray-400">• Social media plugins</li>
            <li className="text-gray-400">• Advertising networks</li>
            <li className="text-gray-400">• Customer support chat widgets</li>
          </ul>
          <p className="text-sm text-gray-500 mt-2">
            <span className="text-white">Note:</span> Third-party cookies are governed by the privacy policies of the respective third parties.
          </p>
        </div>
      </div>
    </>
  ),
};
