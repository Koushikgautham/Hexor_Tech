"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
    User,
    Lock,
    Bell,
    Palette,
    Shield,
    Key,
    Save,
    Loader2,
    Eye,
    EyeOff,
    Check,
    Moon,
    Sun,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";

const profileSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
});

const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
];

const passwordRequirements = [
    { regex: /.{8,}/, label: "At least 8 characters" },
    { regex: /[A-Z]/, label: "One uppercase letter" },
    { regex: /[a-z]/, label: "One lowercase letter" },
    { regex: /[0-9]/, label: "One number" },
];

export default function SettingsPage() {
    const { user, profile, updatePassword } = useAuth();
    const { theme, setTheme } = useTheme();
    const [activeTab, setActiveTab] = React.useState("profile");
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Tabs Sidebar */}
                <nav className="lg:w-64 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap transition-all ${activeTab === tab.id
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span className="font-medium">{tab.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {activeTab === "profile" && (
                        <ProfileSettings user={user} profile={profile} />
                    )}
                    {activeTab === "security" && (
                        <SecuritySettings
                            updatePassword={updatePassword}
                        />
                    )}
                    {activeTab === "notifications" && <NotificationSettings />}
                    {activeTab === "appearance" && mounted && (
                        <AppearanceSettings theme={theme} setTheme={setTheme} />
                    )}
                </div>
            </div>
        </div>
    );
}

// Profile Settings
function ProfileSettings({
    user,
    profile,
}: {
    user: import("@supabase/supabase-js").User | null;
    profile: import("@/lib/supabase").UserProfile | null;
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

// Security Settings
function SecuritySettings({
    updatePassword,
}: {
    updatePassword: (password: string) => Promise<{ error: import("@supabase/supabase-js").AuthError | null }>;
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

// Notification Settings
function NotificationSettings() {
    const [notifications, setNotifications] = React.useState({
        email: true,
        push: false,
        marketing: false,
        security: true,
        updates: true,
    });

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
        toast.success("Notification settings updated!");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-xl">
                    <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-foreground">
                        Notification Preferences
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Choose how you want to be notified
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {[
                    {
                        key: "email" as const,
                        label: "Email Notifications",
                        description: "Receive notifications via email",
                    },
                    {
                        key: "push" as const,
                        label: "Push Notifications",
                        description: "Receive push notifications in browser",
                    },
                    {
                        key: "security" as const,
                        label: "Security Alerts",
                        description: "Get notified about security events",
                    },
                    {
                        key: "updates" as const,
                        label: "Product Updates",
                        description: "Updates about new features and improvements",
                    },
                    {
                        key: "marketing" as const,
                        label: "Marketing Emails",
                        description: "Promotional content and offers",
                    },
                ].map((item) => (
                    <div
                        key={item.key}
                        className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                        <div>
                            <p className="font-medium text-foreground">{item.label}</p>
                            <p className="text-sm text-muted-foreground">
                                {item.description}
                            </p>
                        </div>
                        <button
                            onClick={() => toggleNotification(item.key)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${notifications[item.key] ? "bg-primary" : "bg-secondary"
                                }`}
                        >
                            <motion.div
                                animate={{ x: notifications[item.key] ? 24 : 2 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                            />
                        </button>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

// Appearance Settings
function AppearanceSettings({
    theme,
    setTheme,
}: {
    theme: string | undefined;
    setTheme: (theme: string) => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-xl">
                    <Palette className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-foreground">
                        Appearance
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Customize how the admin panel looks
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-sm font-medium text-foreground">Theme</p>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { id: "light", label: "Light", icon: Sun },
                        { id: "dark", label: "Dark", icon: Moon },
                        { id: "system", label: "System", icon: Palette },
                    ].map((option) => (
                        <motion.button
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setTheme(option.id)}
                            className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all ${theme === option.id
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                                }`}
                        >
                            <option.icon
                                className={`w-6 h-6 ${theme === option.id ? "text-primary" : "text-muted-foreground"
                                    }`}
                            />
                            <span
                                className={`text-sm font-medium ${theme === option.id ? "text-primary" : "text-foreground"
                                    }`}
                            >
                                {option.label}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
