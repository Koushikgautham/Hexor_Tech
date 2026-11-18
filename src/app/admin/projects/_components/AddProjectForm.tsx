"use client";

import * as React from "react";
import { Plus, X, Loader2 } from "lucide-react";

// Add Project Form
export function AddProjectForm({
    onClose,
    onSuccess,
}: {
    onClose: () => void;
    onSuccess: (data: any) => Promise<void>;
}) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: "",
        description: "",
        start_date: new Date().toISOString().split("T")[0],
        end_date: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onSuccess(formData);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <Plus className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">New Project</h2>
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
                        onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
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
                            onChange={(e) => setFormData((p) => ({ ...p, start_date: e.target.value }))}
                            className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-foreground">End Date</label>
                        <input
                            type="date"
                            value={formData.end_date}
                            onChange={(e) => setFormData((p) => ({ ...p, end_date: e.target.value }))}
                            className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                    </div>
                </div>

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
                                Creating...
                            </>
                        ) : (
                            "Create Project"
                        )}
                    </button>
                </div>
            </form>
        </>
    );
}
