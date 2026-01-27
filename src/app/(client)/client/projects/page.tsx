"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    FolderKanban,
    Clock,
    CheckCircle2,
    ArrowRight,
    Calendar,
    ListTodo,
} from "lucide-react";

interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
    start_date: string;
    end_date: string | null;
    progress: number;
    taskCount: number;
    completedTasks: number;
}

export default function ClientProjects() {
    const [projects, setProjects] = React.useState<Project[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [filter, setFilter] = React.useState<"all" | "current" | "finished">("all");

    React.useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/client/projects");
                if (response.ok) {
                    setProjects(await response.json());
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = React.useMemo(() => {
        if (filter === "all") return projects;
        return projects.filter(p => p.status === filter);
    }, [projects, filter]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">My Projects</h1>
                    <p className="text-muted-foreground">View and track your assigned projects</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex bg-secondary/50 rounded-xl p-1">
                    {[
                        { id: "all", label: "All" },
                        { id: "current", label: "Active" },
                        { id: "finished", label: "Completed" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                filter === tab.id
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link href={`/client/projects/${project.id}`}>
                                <div className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-lg transition-all h-full">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 bg-primary/10 rounded-xl">
                                            <FolderKanban className="w-5 h-5 text-primary" />
                                        </div>
                                        <span
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
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

                                    {/* Content */}
                                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{project.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                        {project.description || "No description provided"}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                        <div className="flex items-center gap-1">
                                            <ListTodo className="w-4 h-4" />
                                            <span>{project.completedTasks}/{project.taskCount} tasks</span>
                                        </div>
                                        {project.end_date && (
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(project.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Progress Bar */}
                                    <div>
                                        <div className="flex items-center justify-between text-xs mb-1.5">
                                            <span className="text-muted-foreground">Progress</span>
                                            <span className="font-medium text-foreground">{project.progress}%</span>
                                        </div>
                                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${project.progress}%` }}
                                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                                className="h-full bg-primary rounded-full"
                                            />
                                        </div>
                                    </div>

                                    {/* View Link */}
                                    <div className="flex items-center justify-end mt-4 pt-4 border-t border-border">
                                        <span className="flex items-center gap-1 text-sm text-primary font-medium">
                                            View Details
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FolderKanban className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">No projects found</h2>
                    <p className="text-muted-foreground">
                        {filter !== "all"
                            ? `You don't have any ${filter === "current" ? "active" : "completed"} projects.`
                            : "You haven't been assigned to any projects yet."}
                    </p>
                </div>
            )}
        </div>
    );
}
