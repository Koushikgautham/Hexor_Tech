import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// GET single project
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const supabase = await createServerClient();
        const { id: projectId } = await params;

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data: project, error } = await supabase
            .from("projects")
            .select(
                `
                *,
                tasks (
                    *,
                    assigned_user:profiles!tasks_assigned_to_fkey (
                        id,
                        full_name,
                        email,
                        avatar_url
                    )
                )
            `
            )
            .eq("id", projectId)
            .single();

        if (error) {
            console.error("Error fetching project:", error);
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        // Calculate progress
        const tasks = project.tasks || [];
        const totalProgress =
            tasks.length > 0
                ? tasks.reduce((sum: number, task: any) => sum + (task.progress || 0), 0) /
                  tasks.length
                : 0;

        return NextResponse.json({
            ...project,
            progress: Math.round(totalProgress),
        });
    } catch (error) {
        console.error("Error in GET /api/projects/[id]:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PATCH update project
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const supabase = await createServerClient();
        const { id: projectId } = await params;

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

        const { data: project, error } = await supabase
            .from("projects")
            .update(updates)
            .eq("id", projectId)
            .select()
            .single();

        if (error) {
            console.error("Error updating project:", error);
            return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error("Error in PATCH /api/projects/[id]:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE project
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const supabase = await createServerClient();
        const { id: projectId } = await params;

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { error } = await supabase.from("projects").delete().eq("id", projectId);

        if (error) {
            console.error("Error deleting project:", error);
            return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in DELETE /api/projects/[id]:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
