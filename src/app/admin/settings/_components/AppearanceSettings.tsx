"use client";

import { motion } from "framer-motion";
import { Palette, Moon, Sun } from "lucide-react";

// Appearance Settings
export function AppearanceSettings({
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
