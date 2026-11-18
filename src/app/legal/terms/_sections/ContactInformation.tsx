import { Users } from "lucide-react";

export const ContactInformation = {
  id: 18,
  icon: Users,
  title: "Contact Information",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        If you have any questions, concerns, or feedback about these Terms or our services, please contact us:
      </p>
      <div className="space-y-3 text-gray-400">
        <p>
          <span className="text-white font-semibold">Company Name:</span> Hexor
        </p>
        <p>
          <span className="text-white font-semibold">Location:</span> Chennai, Tamil Nadu, India
        </p>
        <p>
          <span className="text-white font-semibold">Website:</span>{' '}
          <a href="/" className="text-primary hover:underline">
            Hexor.com
          </a>
        </p>
        <p>
          <span className="text-white font-semibold">Support:</span> Use the contact form on our website or reach out through your client dashboard
        </p>
      </div>
      <p className="text-gray-400 leading-relaxed mt-6">
        We aim to respond to all inquiries within 1-2 business days during our standard business hours (Monday to Friday, 9:00 AM to 6:00 PM IST).
      </p>
    </>
  ),
};
