import { Shield } from "lucide-react";

export const ThirdPartyCookieProviders = {
  id: 8,
  icon: Shield,
  title: "Third-Party Cookie Providers",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        We work with the following third-party service providers who may set cookies on our website:
      </p>

      <div className="space-y-4">
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h4 className="text-white font-semibold mb-2">Google Analytics</h4>
          <p className="text-gray-400 text-sm mb-2">
            Purpose: Website analytics and performance monitoring
          </p>
          <p className="text-gray-400 text-sm">
            Opt-out: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out Browser Add-on</a>
          </p>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h4 className="text-white font-semibold mb-2">Social Media Platforms</h4>
          <p className="text-gray-400 text-sm mb-2">
            Purpose: Enable social sharing and track engagement
          </p>
          <p className="text-gray-400 text-sm">
            Providers: LinkedIn, Twitter, Facebook (where applicable)
          </p>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h4 className="text-white font-semibold mb-2">Customer Support Tools</h4>
          <p className="text-gray-400 text-sm mb-2">
            Purpose: Live chat functionality and support ticket management
          </p>
          <p className="text-gray-400 text-sm">
            Used for: Providing real-time customer support
          </p>
        </div>
      </div>

      <p className="text-gray-400 leading-relaxed mt-4">
        Each of these third parties has their own privacy and cookie policies. We encourage you to review their policies to understand how they use cookies.
      </p>
    </>
  ),
};
