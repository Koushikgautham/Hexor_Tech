"use client";

import * as React from "react";
import { User, Lock, Bell, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/lib/authentication/AuthenticationContext";
import { ProfileSettings } from "./_components/ProfileSettings";
import { SecuritySettings } from "./_components/SecuritySettings";
import { NotificationSettings } from "./_components/NotificationSettings";
import { AppearanceSettings } from "./_components/AppearanceSettings";

const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
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
