// Project Form Component for Create/Edit
import * as React from "react";
import { motion } from "framer-motion";
import { Plus, Edit, X, Loader2 } from "lucide-react";

interface ProjectFormProps {
    mode: "create" | "edit";
    project?: any;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
}

export function ProjectForm({ mode, project, onClose, onSubmit }: ProjectFormProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: project?.name || "",
        description: project?.description || "",
        start_date: project?.start_date || new Date().toISOString().split("T")[0],
        end_date: project?.end_date || "",
        status: project?.status || "current",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await onSubmit(formData);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        {mode === "create" ? (
                            <Plus className="w-5 h-5 text-primary" />
                        ) : (
                            <Edit className="w-5 h-5 text-primary" />
                        )}
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">
                        {mode === "create" ? "New Project" : "Edit Project"}
                    </h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-foreground">Project Name</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="Website Redesign"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-foreground">Description</label>
                    <textarea
                        required
                        rows={3}
                        value={formData.description}
                        onChange={(e) =>
                            setFormData((p) => ({ ...p, description: e.target.value }))
                        }
                        className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                        placeholder="Brief description of the project..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-foreground">Start Date</label>
                        <input
                            type="date"
                            required
                            value={formData.start_date}
                            onChange={(e) =>
                                setFormData((p) => ({ ...p, start_date: e.target.value }))
                            }
                            className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-foreground">End Date</label>
                        <input
                            type="date"
                            value={formData.end_date}
                            onChange={(e) =>
                                setFormData((p) => ({ ...p, end_date: e.target.value }))
                            }
                            className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                    </div>
                </div>

                {mode === "edit" && (
                    <div>
                        <label className="text-sm font-medium text-foreground">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData((p) => ({
                                    ...p,
                                    status: e.target.value as "current" | "finished",
                                }))
                            }
                            className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        >
                            <option value="current">In Progress</option>
                            <option value="finished">Completed</option>
                        </select>
                    </div>
                )}

                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                {mode === "create" ? "Creating..." : "Saving..."}
                            </>
                        ) : mode === "create" ? (
                            "Create Project"
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>
            </form>
        </>
    );
}
