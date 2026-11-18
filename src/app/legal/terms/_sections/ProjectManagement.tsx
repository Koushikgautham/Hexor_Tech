import { Clock } from "lucide-react";

export const ProjectManagement = {
  id: 9,
  icon: Clock,
  title: "Project Management",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        We provide a transparent project management system through our client dashboard:
      </p>
      <ul className="space-y-3">
        <li className="text-gray-400">
          <span className="text-white font-semibold">Project Tracking:</span> Clients can view active and completed projects, including progress percentages and task completion metrics.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Milestones:</span> Projects are divided into milestones with specific deliverables and timelines.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Timeline Expectations:</span> Timelines are estimates and may be adjusted based on project complexity and client responsiveness.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Change Requests:</span> Requests for changes to project scope may result in timeline extensions and additional costs.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Communication:</span> Regular updates will be provided through the dashboard and agreed communication channels.
        </li>
      </ul>
    </>
  ),
};
