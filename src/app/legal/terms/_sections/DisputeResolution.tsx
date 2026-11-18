import { Scale } from "lucide-react";

export const DisputeResolution = {
  id: 16,
  icon: Scale,
  title: "Dispute Resolution",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        In the event of disputes, we encourage resolution through the following process:
      </p>
      <ul className="space-y-3">
        <li className="text-gray-400">
          <span className="text-white font-semibold">Governing Law:</span> These Terms are governed by the laws of India, without regard to conflict of law principles.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Jurisdiction:</span> Any legal disputes shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu, India.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Good Faith Negotiation:</span> Parties agree to first attempt to resolve disputes through good faith negotiation.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Mediation:</span> If negotiation fails, parties may agree to mediation before pursuing legal action.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Arbitration:</span> For project-specific disputes, arbitration may be available as agreed in project contracts.
        </li>
      </ul>
    </>
  ),
};
