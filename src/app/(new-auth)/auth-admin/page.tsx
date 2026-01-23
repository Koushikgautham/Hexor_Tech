/**
 * NEW ADMIN PAGE
 * 
 * This is a SERVER-SIDE PROTECTED admin page.
 * 
 * WHY SERVER-SIDE PROTECTION?
 * - Client-side checks can be bypassed
 * - Server validates the actual session with Supabase
 * - This is the ONLY secure way to protect admin content
 * 
 * FLOW:
 * 1. This is a Server Component
 * 2. It calls getServerProfile() to validate auth
 * 3. If not admin, redirects to /auth-unauthorized
 * 4. If admin, renders the admin content
 */

import { redirect } from "next/navigation";
import { getServerProfile } from "@/lib/auth/server-client";
import AdminPanelClient from "./admin-panel-client";

export default async function NewAdminPage() {
    // Server-side auth check - this is SECURE
    const profile = await getServerProfile();

    // Not logged in
    if (!profile) {
        redirect("/auth-login");
    }

    // Logged in but not admin
    if (profile.role !== "admin") {
        redirect("/auth-unauthorized");
    }

    // User is authenticated admin - render the page
    return <AdminPanelClient profile={profile} />;
}
