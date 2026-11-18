import { Users } from "lucide-react";

export const UserAccountsAndAccess = {
  id: 4,
  icon: Users,
  title: "User Accounts and Access",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        To access certain features of our Platform, including the client dashboard, you must create an account with accurate and complete information.
      </p>
      <ul className="space-y-3">
        <li className="text-gray-400">
          <span className="text-white font-semibold">Account Security:</span> You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Role-Based Access:</span> Accounts are assigned roles (Admin or Client) with specific access permissions. You may only access features authorized for your role.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Account Suspension:</span> We reserve the right to suspend or deactivate accounts that violate these Terms or engage in unauthorized activity.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Password Requirements:</span> Passwords must meet our security requirements (minimum 8 characters, including uppercase, lowercase, and numbers).
        </li>
      </ul>
      <p className="text-gray-400 leading-relaxed mt-4">
        You must notify us immediately of any unauthorized use of your account or any security breach.
      </p>
    </>
  ),
};
