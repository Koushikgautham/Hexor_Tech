import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// GET all documents for a project
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

        const { data: documents, error } = await supabase
            .from("project_documents")
            .select(`
                *,
                uploader:profiles!project_documents_uploaded_by_fkey (
                    id,
                    full_name,
                    email
                )
            `)
            .eq("project_id", projectId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching documents:", error);
            return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
        }

        return NextResponse.json(documents);
    } catch (error) {
        console.error("Error in GET /api/projects/[id]/documents:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST upload a document
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

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json({ error: "File too large. Max size is 10MB" }, { status: 400 });
        }

        // Generate unique file path
        const fileExt = file.name.split(".").pop();
        const fileName = `${projectId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("project-documents")
            .upload(fileName, file, {
                contentType: file.type,
            });

        if (uploadError) {
            console.error("Error uploading file:", uploadError);
            return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
        }

        // Save document record
        const { data: document, error } = await supabase
            .from("project_documents")
            .insert({
                project_id: projectId,
                name: file.name,
                file_path: uploadData.path,
                file_type: file.type,
                file_size: file.size,
                uploaded_by: user.id,
            })
            .select()
            .single();

        if (error) {
            console.error("Error saving document record:", error);
            // Clean up uploaded file
            await supabase.storage.from("project-documents").remove([fileName]);
            return NextResponse.json({ error: "Failed to save document" }, { status: 500 });
        }

        return NextResponse.json(document);
    } catch (error) {
        console.error("Error in POST /api/projects/[id]/documents:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE a document
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

        const { searchParams } = new URL(request.url);
        const documentId = searchParams.get("documentId");

        if (!documentId) {
            return NextResponse.json({ error: "Document ID required" }, { status: 400 });
        }

        // Get document to find file path
        const { data: document } = await supabase
            .from("project_documents")
            .select("file_path")
            .eq("id", documentId)
            .eq("project_id", projectId)
            .single();

        if (document?.file_path) {
            // Delete from storage
            await supabase.storage.from("project-documents").remove([document.file_path]);
        }

        // Delete record
        const { error } = await supabase
            .from("project_documents")
            .delete()
            .eq("id", documentId)
            .eq("project_id", projectId);

        if (error) {
            console.error("Error deleting document:", error);
            return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in DELETE /api/projects/[id]/documents:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
