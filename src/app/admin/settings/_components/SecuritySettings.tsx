"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Lock, Shield, Key, Loader2, Eye, EyeOff, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { passwordSchema, PasswordFormData, passwordRequirements } from "../SettingsSchemas";

// Security Settings
export function SecuritySettings({
    updatePassword,
}: {
    updatePassword: (password: string) => Promise<import("@/lib/authentication/AuthenticationContext").AuthActionResult>;
}) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [password, setPassword] = React.useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
    });

    React.useEffect(() => {
        const subscription = watch((value) => {
            if (value.newPassword) {
                setPassword(value.newPassword);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = async (data: PasswordFormData) => {
        setIsLoading(true);
        try {
            const { error } = await updatePassword(data.newPassword);
            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Password updated successfully!");
                reset();
                setPassword("");
            }
        } catch {
            toast.error("Failed to update password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Password Change */}
            <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <Key className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">
                            Change Password
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Update your password to keep your account secure
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Current Password */}
                    <div>
                        <label className="text-sm font-medium text-foreground">
                            Current Password
                        </label>
                        <div className="relative mt-1.5">
                            <input
                                {...register("currentPassword")}
                                type={showCurrentPassword ? "text" : "password"}
                                className="w-full px-4 py-2.5 pr-12 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showCurrentPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {errors.currentPassword && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.currentPassword.message}
                            </p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="text-sm font-medium text-foreground">
                            New Password
                        </label>
                        <div className="relative mt-1.5">
                            <input
                                {...register("newPassword")}
                                type={showNewPassword ? "text" : "password"}
                                className="w-full px-4 py-2.5 pr-12 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showNewPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        {/* Password Requirements */}
                        {password && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {passwordRequirements.map((req, index) => (
                                    <div
                                        key={index}
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
                                    </div>
                                ))}
                            </div>
                        )}

                        {errors.newPassword && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-sm font-medium text-foreground">
                            Confirm New Password
                        </label>
                        <div className="relative mt-1.5">
                            <input
                                {...register("confirmPassword")}
                                type={showConfirmPassword ? "text" : "password"}
                                className="w-full px-4 py-2.5 pr-12 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50 transition-all"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4" />
                                    Update Password
                                </>
                            )}
                        </motion.button>
                    </div>
                </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <Shield className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                Two-Factor Authentication
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Add an extra layer of security to your account
                            </p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors">
                        Enable
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
