"use client";

import { motion } from "framer-motion";
import { FolderKanban, Target, CalendarDays, Timer } from "lucide-react";
import type { Project } from "@/types/Project";
import { CircularProgress } from "./CircularProgress";
import type { ProjectDetailState } from "../UseAdminProjectDetail";

export function ProjectHero({ project, daysRemaining }: Pick<ProjectDetailState, "daysRemaining"> & { project: Project }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-card to-card border border-border rounded-3xl p-8"
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
                {/* Project Info */}
                <div className="flex-1 space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="p-4 bg-primary/10 rounded-2xl">
                            <FolderKanban className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
                                <span
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                                        project.status === "current"
                                            ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                                            : "bg-green-500/10 text-green-500 border border-green-500/20"
                                    }`}
                                >
                                    {project.status === "current" ? "In Progress" : "Completed"}
                                </span>
                            </div>
                            <p className="text-muted-foreground text-lg max-w-2xl">{project.description}</p>
                        </div>
                    </div>

                    {/* Quick Info Pills */}
                    <div className="flex flex-wrap gap-3 pt-2">
                        <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-xl">
                            <CalendarDays className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                                <span className="text-muted-foreground">Started:</span>{" "}
                                <span className="font-medium text-foreground">
                                    {new Date(project.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </span>
                            </span>
                        </div>
                        {project.end_date && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-xl">
                                <Target className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">
                                    <span className="text-muted-foreground">Deadline:</span>{" "}
                                    <span className="font-medium text-foreground">
                                        {new Date(project.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </span>
                                </span>
                            </div>
                        )}
                        {daysRemaining !== null && (
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                                daysRemaining < 0
                                    ? "bg-red-500/10 text-red-500"
                                    : daysRemaining <= 7
                                    ? "bg-orange-500/10 text-orange-500"
                                    : "bg-green-500/10 text-green-500"
                            }`}>
                                <Timer className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    {daysRemaining < 0
                                        ? `${Math.abs(daysRemaining)} days overdue`
                                        : daysRemaining === 0
                                        ? "Due today"
                                        : `${daysRemaining} days left`}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Circular Progress */}
                <div className="flex-shrink-0">
                    <CircularProgress progress={project.progress || 0} size={140} strokeWidth={10} />
                </div>
            </div>
        </motion.div>
    );
}
