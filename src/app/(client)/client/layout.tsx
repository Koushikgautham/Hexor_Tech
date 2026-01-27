"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
    LogOut,
    Sun,
    Moon,
    ChevronDown,
    LayoutDashboard,
    FolderKanban,
    Receipt,
    User,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, profile, isLoading, signOut } = useAuth();
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const [mounted, setMounted] = React.useState(false);
    const [userMenuOpen, setUserMenuOpen] = React.useState(false);
    const [hasRedirected, setHasRedirected] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Redirect if not client or not logged in
    React.useEffect(() => {
        if (isLoading) return;
        if (hasRedirected) return;

        if (!user) {
            setHasRedirected(true);
            window.location.href = "/auth/login";
            return;
        }

        if (profile?.role !== "client") {
            setHasRedirected(true);
            window.location.href = "/auth/login";
            return;
        }
    }, [user, profile, isLoading, hasRedirected]);

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

    // Show loading while waiting for redirect
    if (!user || profile?.role !== "client") {
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

    const navItems = [
        { href: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/client/projects", label: "Projects", icon: FolderKanban },
        { href: "/client/invoices", label: "Invoices", icon: Receipt },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo & Brand */}
                        <Link href="/client/dashboard" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-xl">H</span>
                            </div>
                            <div>
                                <h1 className="font-bold text-foreground">Hexora</h1>
                                <p className="text-xs text-muted-foreground">Client Portal</p>
                            </div>
                        </Link>

                        {/* Navigation Links - Desktop */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                                return (
                                    <Link key={item.href} href={item.href}>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                isActive
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-foreground hover:bg-secondary"
                                            }`}
                                        >
                                            <item.icon className="w-4 h-4" />
                                            {item.label}
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
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
                                            {profile?.full_name || "Client"}
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
                                        <div className="px-4 py-3 border-b border-border">
                                            <p className="text-sm font-medium text-foreground">{profile?.full_name}</p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
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

            {/* Mobile Navigation */}
            <div className="md:hidden border-b border-border bg-background/95 backdrop-blur">
                <nav className="flex justify-around p-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground"
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="text-xs font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

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
