"use client";

import { motion } from "framer-motion";
import { FolderKanban, Clock, Phone, Mail, CheckCircle2, Target, Star, CalendarDays } from "lucide-react";
import { CircularProgress } from "./CircularProgress";
import type { ClientProjectDetail as Project } from "@/types/ClientProject";
import type { ClientProjectState } from "../UseClientProject";

export function ProjectHeader({ project, primaryContact }: Pick<ClientProjectState, "primaryContact"> & { project: Project }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary/10 via-card to-card border border-border rounded-2xl p-6"
        >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <FolderKanban className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
                            <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium mt-1 ${
                                    project.status === "current"
                                        ? "bg-orange-500/10 text-orange-500"
                                        : "bg-green-500/10 text-green-500"
                                }`}
                            >
                                {project.status === "current" ? (
                                    <Clock className="w-3 h-3" />
                                ) : (
                                    <CheckCircle2 className="w-3 h-3" />
                                )}
                                {project.status === "current" ? "In Progress" : "Completed"}
                            </span>
                        </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{project.description}</p>

                    {/* Quick Info */}
                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <CalendarDays className="w-4 h-4" />
                            Started: {new Date(project.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </div>
                        {project.end_date && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Target className="w-4 h-4" />
                                Deadline: {new Date(project.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <CircularProgress progress={project.progress} />
                </div>
            </div>

            {/* Primary Contact Quick View */}
            {primaryContact && (
                <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center">
                            <Star className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Primary Contact</p>
                            <p className="font-medium text-foreground">{primaryContact.name} - {primaryContact.role}</p>
                        </div>
                        <div className="ml-auto flex gap-2">
                            {primaryContact.email && (
                                <a
                                    href={`mailto:${primaryContact.email}`}
                                    className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                                >
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                </a>
                            )}
                            {primaryContact.phone && (
                                <a
                                    href={`tel:${primaryContact.phone}`}
                                    className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                                >
                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
