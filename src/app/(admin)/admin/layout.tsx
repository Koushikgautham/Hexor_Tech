"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
    LogOut,
    Sun,
    Moon,
    ChevronDown,
    Shield,
    Bell,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, profile, isAdmin, isLoading, signOut } = useAuth();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [userMenuOpen, setUserMenuOpen] = React.useState(false);
    const [hasRedirected, setHasRedirected] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Redirect if not admin or not logged in - but only once loading is complete
    React.useEffect(() => {
        // Wait until loading is complete before making decisions
        if (isLoading) return;

        // Only redirect once
        if (hasRedirected) return;

        // If no user, redirect to login
        if (!user) {
            setHasRedirected(true);
            window.location.href = "/auth-login";
            return;
        }

        // If user exists but not admin, redirect to unauthorized
        if (!isAdmin) {
            setHasRedirected(true);
            window.location.href = "/auth-unauthorized";
            return;
        }
    }, [user, isAdmin, isLoading, hasRedirected]);

    // Show loading while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground">Loading...</p>
                </motion.div>
            </div>
        );
    }

    // Show loading while waiting for redirect (user not authorized)
    if (!user || !isAdmin) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground">Redirecting...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo & Brand */}
                        <Link href="/admin/dashboard" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-xl">H</span>
                            </div>
                            <div>
                                <h1 className="font-bold text-foreground">Hexora</h1>
                                <p className="text-xs text-muted-foreground">Admin Portal</p>
                            </div>
                        </Link>

                        {/* Navigation Links - Desktop */}
                        <nav className="hidden md:flex items-center gap-1">
                            <Link href="/admin/dashboard">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                                >
                                    Dashboard
                                </motion.div>
                            </Link>
                            <Link href="/admin/users">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                                >
                                    Users
                                </motion.div>
                            </Link>
                            <Link href="/admin/projects">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                                >
                                    Projects
                                </motion.div>
                            </Link>
                            <Link href="/admin/settings">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                                >
                                    Settings
                                </motion.div>
                            </Link>
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            {/* Admin Badge */}
                            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg">
                                <Shield className="w-4 h-4 text-primary" />
                                <span className="text-xs font-medium text-primary">Admin</span>
                            </div>

                            {/* Notifications */}
                            <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
                                <Bell className="w-5 h-5 text-muted-foreground" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
                            </button>

                            {/* Theme Toggle */}
                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                >
                                    {theme === "dark" ? (
                                        <Sun className="w-5 h-5 text-muted-foreground" />
                                    ) : (
                                        <Moon className="w-5 h-5 text-muted-foreground" />
                                    )}
                                </button>
                            )}

                            {/* User Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 p-2 hover:bg-secondary rounded-xl transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                        <span className="text-primary-foreground font-medium text-sm">
                                            {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="hidden sm:block text-left">
                                        <p className="text-sm font-medium text-foreground">
                                            {profile?.full_name || "Admin"}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                                            {user.email}
                                        </p>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                </button>

                                {/* User Dropdown */}
                                {userMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
                                    >
                                        <Link href="/admin/settings">
                                            <div
                                                onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-2 px-4 py-3 hover:bg-secondary transition-colors cursor-pointer"
                                            >
                                                <Shield className="w-4 h-4" />
                                                <span className="text-sm">Settings</span>
                                            </div>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setUserMenuOpen(false);
                                                signOut();
                                            }}
                                            className="flex items-center gap-2 w-full px-4 py-3 text-destructive hover:bg-destructive/10 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span className="text-sm">Sign Out</span>
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
