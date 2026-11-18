import { Shield } from "lucide-react";

export const IntellectualPropertyRights = {
  id: 7,
  icon: Shield,
  title: "Intellectual Property Rights",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        Intellectual property ownership is governed by the following principles:
      </p>
      <ul className="space-y-3">
        <li className="text-gray-400">
          <span className="text-white font-semibold">Client Ownership:</span> Upon full payment, clients receive ownership of final deliverables specifically created for their project.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Hexor Proprietary Assets:</span> Our proprietary methodologies, tools, frameworks, templates, and processes remain our exclusive property.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Pre-Existing IP:</span> Any intellectual property owned by either party before the engagement remains with the original owner.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Third-Party Software:</span> Use of third-party software, platforms, or services is subject to their respective licenses and terms.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Portfolio Usage:</span> We reserve the right to showcase completed projects in our portfolio unless otherwise agreed in writing.
        </li>
      </ul>
    </>
  ),
};
