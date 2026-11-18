import { Clock } from "lucide-react";

export const SessionVsPersistentCookies = {
  id: 4,
  icon: Clock,
  title: "Session vs. Persistent Cookies",
  content: (
    <>
      <div className="space-y-4">
        <div>
          <h4 className="text-white font-semibold mb-3">Session Cookies (Temporary)</h4>
          <p className="text-gray-400 leading-relaxed mb-2">
            These cookies are temporary and are deleted when you close your browser.
          </p>
          <ul className="space-y-2 ml-4">
            <li className="text-gray-400">• Enable navigation through our website</li>
            <li className="text-gray-400">• Maintain your login session</li>
            <li className="text-gray-400">• Store temporary data during your visit</li>
            <li className="text-gray-400">• Essential for secure transactions</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Persistent Cookies (Stored)</h4>
          <p className="text-gray-400 leading-relaxed mb-2">
            These cookies remain on your device for a set period or until you manually delete them.
          </p>
          <ul className="space-y-2 ml-4">
            <li className="text-gray-400">• Remember your preferences across visits</li>
            <li className="text-gray-400">• Enable "Remember Me" functionality</li>
            <li className="text-gray-400">• Provide personalized content</li>
            <li className="text-gray-400">• Track user behavior over time</li>
          </ul>
          <p className="text-sm text-gray-500 mt-2">
            <span className="text-white">Duration:</span> Our persistent cookies typically last between 30 days to 2 years, depending on their purpose.
          </p>
        </div>
      </div>
    </>
  ),
};
