import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// PATCH update milestone
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; milestoneId: string }> }
) {
    try {
        const { milestoneId } = await params;

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const updates: any = {
            ...body,
            updated_at: new Date().toISOString(),
        };

        // Set completed_at when status changes to completed
        if (body.status === "completed" && !body.completed_at) {
            updates.completed_at = new Date().toISOString();
        }

        const { data: milestone, error } = await supabase
            .from("milestones")
            .update(updates)
            .eq("id", milestoneId)
            .select()
            .single();

        if (error) {
            console.error("Error updating milestone:", error);
            return NextResponse.json({ error: "Failed to update milestone" }, { status: 500 });
        }

        return NextResponse.json(milestone);
    } catch (error) {
        console.error("Error in PATCH /api/projects/[id]/milestones/[milestoneId]:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE milestone
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; milestoneId: string }> }
) {
    try {
        const { milestoneId } = await params;

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { error } = await supabase.from("milestones").delete().eq("id", milestoneId);

        if (error) {
            console.error("Error deleting milestone:", error);
            return NextResponse.json({ error: "Failed to delete milestone" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in DELETE /api/projects/[id]/milestones/[milestoneId]:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
