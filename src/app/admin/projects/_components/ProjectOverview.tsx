"use client";

import { FolderKanban, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types/Project";

// Project Overview Component (Simplified popup)
export function ProjectOverview({
    project,
    onClose,
}: {
    project: Project;
    onClose: () => void;
}) {
    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <FolderKanban className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">{project.name}</h2>
                        <span
                            className={`inline-block mt-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
                                project.status === "current"
                                    ? "bg-orange-500/10 text-orange-500"
                                    : "bg-green-500/10 text-green-500"
                            }`}
                        >
                            {project.status === "current" ? "In Progress" : "Completed"}
                        </span>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-6">{project.description}</p>

            {/* Dates Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                    <p className="font-medium text-foreground">
                        {new Date(project.start_date).toLocaleDateString()}
                    </p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-1">End Date</p>
                    <p className="font-medium text-foreground">
                        {project.end_date
                            ? new Date(project.end_date).toLocaleDateString()
                            : "Not set"}
                    </p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Overall Progress</span>
                    <span className="text-sm font-bold text-primary">
                        {project.progress || 0}%
                    </span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${project.progress || 0}%` }}
                    />
                </div>
                {project.taskCount !== undefined && (
                    <p className="text-sm text-muted-foreground mt-2">
                        {project.completedTasks}/{project.taskCount} tasks completed
                    </p>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-border">
                <button
                    onClick={onClose}
                    className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                >
                    Close
                </button>
                <Link href={`/admin/projects/${project.id}`} className="flex-1">
                    <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        View Project
                    </button>
                </Link>
            </div>
        </>
    );
}
