import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// GET notifications for current user
export async function GET(request: NextRequest) {
    try {
        const supabase = await createServerClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get unread count from query params
        const { searchParams } = new URL(request.url);
        const unreadOnly = searchParams.get("unread") === "true";

        let query = supabase
            .from("notifications")
            .select(`
                *,
                task:tasks (
                    id,
                    title,
                    status,
                    project_id
                ),
                project:projects (
                    id,
                    name
                ),
                creator:profiles!notifications_created_by_fkey (
                    id,
                    full_name,
                    email
                )
            `)
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(20);

        if (unreadOnly) {
            query = query.eq("is_read", false);
        }

        const { data: notifications, error } = await query;

        if (error) {
            console.error("Error fetching notifications:", error);
            return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
        }

        // Also get unread count
        const { count: unreadCount } = await supabase
            .from("notifications")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id)
            .eq("is_read", false);

        return NextResponse.json({
            notifications,
            unreadCount: unreadCount || 0,
        });
    } catch (error) {
        console.error("Error in GET /api/notifications:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PATCH to mark notifications as read
export async function PATCH(request: NextRequest) {
    try {
        const supabase = await createServerClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { notificationIds, markAllRead } = body;

        if (markAllRead) {
            // Mark all notifications as read for this user
            const { error } = await supabase
                .from("notifications")
                .update({ is_read: true })
                .eq("user_id", user.id)
                .eq("is_read", false);

            if (error) {
                console.error("Error marking all notifications read:", error);
                return NextResponse.json({ error: "Failed to update notifications" }, { status: 500 });
            }
        } else if (notificationIds && notificationIds.length > 0) {
            // Mark specific notifications as read
            const { error } = await supabase
                .from("notifications")
                .update({ is_read: true })
                .eq("user_id", user.id)
                .in("id", notificationIds);

            if (error) {
                console.error("Error marking notifications read:", error);
                return NextResponse.json({ error: "Failed to update notifications" }, { status: 500 });
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in PATCH /api/notifications:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
