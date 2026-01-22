import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET all milestones for a project
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data: milestones, error } = await supabase
            .from("milestones")
            .select("*")
            .eq("project_id", projectId)
            .order("due_date", { ascending: true });

        if (error) {
            console.error("Error fetching milestones:", error);
            return NextResponse.json({ error: "Failed to fetch milestones" }, { status: 500 });
        }

        return NextResponse.json(milestones);
    } catch (error) {
        console.error("Error in GET /api/projects/[id]/milestones:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST create new milestone
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { title, description, due_date, status = "pending" } = body;

        if (!title) {
            return NextResponse.json({ error: "Milestone title is required" }, { status: 400 });
        }

        const { data: milestone, error } = await supabase
            .from("milestones")
            .insert({
                project_id: projectId,
                title,
                description,
                due_date,
                status,
            })
            .select()
            .single();

        if (error) {
            console.error("Error creating milestone:", error);
            return NextResponse.json({ error: "Failed to create milestone" }, { status: 500 });
        }

        return NextResponse.json(milestone);
    } catch (error) {
        console.error("Error in POST /api/projects/[id]/milestones:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
