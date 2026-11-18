import { Settings } from "lucide-react";

export const TypesOfCookiesWeUse = {
  id: 3,
  icon: Settings,
  title: "Types of Cookies We Use",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        We use different types of cookies on our website, each serving specific purposes:
      </p>

      <div className="space-y-6">
        <div>
          <h4 className="text-white font-semibold mb-3">1. Essential/Strictly Necessary Cookies</h4>
          <p className="text-gray-400 leading-relaxed mb-2">
            These cookies are required for the basic functionality of our website. Without these cookies, our website cannot function properly.
          </p>
          <ul className="space-y-2 ml-4">
            <li className="text-gray-400">• Authentication and security cookies</li>
            <li className="text-gray-400">• Load balancing cookies</li>
            <li className="text-gray-400">• Session management</li>
            <li className="text-gray-400">• User interface customization</li>
          </ul>
          <p className="text-sm text-gray-500 mt-2">
            <span className="text-white">Legal Basis:</span> These cookies are necessary for the operation of our website and cannot be disabled.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">2. Performance/Analytics Cookies</h4>
          <p className="text-gray-400 leading-relaxed mb-2">
            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
          </p>
          <ul className="space-y-2 ml-4">
            <li className="text-gray-400">• Page views and navigation patterns</li>
            <li className="text-gray-400">• Time spent on pages</li>
            <li className="text-gray-400">• Error messages encountered</li>
            <li className="text-gray-400">• Website performance metrics</li>
          </ul>
          <p className="text-sm text-gray-500 mt-2">
            <span className="text-white">Tools Used:</span> Google Analytics, internal analytics systems
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">3. Functional Cookies</h4>
          <p className="text-gray-400 leading-relaxed mb-2">
            These cookies enable enhanced functionality and personalization, such as remembering your preferences.
          </p>
          <ul className="space-y-2 ml-4">
            <li className="text-gray-400">• Language preferences</li>
            <li className="text-gray-400">• Theme selection (dark/light mode)</li>
            <li className="text-gray-400">• Region/location settings</li>
            <li className="text-gray-400">• Recently viewed content</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">4. Targeting/Advertising Cookies</h4>
          <p className="text-gray-400 leading-relaxed mb-2">
            These cookies are used to deliver advertisements that are relevant to you and your interests.
          </p>
          <ul className="space-y-2 ml-4">
            <li className="text-gray-400">• Track browsing activity across websites</li>
            <li className="text-gray-400">• Build profiles of user interests</li>
            <li className="text-gray-400">• Deliver targeted advertisements</li>
            <li className="text-gray-400">• Measure advertising campaign effectiveness</li>
          </ul>
          <p className="text-sm text-gray-500 mt-2">
            <span className="text-white">Note:</span> You can opt-out of these cookies without affecting core website functionality.
          </p>
        </div>
      </div>
    </>
  ),
};
