import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// GET all projects for the authenticated client
export async function GET(request: NextRequest) {
    try {
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

        // Get projects linked to this client with task counts
        const { data: projectLinks, error: linksError } = await supabase
            .from("project_clients")
            .select("project_id")
            .eq("client_id", user.id);

        if (linksError) {
            console.error("Error fetching project links:", linksError);
            return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
        }

        if (!projectLinks || projectLinks.length === 0) {
            return NextResponse.json([]);
        }

        const projectIds = projectLinks.map((link) => link.project_id);

        // Fetch the actual projects with their tasks
        const { data: projects, error } = await supabase
            .from("projects")
            .select(
                `
                *,
                tasks (
                    id,
                    status,
                    progress
                )
            `
            )
            .in("id", projectIds)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching projects:", error);
            return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
        }

        // Calculate overall progress for each project
        const projectsWithProgress = (projects || []).map((project) => {
            const tasks = project.tasks || [];
            const totalProgress =
                tasks.length > 0
                    ? tasks.reduce((sum: number, task: any) => sum + (task.progress || 0), 0) /
                      tasks.length
                    : 0;

            return {
                ...project,
                progress: Math.round(totalProgress),
                taskCount: tasks.length,
                completedTasks: tasks.filter((t: any) => t.status === "completed").length,
            };
        });

        return NextResponse.json(projectsWithProgress);
    } catch (error) {
        console.error("Error in GET /api/client/projects:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
