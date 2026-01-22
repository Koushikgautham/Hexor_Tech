import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// PATCH update task
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; taskId: string }> }
) {
    try {
        const supabase = await createServerClient();
        const { taskId } = await params;

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const updates = {
            ...body,
            updated_at: new Date().toISOString(),
        };

        const { data: task, error } = await supabase
            .from("tasks")
            .update(updates)
            .eq("id", taskId)
            .select(
                `
                *,
                assigned_user:profiles!tasks_assigned_to_fkey (
                    id,
                    full_name,
                    email,
                    avatar_url
                )
            `
            )
            .single();

        if (error) {
            console.error("Error updating task:", error);
            return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
        }

        return NextResponse.json(task);
    } catch (error) {
        console.error("Error in PATCH /api/projects/[id]/tasks/[taskId]:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE task
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; taskId: string }> }
) {
    try {
        const supabase = await createServerClient();
        const { taskId } = await params;

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { error } = await supabase.from("tasks").delete().eq("id", taskId);

        if (error) {
            console.error("Error deleting task:", error);
            return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in DELETE /api/projects/[id]/tasks/[taskId]:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
