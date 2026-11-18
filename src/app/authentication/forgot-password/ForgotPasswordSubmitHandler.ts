"use client";

import * as React from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/lib/authentication/AuthenticationContext";

// Form validation
export const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Submit logic
export function useForgotPasswordAuth() {
    const { resetPassword } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const [emailSent, setEmailSent] = React.useState(false);

    // Sent here by /authentication/confirm when a reset link is used, expired or invalid.
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("status") === "link_expired") {
            toast.error("That reset link is invalid or has expired. Please request a new one.");
            window.history.replaceState(null, "", window.location.pathname);
        }
    }, []);

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true);
        try {
            const { error } = await resetPassword(data.email);
            if (error) {
                toast.error(error.message);
            } else {
                setEmailSent(true);
                // Same message whether or not the email exists, so accounts can't be probed.
                toast.success("If an account exists for that email, a reset link is on its way.");
            }
        } catch {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, emailSent, setEmailSent, onSubmit };
}
