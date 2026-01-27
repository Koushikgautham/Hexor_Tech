import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// GET single project for authenticated client
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;
        const supabase = await createServerClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if user is a client
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (!profile || profile.role !== "client") {
            return NextResponse.json({ error: "Access denied" }, { status: 403 });
        }

        // Verify client has access to this project
        const { data: link } = await supabase
            .from("project_clients")
            .select("id")
            .eq("project_id", projectId)
            .eq("client_id", user.id)
            .single();

        if (!link) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        // Fetch project with related data
        const { data: project, error } = await supabase
            .from("projects")
            .select(
                `
                *,
                tasks (
                    id,
                    title,
                    status,
                    progress,
                    priority,
                    due_date
                ),
                milestones (
                    id,
                    title,
                    description,
                    due_date,
                    status,
                    completed_at
                ),
                project_documents (
                    id,
                    name,
                    description,
                    file_url,
                    file_name,
                    file_type,
                    created_at
                ),
                project_contacts (
                    id,
                    name,
                    role,
                    email,
                    phone,
                    is_primary
                ),
                project_invoices (
                    id,
                    name,
                    description,
                    file_url,
                    file_name,
                    amount,
                    status,
                    due_date,
                    created_at
                )
            `
            )
            .eq("id", projectId)
            .single();

        if (error) {
            console.error("Error fetching project:", error);
            return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
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
            taskCount: tasks.length,
            completedTasks: tasks.filter((t: any) => t.status === "completed").length,
        });
    } catch (error) {
        console.error("Error in GET /api/client/projects/[id]:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
