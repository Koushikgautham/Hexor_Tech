import { FileText } from "lucide-react";

export const DoNotTrackSignals = {
  id: 9,
  icon: FileText,
  title: "Do Not Track Signals",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked.
      </p>
      <p className="text-gray-400 leading-relaxed mb-4">
        Currently, there is no industry standard for how companies should respond to DNT signals. We do not currently respond to DNT browser signals, but we provide you with the ability to control cookies as described in this policy.
      </p>
      <p className="text-gray-400 leading-relaxed">
        We will update this Cookie Policy if our practices change regarding DNT signals.
      </p>
    </>
  ),
};
