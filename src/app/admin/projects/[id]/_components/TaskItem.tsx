"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, Edit, Trash2, User, Square, CheckSquare } from "lucide-react";
import type { Task, TeamUser } from "@/types/Project";
import { TaskForm } from "./TaskForm";

// Task Item Component
export function TaskItem({
    task,
    users,
    onUpdate,
    onDelete,
}: {
    task: Task;
    users: TeamUser[];
    onUpdate: (updates: any) => void;
    onDelete: () => void;
}) {
    const [isEditing, setIsEditing] = React.useState(false);

    const priorityConfig = {
        low: { color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
        medium: { color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
        high: { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
    };

    const statusConfig = {
        todo: { icon: Square, color: "text-muted-foreground", label: "To Do" },
        in_progress: { icon: Clock, color: "text-orange-500", label: "In Progress" },
        completed: { icon: CheckSquare, color: "text-green-500", label: "Completed" },
    };

    const StatusIcon = statusConfig[task.status].icon;
    const priority = priorityConfig[task.priority];

    return (
        <div className="bg-secondary/30 border border-border rounded-xl p-5 hover:border-primary/20 transition-all">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <StatusIcon className={`w-5 h-5 ${statusConfig[task.status].color} flex-shrink-0`} />
                        <h4 className="font-semibold text-foreground truncate">{task.title}</h4>
                        <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${priority.bg} ${priority.color} ${priority.border}`}
                        >
                            {task.priority}
                        </span>
                    </div>
                    {task.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm flex-wrap">
                        {task.assigned_user && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                    <User className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <span>{task.assigned_user.full_name}</span>
                            </div>
                        )}
                        {task.due_date && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(task.due_date).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        title="Edit task"
                    >
                        <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete task"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{task.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${task.progress}%` }}
                        className="h-full bg-primary rounded-full"
                    />
                </div>
            </div>

            {isEditing && (
                <div className="mt-4 pt-4 border-t border-border">
                    <TaskForm
                        task={task}
                        users={users}
                        onSubmit={async (data) => {
                            await onUpdate(data);
                            setIsEditing(false);
                        }}
                        onCancel={() => setIsEditing(false)}
                    />
                </div>
            )}

            {/* Quick Status Buttons */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <button
                    onClick={() => onUpdate({ status: "todo", progress: 0 })}
                    disabled={task.status === "todo"}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        task.status === "todo"
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-transparent"
                    }`}
                >
                    To Do
                </button>
                <button
                    onClick={() => onUpdate({ status: "in_progress", progress: 50 })}
                    disabled={task.status === "in_progress"}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        task.status === "in_progress"
                            ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-transparent"
                    }`}
                >
                    In Progress
                </button>
                <button
                    onClick={() => onUpdate({ status: "completed", progress: 100 })}
                    disabled={task.status === "completed"}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        task.status === "completed"
                            ? "bg-green-500/10 text-green-500 border border-green-500/20"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-transparent"
                    }`}
                >
                    Complete
                </button>
            </div>
        </div>
    );
}
