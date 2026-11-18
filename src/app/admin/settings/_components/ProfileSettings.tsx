"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { User, Shield, Save, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { profileSchema, ProfileFormData } from "../SettingsSchemas";

// Profile Settings
export function ProfileSettings({
    user,
    profile,
}: {
    user: import("@supabase/supabase-js").User | null;
    profile: import("@/lib/authentication/UserProfileTypes").UserProfile | null;
}) {
    const [isLoading, setIsLoading] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: profile?.full_name || "",
            email: user?.email || "",
        },
    });

    const onSubmit = async (data: ProfileFormData) => {
        setIsLoading(true);
        try {
            // In production, update profile via Supabase
            await new Promise((r) => setTimeout(r, 1000)); // Simulate API call
            toast.success("Profile updated successfully!");
        } catch {
            toast.error("Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-xl">
                    <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-foreground">
                        Profile Information
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Update your personal information
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Avatar */}
                <div className="flex items-center gap-4 pb-4 border-b border-border">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary-foreground">
                            {profile?.full_name?.charAt(0) ||
                                user?.email?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <p className="font-medium text-foreground">Profile Picture</p>
                        <button
                            type="button"
                            className="text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                            Change avatar
                        </button>
                    </div>
                </div>

                {/* Full Name */}
                <div>
                    <label className="text-sm font-medium text-foreground">
                        Full Name
                    </label>
                    <input
                        {...register("fullName")}
                        type="text"
                        className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                    {errors.fullName && (
                        <p className="text-sm text-destructive mt-1">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="text-sm font-medium text-foreground">
                        Email Address
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Role Display */}
                <div>
                    <label className="text-sm font-medium text-foreground">Role</label>
                    <div className="mt-1.5 px-4 py-2.5 bg-secondary rounded-xl text-sm flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="capitalize">{profile?.role || "Admin"}</span>
                    </div>
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
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Changes
                            </>
                        )}
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
}
