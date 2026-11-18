import { Clock } from "lucide-react";

export const ServiceLevelAndSupport = {
  id: 10,
  icon: Clock,
  title: "Service Level and Support",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        We are committed to providing quality support to our clients:
      </p>
      <ul className="space-y-3">
        <li className="text-gray-400">
          <span className="text-white font-semibold">Business Hours:</span> Our standard business hours are Monday to Friday, 9:00 AM to 6:00 PM IST, excluding public holidays in India.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Response Time:</span> We aim to respond to client inquiries within 1-2 business days for standard support requests.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Support Channels:</span> Support is available through email, the contact form on our website, and the client dashboard.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Emergency Procedures:</span> For urgent issues during active projects, expedited support may be available as agreed in project terms.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Platform Maintenance:</span> We may perform scheduled maintenance with advance notice when possible.
        </li>
      </ul>
    </>
  ),
};
