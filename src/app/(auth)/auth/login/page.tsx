"use client";

import * as React from "react";
<<<<<<< Updated upstream
import dynamic from "next/dynamic";
=======
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
>>>>>>> Stashed changes

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
