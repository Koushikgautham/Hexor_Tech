import { FileText } from "lucide-react";

export const ServicesDescription = {
  id: 3,
  icon: FileText,
  title: "Services Description",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        Hexor provides B2B digital transformation and business automation services designed specifically for MSMEs. Our services include:
      </p>
      <ul className="space-y-3">
        <li className="text-gray-400">
          <span className="text-white font-semibold">Digital Transformation:</span> Modernizing business processes, cloud migration, legacy system updates, and digital strategy consulting.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Automation Solutions:</span> Workflow automation, RPA implementation, API integrations, and AI/ML-powered business solutions.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Ecommerce Management:</span> End-to-end platform setup, inventory management, multi-channel selling, and online store optimization.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Social Media Management:</span> Content strategy, community management, paid campaigns, and influencer partnership coordination.
        </li>
      </ul>
      <p className="text-gray-400 leading-relaxed mt-4">
        All services are provided on a project-based engagement model and may be customized to meet specific client needs.
      </p>
    </>
  ),
};
