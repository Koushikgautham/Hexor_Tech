"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { toast } from "sonner";

// Notification Settings
export function NotificationSettings() {
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
