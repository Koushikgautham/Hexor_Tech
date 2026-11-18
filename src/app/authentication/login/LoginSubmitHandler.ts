"use client";

import * as React from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/lib/authentication/AuthenticationContext";

// Login form validation
export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Login submit logic (sign-in, toasts, loading state)
export function useLoginAuth() {
    const { signIn } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);

    // Sent here by /authentication/confirm after a signup confirmation link.
    React.useEffect(() => {
        const status = new URLSearchParams(window.location.search).get("status");
        if (status === "email_confirmed") toast.success("Email confirmed! You can log in now.");
        if (status === "link_expired") toast.error("That link is invalid or has expired.");
        if (status) window.history.replaceState(null, "", window.location.pathname);
    }, []);

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            const { error } = await signIn(data.email, data.password);
            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Welcome back!");
            }
        } catch {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, onSubmit };
}
