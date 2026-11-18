"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/lib/authentication/AuthenticationContext";
import { createClient } from "@/lib/authentication/SupabaseBrowserClient";

// Form validation
export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const passwordRequirements = [
    { regex: /.{8,}/, label: "At least 8 characters" },
    { regex: /[A-Z]/, label: "One uppercase letter" },
    { regex: /[a-z]/, label: "One lowercase letter" },
    { regex: /[0-9]/, label: "One number" },
];

// Submit logic
export function useResetPasswordAuth() {
    const { updatePassword } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const [isSuccess, setIsSuccess] = React.useState(false);

    // This page only works right after opening a valid reset link.
    React.useEffect(() => {
        const checkResetSession = async () => {
            const { data } = await createClient().auth.getUser();
            if (!data.user) {
                toast.error("Your reset link is invalid or has expired. Please request a new one.");
                router.replace("/authentication/forgot-password");
            }
        };
        checkResetSession();
    }, [router]);

    const onSubmit = async (data: ResetPasswordFormData) => {
        setIsLoading(true);
        try {
            const { error } = await updatePassword(data.password);
            if (error) {
                toast.error(error.message);
            } else {
                // Log out every device (including this one) so the new password is required everywhere.
                await createClient().auth.signOut({ scope: "global" });
                setIsSuccess(true);
                toast.success("Password reset successfully!");
                setTimeout(() => {
                    router.push("/authentication/login");
                }, 3000);
            }
        } catch {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, isSuccess, onSubmit };
}
