/**
 * NEW LOGIN PAGE
 * 
 * This is a clean, isolated login page that:
 * 1. Uses the new auth provider
 * 2. Handles its own redirect logic
 * 3. Shows clear loading and error states
 * 4. Does NOT auto-redirect on mount
 * 
 * KEY DESIGN:
 * - signIn() returns where to redirect
 * - This component performs the redirect using window.location.href
 * - This ensures cookies are fully written before navigation
 */

"use client";

import React, { useState, FormEvent } from "react";
import { useNewAuth } from "@/providers/new-auth-provider";

export default function NewLoginPage() {
    const { signIn, isLoading: authLoading, isAuthenticated } = useNewAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // If already authenticated, show message
    if (authLoading) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.spinner} />
                    <p style={styles.loadingText}>Checking authentication...</p>
                </div>
            </div>
        );
    }

    if (isAuthenticated) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <h1 style={styles.title}>Already Logged In</h1>
                    <p style={styles.subtitle}>You are already authenticated.</p>
                    <button
                        style={styles.button}
                        onClick={() => window.location.href = "/auth-admin"}
                    >
                        Go to Admin Panel
                    </button>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            console.log("Attempting sign in for:", email);
            const result = await signIn(email, password);
            console.log("Sign in result:", result);

            if (result.success && result.redirectTo) {
                // Wait longer to ensure cookies are set and propagated
                await new Promise(resolve => setTimeout(resolve, 500));

                console.log("Redirecting to:", result.redirectTo);
                // Use hard redirect to ensure cookies are sent with next request
                window.location.href = result.redirectTo;
            } else {
                setError(result.error || "Login failed");
                setIsSubmitting(false);
            }
        } catch (err) {
            console.error("Login exception:", err);
            setError("An unexpected error occurred");
            setIsSubmitting(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Sign In</h1>
                <p style={styles.subtitle}>Enter your credentials to access the admin panel</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            disabled={isSubmitting}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={isSubmitting}
                            style={styles.input}
                        />
                    </div>

                    {error && (
                        <div style={styles.error}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            ...styles.button,
                            opacity: isSubmitting ? 0.7 : 1,
                            cursor: isSubmitting ? "not-allowed" : "pointer",
                        }}
                    >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </button>

                    <button
                        type="button"
                        onClick={() => window.location.href = "/"}
                        style={styles.secondaryButton}
                    >
                        Go to Website
                    </button>
                </form>
            </div>
        </div>
    );
}

// Inline styles (isolated, no dependencies)
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
        borderRadius: "12px",
        padding: "40px",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
    },
    title: {
        color: "#ffffff",
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "8px",
        textAlign: "center",
    },
    subtitle: {
        color: "#888888",
        fontSize: "14px",
        marginBottom: "32px",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    label: {
        color: "#cccccc",
        fontSize: "14px",
        fontWeight: "500",
    },
    input: {
        backgroundColor: "#2a2a2a",
        border: "1px solid #444444",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "16px",
        color: "#ffffff",
        outline: "none",
    },
    button: {
        backgroundColor: "#dc2626",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        padding: "14px 20px",
        fontSize: "16px",
        fontWeight: "600",
        marginTop: "10px",
    },
    secondaryButton: {
        backgroundColor: "transparent",
        color: "#888888",
        border: "1px solid #444444",
        borderRadius: "8px",
        padding: "14px 20px",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "12px",
    },
    error: {
        backgroundColor: "#331111",
        border: "1px solid #dc2626",
        borderRadius: "8px",
        padding: "12px",
        color: "#ff6b6b",
        fontSize: "14px",
        textAlign: "center",
    },
    spinner: {
        width: "40px",
        height: "40px",
        border: "3px solid #333333",
        borderTopColor: "#dc2626",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        margin: "0 auto 16px",
    },
    loadingText: {
        color: "#888888",
        textAlign: "center",
    },
};
