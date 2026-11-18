import { Clock } from "lucide-react";

export const CookieLifespanAndRetention = {
  id: 10,
  icon: Clock,
  title: "Cookie Lifespan and Retention",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        Different cookies have different lifespans on your device:
      </p>

      <div className="bg-white/5 rounded-lg p-4 border border-white/10 space-y-3">
        <div>
          <p className="text-white font-semibold">Session Cookies:</p>
          <p className="text-gray-400 text-sm">Deleted when you close your browser (immediate expiration)</p>
        </div>
        <div>
          <p className="text-white font-semibold">Authentication Cookies:</p>
          <p className="text-gray-400 text-sm">30 days (or until logout)</p>
        </div>
        <div>
          <p className="text-white font-semibold">Preference Cookies:</p>
          <p className="text-gray-400 text-sm">1 year</p>
        </div>
        <div>
          <p className="text-white font-semibold">Analytics Cookies:</p>
          <p className="text-gray-400 text-sm">2 years</p>
        </div>
        <div>
          <p className="text-white font-semibold">Marketing Cookies:</p>
          <p className="text-gray-400 text-sm">90 days to 1 year</p>
        </div>
      </div>

      <p className="text-gray-400 leading-relaxed mt-4">
        You can delete cookies at any time using your browser settings, regardless of their intended lifespan.
      </p>
    </>
  ),
};
