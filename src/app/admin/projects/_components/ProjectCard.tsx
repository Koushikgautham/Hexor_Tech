"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Calendar, MoreVertical, Edit, Trash2 } from "lucide-react";
import type { Project } from "@/types/Project";

// Project Card Component
export function ProjectCard({
    project,
    index,
    onView,
    onEdit,
    onDelete,
}: {
    project: Project;
    index: number;
    onView: () => void;
    onEdit: () => void;
    onDelete: (id: string) => void;
}) {
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all cursor-pointer group"
            onClick={onView}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{project.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                    </p>
                </div>
                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpen(!menuOpen);
                        }}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-card border border-border rounded-xl shadow-lg z-10 overflow-hidden">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit();
                                    setMenuOpen(false);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-secondary transition-colors"
                            >
                                <Edit className="w-4 h-4" />
                                Edit
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(project.id);
                                    setMenuOpen(false);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{project.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-primary"
                    />
                </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.start_date).toLocaleDateString()}</span>
                </div>
                <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium ${project.status === "current"
                        ? "bg-orange-500/10 text-orange-500"
                        : "bg-green-500/10 text-green-500"
                        }`}
                >
                    {project.status === "current" ? "In Progress" : "Completed"}
                </span>
            </div>
        </motion.div>
    );
}
