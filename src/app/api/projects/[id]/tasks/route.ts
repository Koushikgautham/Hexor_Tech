import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// GET all tasks for a project
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

        const { data: tasks, error } = await supabase
            .from("tasks")
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
            .eq("project_id", projectId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching tasks:", error);
            return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
        }

        return NextResponse.json(tasks);
    } catch (error) {
        console.error("Error in GET /api/projects/[id]/tasks:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST create new task
export async function POST(
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
        const {
            title,
            description,
            status = "todo",
            priority = "medium",
            assigned_to,
            due_date,
            progress = 0,
        } = body;

        if (!title) {
            return NextResponse.json({ error: "Task title is required" }, { status: 400 });
        }

        const { data: task, error } = await supabase
            .from("tasks")
            .insert({
                project_id: projectId,
                title,
                description,
                status,
                priority,
                assigned_to,
                due_date,
                progress,
            })
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
            console.error("Error creating task:", error);
            return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
        }

        return NextResponse.json(task);
    } catch (error) {
        console.error("Error in POST /api/projects/[id]/tasks:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
