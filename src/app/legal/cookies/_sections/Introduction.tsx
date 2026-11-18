import { FileText } from "lucide-react";

export const Introduction = {
  id: 1,
  icon: FileText,
  title: "Introduction",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        This Cookie Policy explains how <span className="text-white font-semibold">Hexor</span> ("we," "us," or "our") uses cookies and similar tracking technologies on our website and Platform. This policy provides you with clear and comprehensive information about the cookies we use and the purposes for using them.
      </p>
      <p className="text-gray-400 leading-relaxed mb-4">
        By continuing to browse or use our website, you agree to our use of cookies as described in this Cookie Policy. If you do not agree to our use of cookies, you should set your browser settings accordingly or refrain from using our website.
      </p>
      <p className="text-gray-400 leading-relaxed">
        <span className="text-white font-semibold">Last Updated:</span> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
    </>
  ),
};
