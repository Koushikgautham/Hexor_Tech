import { Shield } from "lucide-react";

export const UpdatesToThisCookiePolicy = {
  id: 11,
  icon: Shield,
  title: "Updates to This Cookie Policy",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        We may update this Cookie Policy from time to time to reflect changes in our use of cookies, legal requirements, or best practices.
      </p>
      <p className="text-gray-400 leading-relaxed mb-4">
        When we make significant changes, we will notify you by:
      </p>
      <ul className="space-y-2 ml-4 mb-4">
        <li className="text-gray-400">• Posting the updated policy on this page</li>
        <li className="text-gray-400">• Updating the "Last Updated" date</li>
        <li className="text-gray-400">• Displaying a notification on our website</li>
        <li className="text-gray-400">• Sending an email to registered users (for material changes)</li>
      </ul>
      <p className="text-gray-400 leading-relaxed">
        We recommend that you review this Cookie Policy periodically to stay informed about our use of cookies.
      </p>
    </>
  ),
};
