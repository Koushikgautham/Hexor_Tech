"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileSpreadsheet,
    Plus,
    Trash2,
    ExternalLink,
    Loader2,
    X,
    Maximize2,
    Link,
} from "lucide-react";
import { toast } from "sonner";

interface Sheet {
    id: string;
    name: string;
    sheet_url: string;
    description: string | null;
    created_at: string;
    added_by_user?: {
        id: string;
        full_name: string;
    };
}

interface ProjectSheetsProps {
    projectId: string;
}

export function ProjectSheets({ projectId }: ProjectSheetsProps) {
    const [sheets, setSheets] = React.useState<Sheet[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [showAddForm, setShowAddForm] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [previewSheet, setPreviewSheet] = React.useState<Sheet | null>(null);
    const [formData, setFormData] = React.useState({
        name: "",
        sheet_url: "",
        description: "",
    });

    // Fetch sheets
    const fetchSheets = React.useCallback(async () => {
        try {
            const response = await fetch(`/api/projects/${projectId}/sheets`);
            if (response.ok) {
                const data = await response.json();
                setSheets(data);
            }
        } catch (error) {
            console.error("Error fetching sheets:", error);
        } finally {
            setIsLoading(false);
        }
    }, [projectId]);

    React.useEffect(() => {
        fetchSheets();
    }, [fetchSheets]);

    // Convert Google Sheets URL to embed URL
    const getEmbedUrl = (url: string) => {
        // Extract the spreadsheet ID
        const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (match) {
            const spreadsheetId = match[1];
            return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/htmlembed?widget=true`;
        }
        return url;
    };

    // Handle add sheet
    const handleAddSheet = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/projects/${projectId}/sheets`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newSheet = await response.json();
                setSheets((prev) => [newSheet, ...prev]);
                setFormData({ name: "", sheet_url: "", description: "" });
                setShowAddForm(false);
                toast.success("Google Sheet linked successfully");
            } else {
                const error = await response.json();
                toast.error(error.error || "Failed to add sheet");
            }
        } catch (error) {
            toast.error("Error adding sheet");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle delete
    const handleDelete = async (sheetId: string) => {
        if (!confirm("Are you sure you want to remove this sheet link?")) return;

        try {
            const response = await fetch(
                `/api/projects/${projectId}/sheets?sheetId=${sheetId}`,
                { method: "DELETE" }
            );

            if (response.ok) {
                setSheets((prev) => prev.filter((s) => s.id !== sheetId));
                toast.success("Sheet link removed");
            } else {
                toast.error("Failed to remove sheet");
            }
        } catch (error) {
            toast.error("Error removing sheet");
        }
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
            {/* Add Button */}
            <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 hover:bg-green-500/20 rounded-xl font-medium transition-colors"
            >
                <Plus className="w-4 h-4" />
                Link Google Sheet
            </button>

            {/* Add Form */}
            <AnimatePresence>
                {showAddForm && (
                    <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handleAddSheet}
                        className="bg-secondary/30 rounded-xl p-4 space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-foreground">
                                Link a Google Sheet
                            </h4>
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="p-1 hover:bg-secondary rounded-lg"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div>
                            <label className="text-xs text-muted-foreground">Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData((p) => ({ ...p, name: e.target.value }))
                                }
                                placeholder="Q1 Budget Tracker"
                                className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-muted-foreground">
                                Google Sheets URL
                            </label>
                            <input
                                type="url"
                                required
                                value={formData.sheet_url}
                                onChange={(e) =>
                                    setFormData((p) => ({ ...p, sheet_url: e.target.value }))
                                }
                                placeholder="https://docs.google.com/spreadsheets/d/..."
                                className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-muted-foreground">
                                Description (optional)
                            </label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData((p) => ({ ...p, description: e.target.value }))
                                }
                                placeholder="Brief description..."
                                className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="flex-1 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <Link className="w-4 h-4" />
                                        Link Sheet
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {/* Sheets List */}
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">
                    Linked Sheets ({sheets.length})
                </h4>

                {sheets.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                        No Google Sheets linked yet
                    </p>
                ) : (
                    <div className="space-y-2">
                        {sheets.map((sheet) => (
                            <motion.div
                                key={sheet.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-secondary/30 rounded-xl overflow-hidden"
                            >
                                <div className="flex items-center gap-3 p-3">
                                    <FileSpreadsheet className="w-5 h-5 text-green-500" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">
                                            {sheet.name}
                                        </p>
                                        {sheet.description && (
                                            <p className="text-xs text-muted-foreground truncate">
                                                {sheet.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => setPreviewSheet(sheet)}
                                            className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                            title="Preview"
                                        >
                                            <Maximize2 className="w-4 h-4 text-muted-foreground" />
                                        </button>
                                        <button
                                            onClick={() => window.open(sheet.sheet_url, "_blank")}
                                            className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                            title="Open in new tab"
                                        >
                                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(sheet.id)}
                                            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                                            title="Remove"
                                        >
                                            <Trash2 className="w-4 h-4 text-destructive" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Preview Modal */}
            <AnimatePresence>
                {previewSheet && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4"
                        onClick={() => setPreviewSheet(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-card border border-border rounded-2xl w-full max-w-5xl h-[80vh] overflow-hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                                <div className="flex items-center gap-2">
                                    <FileSpreadsheet className="w-5 h-5 text-green-500" />
                                    <span className="font-medium text-foreground">
                                        {previewSheet.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => window.open(previewSheet.sheet_url, "_blank")}
                                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Open in Google Sheets
                                    </button>
                                    <button
                                        onClick={() => setPreviewSheet(null)}
                                        className="p-2 hover:bg-secondary rounded-lg"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 bg-white">
                                <iframe
                                    src={getEmbedUrl(previewSheet.sheet_url)}
                                    className="w-full h-full border-0"
                                    title={previewSheet.name}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
