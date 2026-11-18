"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { Task, TeamUser } from "@/types/Project";

// Task Form Component
export function TaskForm({
    task,
    users,
    onSubmit,
    onCancel,
}: {
    task?: Task;
    users: TeamUser[];
    onSubmit: (data: any) => Promise<void>;
    onCancel: () => void;
}) {
    const [formData, setFormData] = React.useState({
        title: task?.title || "",
        description: task?.description || "",
        status: task?.status || "todo",
        priority: task?.priority || "medium",
        assigned_to: task?.assigned_to || "",
        due_date: task?.due_date || "",
        progress: task?.progress || 0,
    });
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-secondary/30 border border-border rounded-xl p-5 space-y-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Task Title</label>
                    <input
                        type="text"
                        required
                        placeholder="Enter task title"
                        value={formData.title}
                        onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
                    <textarea
                        placeholder="Add a description (optional)"
                        rows={3}
                        value={formData.description}
                        onChange={(e) =>
                            setFormData((p) => ({ ...p, description: e.target.value }))
                        }
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) =>
                            setFormData((p) => ({
                                ...p,
                                status: e.target.value as "todo" | "in_progress" | "completed",
                            }))
                        }
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Priority</label>
                    <select
                        value={formData.priority}
                        onChange={(e) =>
                            setFormData((p) => ({
                                ...p,
                                priority: e.target.value as "low" | "medium" | "high",
                            }))
                        }
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Assign To</label>
                    <select
                        value={formData.assigned_to}
                        onChange={(e) => setFormData((p) => ({ ...p, assigned_to: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                        <option value="">Unassigned</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.full_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Due Date</label>
                    <input
                        type="date"
                        value={formData.due_date}
                        onChange={(e) => setFormData((p) => ({ ...p, due_date: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Progress: {formData.progress}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.progress}
                        onChange={(e) =>
                            setFormData((p) => ({ ...p, progress: parseInt(e.target.value) }))
                        }
                        className="w-full accent-primary"
                    />
                </div>
            </div>
            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {task ? "Updating..." : "Creating..."}
                        </>
                    ) : (
                        task ? "Update Task" : "Create Task"
                    )}
                </button>
            </div>
        </motion.form>
    );
}
