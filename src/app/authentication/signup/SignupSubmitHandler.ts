"use client";

import * as React from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/lib/authentication/AuthenticationContext";

// Form validation
export const signupSchema = z
    .object({
        fullName: z.string().min(2, "Full name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email address"),
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

export type SignupFormData = z.infer<typeof signupSchema>;

export const passwordRequirements = [
    { regex: /.{8,}/, label: "At least 8 characters" },
    { regex: /[A-Z]/, label: "One uppercase letter" },
    { regex: /[a-z]/, label: "One lowercase letter" },
    { regex: /[0-9]/, label: "One number" },
];

// Submit logic
export function useSignupAuth() {
    const { signUp } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        try {
            const { error } = await signUp(data.email, data.password, data.fullName);
            if (error) {
                toast.error(error.message || "Failed to create account");
            } else {
                toast.success(
                    "Account created! Please check your email to verify your account."
                );
            }
        } catch {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, onSubmit };
}
