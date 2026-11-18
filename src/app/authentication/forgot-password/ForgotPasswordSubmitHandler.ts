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

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true);
        try {
            const { error } = await resetPassword(data.email);
            if (error) {
                toast.error(error.message || "Failed to send reset email");
            } else {
                setEmailSent(true);
                toast.success("Password reset email sent!");
            }
        } catch {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, emailSent, setEmailSent, onSubmit };
}
