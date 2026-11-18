"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Users,
    Settings,
    Shield,
    Calendar,
    ArrowRight,
} from "lucide-react";
import { useAuth } from "@/lib/authentication/AuthenticationContext";

const quickLinks = [
    {
        href: "/admin/users",
        label: "User Management",
        description: "Manage users, roles, and permissions",
        icon: Users,
        color: "bg-blue-500/10 text-blue-500",
    },
    {
        href: "/admin/settings",
        label: "Settings",
        description: "Configure your account preferences",
        icon: Settings,
        color: "bg-purple-500/10 text-purple-500",
    },
];

export default function DashboardPage() {
    const { profile } = useAuth();
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-4 py-12"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Admin Access</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    Welcome back, {profile?.full_name || "Admin"}!
                </h1>

                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    You have full administrative privileges. Manage users, configure settings, and oversee all operations from this dashboard.
                </p>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4">
                    <Calendar className="w-4 h-4" />
                    <span>{currentDate}</span>
                </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {quickLinks.map((link, index) => (
                    <Link key={link.href} href={link.href}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl ${link.color}`}>
                                    <link.icon className="w-6 h-6" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>

                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                {link.label}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                {link.description}
                            </p>
                        </motion.div>
                    </Link>
                ))}
            </motion.div>

            {/* Admin Info Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-8"
            >
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                        <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            Administrator Privileges
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            As an administrator, you have full access to:
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                View and manage all user accounts
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                Reset passwords and change user roles
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                Activate or deactivate user accounts
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                Configure system settings and preferences
                            </li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
