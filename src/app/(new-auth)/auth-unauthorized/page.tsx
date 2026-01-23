/**
 * UNAUTHORIZED PAGE
 * 
 * Shown when a user is logged in but doesn't have admin access.
 * This is better UX than just showing a blank page or error.
 */

"use client";

import React from "react";

export default function UnauthorizedPage() {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.icon}>🚫</div>
                <h1 style={styles.title}>Access Denied</h1>
                <p style={styles.message}>
                    You don&apos;t have permission to access this page.
                    This area is restricted to administrators only.
                </p>
                <div style={styles.buttons}>
                    <button
                        style={styles.primaryButton}
                        onClick={() => window.location.href = "/"}
                    >
                        Go to Homepage
                    </button>
                    <button
                        style={styles.secondaryButton}
                        onClick={() => window.location.href = "/auth-login"}
                    >
                        Sign in as Admin
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        padding: "20px",
    },
    card: {
        backgroundColor: "#1a1a1a",
        borderRadius: "16px",
        padding: "48px",
        textAlign: "center",
        maxWidth: "450px",
        width: "100%",
    },
    icon: {
        fontSize: "64px",
        marginBottom: "24px",
    },
    title: {
        color: "#ffffff",
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "16px",
    },
    message: {
        color: "#888888",
        fontSize: "16px",
        lineHeight: "1.6",
        marginBottom: "32px",
    },
    buttons: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    primaryButton: {
        backgroundColor: "#dc2626",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        padding: "14px 20px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
    },
    secondaryButton: {
        backgroundColor: "transparent",
        color: "#888888",
        border: "1px solid #444444",
        borderRadius: "8px",
        padding: "14px 20px",
        fontSize: "16px",
        cursor: "pointer",
    },
};
