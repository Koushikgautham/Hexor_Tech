import { Lock } from "lucide-react";

export const DataSecurity = {
  id: 4,
  icon: Lock,
  title: "Data Security",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
      </p>
      
      <h4 className="text-white font-semibold mb-3 mt-6">Security Measures Include:</h4>
      <ul className="space-y-3">
        <li className="text-gray-400">
          <span className="text-white font-semibold">Encryption:</span> SSL/TLS encryption for data transmission and secure storage protocols
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Access Controls:</span> Role-based access restrictions and authentication requirements
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Regular Audits:</span> Security assessments and vulnerability testing
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Data Minimization:</span> Collection and retention of only necessary information
        </li>
      </ul>

      <p className="text-gray-400 leading-relaxed mt-4">
        However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security.
      </p>
    </>
  ),
};
