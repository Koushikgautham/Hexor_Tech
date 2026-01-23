"use client";

import * as React from "react";
import dynamic from "next/dynamic";

// Dynamically import the login form with SSR disabled
const LoginFormComponent = dynamic(() => import("./login-form"), {
    ssr: false,
    loading: () => (
        <div className="w-full flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    ),
});

export default function LoginPage() {
    return (
        <div className="w-full">
            <LoginFormComponent />
        </div>
    );
}
