import { NextResponse, type NextRequest } from "next/server";
import { databaseErrorMessage, requireAdminSession, UUID_PATTERN } from "@/lib/authentication/RequireAdminSession";
import type { UserRole } from "@/lib/authentication/UserProfileTypes";

const ROLES: UserRole[] = ["admin", "client", "user"];

// PATCH /api/admin/users/:id/role   body: { role: "admin" | "client" | "user" }
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await requireAdminSession();
    if (!session.ok) return session.response;

    const { id: userId } = await params;
    if (!UUID_PATTERN.test(userId)) {
        return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }

    const body = await request.json().catch(() => null);
    const role = body?.role as UserRole | undefined;
    if (!role || !ROLES.includes(role)) {
        return NextResponse.json({ error: "Role must be admin, client or user" }, { status: 400 });
    }

    // Stops an admin from accidentally locking themselves out.
    if (userId === session.user.id) {
        return NextResponse.json({ error: "You can't change your own role. Ask another admin." }, { status: 400 });
    }

    // The database also blocks removing the last admin and clears the
    // scrum master flag when an admin is demoted.
    const { data: updated, error } = await session.supabase
        .from("profiles")
        .update({ role })
        .eq("id", userId)
        .select("id, email, full_name, role, avatar_url, is_active, is_scrum_master, is_online, last_seen, created_at, updated_at")
        .maybeSingle();

    if (error) {
        console.error("PATCH /api/admin/users/[id]/role:", error.message);
        return NextResponse.json(
            { error: databaseErrorMessage(error, "Failed to change role") },
            { status: error.code === "P0001" ? 409 : 500 }
        );
    }
    if (!updated) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updated });
}
