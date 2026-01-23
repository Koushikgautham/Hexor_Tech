"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, ArrowLeft } from "lucide-react";


export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Animated background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
                    style={{
                        background:
                            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-15"
                    style={{
                        background:
                            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
                    }}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -20, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full opacity-10"
                    style={{
                        background:
                            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between p-6">
                <Link href="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ x: -3 }}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">Back to Website</span>
                    </motion.div>
                </Link>

                {/* Logo */}
                <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                    <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-lg">
                                H
                            </span>
                        </div>
                        <span className="text-xl font-bold text-foreground hidden sm:inline">
                            Hexora
                        </span>
                    </motion.div>
                </Link>

                {/* Theme Toggle */}
                {mounted && (
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                        aria-label="Toggle theme"
                    >
                        <motion.div
                            key={theme}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5 text-foreground" />
                            ) : (
                                <Moon className="w-5 h-5 text-foreground" />
                            )}
                        </motion.div>
                    </button>
                )}
            </header>

            {/* Main content */}
            <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-4 pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    {children}
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 text-center py-4 text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Hexora. All rights reserved.</p>
            </footer>
        </div>
    );
}
