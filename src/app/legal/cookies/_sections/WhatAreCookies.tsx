import { Cookie } from "lucide-react";

export const WhatAreCookies = {
  id: 2,
  icon: Cookie,
  title: "What Are Cookies?",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
      </p>
      
      <h4 className="text-white font-semibold mb-3 mt-6">Key Characteristics of Cookies:</h4>
      <ul className="space-y-3">
        <li className="text-gray-400">
          <span className="text-white font-semibold">Storage:</span> Cookies are stored in your browser's cookie folder
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Information:</span> They contain information about your browsing session and preferences
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Purpose:</span> Help websites remember your actions and preferences over time
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Expiration:</span> Can be temporary (session) or persistent (stored for longer periods)
        </li>
      </ul>

      <p className="text-gray-400 leading-relaxed mt-4">
        Cookies do not typically contain personal information that directly identifies you, but they can store information about your device and browsing patterns.
      </p>
    </>
  ),
};
