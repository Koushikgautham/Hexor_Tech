import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/authentication/RequireAdminSession";

// Someone counts as online only if their last heartbeat was recent,
// so a closed laptop doesn't show as "online" forever.
const ONLINE_WINDOW_MS = 2 * 60 * 1000;

// GET /api/admin/users: every user profile, newest first (admins only).
export async function GET() {
    const session = await requireAdminSession();
    if (!session.ok) return session.response;

    const { data: profiles, error } = await session.supabase
        .from("profiles")
        .select("id, email, full_name, role, avatar_url, is_active, is_scrum_master, is_online, last_seen, created_at, updated_at")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("GET /api/admin/users:", error.message);
        return NextResponse.json({ error: "Failed to load users" }, { status: 500 });
    }

    const now = Date.now();
    const users = (profiles ?? []).map((profile) => ({
        ...profile,
        is_online:
            profile.is_online &&
            !!profile.last_seen &&
            now - new Date(profile.last_seen).getTime() < ONLINE_WINDOW_MS,
    }));

    return NextResponse.json({ users });
}
