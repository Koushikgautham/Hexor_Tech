"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
<<<<<<< Updated upstream
import { useAuth } from "../../../../contexts/AuthContext";
=======
import { useAuth } from "@/contexts/AuthContext";
>>>>>>> Stashed changes

const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
    const { resetPassword } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const [emailSent, setEmailSent] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

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

    if (emailSent) {
        return (
            <div className="w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card border border-border rounded-2xl p-8 shadow-xl text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </motion.div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        Check Your Email
                    </h1>
                    <p className="text-muted-foreground mb-6">
                        We&apos;ve sent a password reset link to{" "}
                        <span className="text-foreground font-medium">
                            {getValues("email")}
                        </span>
                    </p>
                    <p className="text-sm text-muted-foreground mb-8">
                        Didn&apos;t receive the email? Check your spam folder or try again.
                    </p>
                    <div className="space-y-3">
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => setEmailSent(false)}
                            className="w-full py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/80 transition-all"
                        >
                            Try Different Email
                        </motion.button>
                        <Link href="/auth/login">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
                            >
                                Back to Login
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 shadow-xl"
            >
                {/* Back Button */}
                <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Back to login</span>
                </Link>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        Forgot Password?
                    </h1>
                    <p className="text-muted-foreground">
                        Enter your email and we&apos;ll send you a reset link
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-foreground"
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                {...register("email")}
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                className="w-full pl-11 pr-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                            />
                        </div>
                        {errors.email && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-destructive"
                            >
                                {errors.email.message}
                            </motion.p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all glow-red"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            "Send Reset Link"
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
