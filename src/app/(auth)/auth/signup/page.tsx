"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User, Loader2, Check } from "lucide-react";
import { useAuth } from "../../../../../contexts/AuthContext";

const signupSchema = z
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

type SignupFormData = z.infer<typeof signupSchema>;

const passwordRequirements = [
    { regex: /.{8,}/, label: "At least 8 characters" },
    { regex: /[A-Z]/, label: "One uppercase letter" },
    { regex: /[a-z]/, label: "One lowercase letter" },
    { regex: /[0-9]/, label: "One number" },
];

export default function SignupPage() {
    const { signUp } = useAuth();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [password, setPassword] = React.useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    // Watch password for requirements display
    React.useEffect(() => {
        const subscription = watch((value) => {
            if (value.password) {
                setPassword(value.password);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

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

    return (
        <div className="w-full">
            {/* Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 shadow-xl"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        Create Account
                    </h1>
                    <p className="text-muted-foreground">
                        Join Hexora to get started
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Full Name */}
                    <div className="space-y-2">
                        <label
                            htmlFor="fullName"
                            className="text-sm font-medium text-foreground"
                        >
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                {...register("fullName")}
                                type="text"
                                id="fullName"
                                placeholder="John Doe"
                                className="w-full pl-11 pr-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                            />
                        </div>
                        {errors.fullName && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-destructive"
                            >
                                {errors.fullName.message}
                            </motion.p>
                        )}
                    </div>

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

                    {/* Password */}
                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-foreground"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="••••••••"
                                className="w-full pl-11 pr-12 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {/* Password Requirements */}
                        {password && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="grid grid-cols-2 gap-2 pt-2"
                            >
                                {passwordRequirements.map((req, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`flex items-center gap-2 text-xs ${req.regex.test(password)
                                            ? "text-green-500"
                                            : "text-muted-foreground"
                                            }`}
                                    >
                                        <Check
                                            className={`w-3 h-3 ${req.regex.test(password) ? "opacity-100" : "opacity-30"
                                                }`}
                                        />
                                        {req.label}
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {errors.password && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-destructive"
                            >
                                {errors.password.message}
                            </motion.p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <label
                            htmlFor="confirmPassword"
                            className="text-sm font-medium text-foreground"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                {...register("confirmPassword")}
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="••••••••"
                                className="w-full pl-11 pr-12 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-destructive"
                            >
                                {errors.confirmPassword.message}
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
                                Creating account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </motion.button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-card text-muted-foreground">
                            Already have an account?
                        </span>
                    </div>
                </div>

                {/* Sign In Link */}
                <Link href="/auth/login">
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/80 transition-all"
                    >
                        Sign In
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}
