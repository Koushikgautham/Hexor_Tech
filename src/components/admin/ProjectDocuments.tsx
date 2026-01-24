"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload,
    FileText,
    Image,
    File,
    FileSpreadsheet,
    Trash2,
    Download,
    Loader2,
    X,
    Plus,
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

interface Document {
    id: string;
    name: string;
    file_path: string;
    file_type: string;
    file_size: number;
    created_at: string;
    uploader?: {
        id: string;
        full_name: string;
    };
}

interface ProjectDocumentsProps {
    projectId: string;
}

const supabase = createClient();

export function ProjectDocuments({ projectId }: ProjectDocumentsProps) {
    const [documents, setDocuments] = React.useState<Document[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isUploading, setIsUploading] = React.useState(false);
    const [dragActive, setDragActive] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Fetch documents
    const fetchDocuments = React.useCallback(async () => {
        try {
            const response = await fetch(`/api/projects/${projectId}/documents`);
            if (response.ok) {
                const data = await response.json();
                setDocuments(data);
            }
        } catch (error) {
            console.error("Error fetching documents:", error);
        } finally {
            setIsLoading(false);
        }
    }, [projectId]);

    React.useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    // Get file icon based on type
    const getFileIcon = (fileType: string) => {
        if (fileType.includes("image")) return <Image className="w-5 h-5 text-purple-500" />;
        if (fileType.includes("pdf")) return <FileText className="w-5 h-5 text-red-500" />;
        if (fileType.includes("spreadsheet") || fileType.includes("excel"))
            return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
        return <File className="w-5 h-5 text-blue-500" />;
    };

    // Format file size
    const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    // Handle file upload
    const handleUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const file = files[0];

        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            toast.error("File too large. Max size is 10MB");
            setIsUploading(false);
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`/api/projects/${projectId}/documents`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const newDoc = await response.json();
                setDocuments((prev) => [newDoc, ...prev]);
                toast.success("Document uploaded successfully");
            } else {
                const error = await response.json();
                toast.error(error.error || "Failed to upload document");
            }
        } catch (error) {
            toast.error("Error uploading document");
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    // Handle delete
    const handleDelete = async (documentId: string) => {
        if (!confirm("Are you sure you want to delete this document?")) return;

        try {
            const response = await fetch(
                `/api/projects/${projectId}/documents?documentId=${documentId}`,
                { method: "DELETE" }
            );

            if (response.ok) {
                setDocuments((prev) => prev.filter((d) => d.id !== documentId));
                toast.success("Document deleted");
            } else {
                toast.error("Failed to delete document");
            }
        } catch (error) {
            toast.error("Error deleting document");
        }
    };

    // Handle download
    const handleDownload = async (doc: Document) => {
        try {
            const { data } = supabase.storage
                .from("project-documents")
                .getPublicUrl(doc.file_path);

            window.open(data.publicUrl, "_blank");
        } catch (error) {
            toast.error("Error downloading file");
        }
    };

    // Drag handlers
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        handleUpload(e.dataTransfer.files);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dragActive
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-secondary/30"
                    }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleUpload(e.target.files)}
                    disabled={isUploading}
                />

                {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Uploading...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <Upload className="w-8 h-8 text-muted-foreground" />
                        <p className="text-sm text-foreground font-medium">
                            Drop files here or click to upload
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Max file size: 10MB
                        </p>
                    </div>
                )}
            </div>

            {/* Documents List */}
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">
                    Uploaded Documents ({documents.length})
                </h4>

                {documents.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                        No documents uploaded yet
                    </p>
                ) : (
                    <div className="space-y-2">
                        {documents.map((doc) => (
                            <motion.div
                                key={doc.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
                            >
                                {getFileIcon(doc.file_type)}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">
                                        {doc.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatSize(doc.file_size)} • {new Date(doc.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleDownload(doc)}
                                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                        title="Download"
                                    >
                                        <Download className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doc.id)}
                                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4 text-destructive" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
