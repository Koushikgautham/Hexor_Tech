/**
 * ADMIN PANEL CLIENT COMPONENT
 * 
 * This is the client-side UI for the admin panel.
 * 
 * WHY SEPARATE CLIENT COMPONENT?
 * - The parent (page.tsx) is a Server Component for security
 * - Interactive elements (logout button) need client-side JavaScript
 * - This separation follows Next.js best practices
 * 
 * The profile is passed from the server component,
 * so we know it's already validated.
 */

"use client";

import React from "react";
import { useNewAuth } from "@/providers/new-auth-provider";
import type { UserProfile } from "@/lib/auth/types";

interface AdminPanelClientProps {
    profile: UserProfile;
}

export default function AdminPanelClient({ profile }: AdminPanelClientProps) {
    const { signOut } = useNewAuth();

    const handleSignOut = async () => {
        await signOut();
        // Hard redirect to ensure cookies are cleared
        window.location.href = "/auth-login";
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.avatar}>
                        {profile.full_name?.charAt(0) || profile.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 style={styles.title}>Admin Panel</h1>
                        <p style={styles.subtitle}>
                            Welcome, {profile.full_name || profile.email}
                        </p>
                    </div>
                </div>

                {/* Admin Badge */}
                <div style={styles.badge}>
                    <span style={styles.badgeIcon}>🛡️</span>
                    <span>Administrator Access</span>
                </div>

                {/* Profile Info */}
                <div style={styles.infoSection}>
                    <h2 style={styles.sectionTitle}>Your Profile</h2>

                    <div style={styles.infoRow}>
                        <span style={styles.infoLabel}>Email:</span>
                        <span style={styles.infoValue}>{profile.email}</span>
                    </div>

                    <div style={styles.infoRow}>
                        <span style={styles.infoLabel}>Name:</span>
                        <span style={styles.infoValue}>
                            {profile.full_name || "Not set"}
                        </span>
                    </div>

                    <div style={styles.infoRow}>
                        <span style={styles.infoLabel}>Role:</span>
                        <span style={{ ...styles.infoValue, color: "#22c55e" }}>
                            {profile.role.toUpperCase()}
                        </span>
                    </div>

                    <div style={styles.infoRow}>
                        <span style={styles.infoLabel}>Status:</span>
                        <span style={styles.infoValue}>
                            {profile.is_active ? "✅ Active" : "❌ Inactive"}
                        </span>
                    </div>
                </div>

                {/* Success Message */}
                <div style={styles.successBox}>
                    <p style={styles.successTitle}>✨ Login System Working!</p>
                    <p style={styles.successText}>
                        You have successfully logged in to the new isolated auth system.
                        This page is server-side protected and only accessible to admins.
                    </p>
                </div>

                {/* Sign Out Button */}
                <button onClick={handleSignOut} style={styles.signOutButton}>
                    Sign Out
                </button>
            </div>
        </div>
    );
}

// Inline styles
const styles: Record<string, React.CSSProperties> = {
    container: {
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
    },
    card: {
        backgroundColor: "#1a1a1a",
        borderRadius: "16px",
        padding: "40px",
        width: "100%",
        maxWidth: "600px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
        marginBottom: "24px",
    },
    avatar: {
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#dc2626",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontSize: "24px",
        fontWeight: "bold",
    },
    title: {
        color: "#ffffff",
        fontSize: "28px",
        fontWeight: "bold",
        margin: 0,
    },
    subtitle: {
        color: "#888888",
        fontSize: "14px",
        margin: 0,
    },
    badge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: "#1e3a2f",
        color: "#22c55e",
        padding: "8px 16px",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: "500",
        marginBottom: "32px",
    },
    badgeIcon: {
        fontSize: "16px",
    },
    infoSection: {
        marginBottom: "32px",
    },
    sectionTitle: {
        color: "#ffffff",
        fontSize: "18px",
        fontWeight: "600",
        marginBottom: "16px",
    },
    infoRow: {
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: "1px solid #333333",
    },
    infoLabel: {
        color: "#888888",
        fontSize: "14px",
    },
    infoValue: {
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "500",
    },
    successBox: {
        backgroundColor: "#1e3a2f",
        border: "1px solid #22c55e",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "24px",
    },
    successTitle: {
        color: "#22c55e",
        fontSize: "16px",
        fontWeight: "600",
        margin: "0 0 8px 0",
    },
    successText: {
        color: "#88c9a0",
        fontSize: "14px",
        margin: 0,
        lineHeight: "1.5",
    },
    signOutButton: {
        width: "100%",
        backgroundColor: "#333333",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        padding: "14px 20px",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
    },
};
