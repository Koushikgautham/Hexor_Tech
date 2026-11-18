import { Mail } from "lucide-react";

export const ContactUs = {
  id: 12,
  icon: Mail,
  title: "Contact Us",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
      </p>
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <p className="text-white mb-2">
          <span className="text-white font-semibold">Email:</span> privacy@Hexor.com
        </p>
        <p className="text-white mb-2">
          <span className="text-white font-semibold">Address:</span> Chennai, Tamil Nadu, India
        </p>
        <p className="text-white">
          <span className="text-white font-semibold">Support:</span> Use the contact form on our website or reach out through your client dashboard
        </p>
      </div>
      <p className="text-gray-400 leading-relaxed mt-6">
        We aim to respond to all privacy-related inquiries within 5-7 business days. For urgent matters, please indicate "URGENT" in your subject line.
      </p>
    </>
  ),
};
