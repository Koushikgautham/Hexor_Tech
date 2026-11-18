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

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            const { error } = await signIn(data.email, data.password);
            if (error) {
                toast.error(error.message || "Invalid email or password");
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
