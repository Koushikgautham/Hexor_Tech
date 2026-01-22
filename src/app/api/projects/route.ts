import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// GET all projects
export async function GET(request: NextRequest) {
    try {
        const supabase = await createServerClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get projects with task counts and progress
        const { data: projects, error } = await supabase
            .from("projects")
            .select(
                `
                *,
                tasks (
                    id,
                    status,
                    progress,
                    assigned_to,
                    assigned_user:profiles!tasks_assigned_to_fkey (
                        id,
                        full_name,
                        email,
                        avatar_url
                    )
                )
            `
            )
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching projects:", error);
            return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
        }

        // Calculate overall progress for each project
        const projectsWithProgress = projects.map((project) => {
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
        console.error("Error in GET /api/projects:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST create new project
export async function POST(request: NextRequest) {
    try {
        const supabase = await createServerClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, description, start_date, end_date, status = "current" } = body;

        if (!name) {
            return NextResponse.json({ error: "Project name is required" }, { status: 400 });
        }

        const { data: project, error } = await supabase
            .from("projects")
            .insert({
                name,
                description,
                start_date,
                end_date,
                status,
                created_by: user.id,
            })
            .select()
            .single();

        if (error) {
            console.error("Error creating project:", error);
            return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error("Error in POST /api/projects:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
