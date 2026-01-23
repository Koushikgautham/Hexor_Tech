/**
 * NEW AUTH LAYOUT
 * 
 * This layout wraps all the new auth routes:
 * - /auth-login
 * - /auth-admin
 * - /auth-unauthorized
 * 
 * It provides the NewAuthProvider context to all child routes.
 * 
 * WHY A SEPARATE LAYOUT?
 * - Isolates the new auth system from the existing site
 * - Provides the auth context only where needed
 * - Does not affect existing pages
 */

import { NewAuthProvider } from "@/providers/new-auth-provider";

export default function NewAuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <NewAuthProvider>
            {children}
        </NewAuthProvider>
    );
}
