"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    FolderKanban,
    Clock,
    CheckCircle2,
    Users,
    Calendar,
    MoreVertical,
    Edit,
    Trash2,
    X,
    Loader2,
    ListTodo,
    User,
    TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface Project {
    id: string;
    name: string;
    description: string;
    status: "current" | "finished";
    start_date: string;
    end_date: string | null;
    created_by: string;
    created_at: string;
    updated_at: string;
    tasks?: Task[];
    progress?: number;
}

interface Task {
    id: string;
    project_id: string;
    title: string;
    description: string;
    status: "todo" | "in_progress" | "completed";
    priority: "low" | "medium" | "high";
    assigned_to: string | null;
    assigned_user?: {
        full_name: string;
        email: string;
    };
    progress: number;
    due_date: string | null;
    created_at: string;
    updated_at: string;
}

export default function ProjectsPage() {
    const { profile } = useAuth();
    const [projects, setProjects] = React.useState<Project[]>([]);
    const [filter, setFilter] = React.useState<"all" | "current" | "finished">("all");
    const [showModal, setShowModal] = React.useState<"add-project" | "edit-project" | "view-project" | null>(null);
    const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    // Mock data for now - will connect to Supabase
    React.useEffect(() => {
        // Simulate loading projects
        const mockProjects: Project[] = [
            {
                id: "1",
                name: "Website Redesign",
                description: "Complete redesign of company website with new branding",
                status: "current",
                start_date: "2026-01-15",
                end_date: "2026-03-01",
                created_by: profile?.id || "",
                created_at: "2026-01-15T00:00:00Z",
                updated_at: "2026-01-15T00:00:00Z",
                progress: 45,
            },
            {
                id: "2",
                name: "Mobile App Development",
                description: "Build iOS and Android mobile applications",
                status: "current",
                start_date: "2026-01-01",
                end_date: "2026-04-30",
                created_by: profile?.id || "",
                created_at: "2026-01-01T00:00:00Z",
                updated_at: "2026-01-01T00:00:00Z",
                progress: 30,
            },
            {
                id: "3",
                name: "Marketing Campaign Q1",
                description: "Q1 2026 marketing campaign execution",
                status: "finished",
                start_date: "2025-12-01",
                end_date: "2026-01-15",
                created_by: profile?.id || "",
                created_at: "2025-12-01T00:00:00Z",
                updated_at: "2026-01-15T00:00:00Z",
                progress: 100,
            },
        ];
        setProjects(mockProjects);
    }, [profile]);

    const filteredProjects = React.useMemo(() => {
        if (filter === "all") return projects;
        return projects.filter((p) => p.status === filter);
    }, [projects, filter]);

    const stats = {
        total: projects.length,
        current: projects.filter((p) => p.status === "current").length,
        finished: projects.filter((p) => p.status === "finished").length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Projects</h1>
                    <p className="text-muted-foreground">
                        Manage projects and track team progress
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal("add-project")}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium"
                >
                    <Plus className="w-4 h-4" />
                    New Project
                </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card border border-border rounded-2xl p-6"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-xl">
                            <FolderKanban className="w-5 h-5 text-blue-500" />
                        </div>
                        <span className="text-sm text-muted-foreground">Total Projects</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                </motion.div>

                <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card border border-border rounded-2xl p-6"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-500/10 rounded-xl">
                            <Clock className="w-5 h-5 text-orange-500" />
                        </div>
                        <span className="text-sm text-muted-foreground">In Progress</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{stats.current}</p>
                </motion.div>

                <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card border border-border rounded-2xl p-6"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-500/10 rounded-xl">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                        <span className="text-sm text-muted-foreground">Completed</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{stats.finished}</p>
                </motion.div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                {(["all", "current", "finished"] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === status
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        onView={() => {
                            setSelectedProject(project);
                            setShowModal("view-project");
                        }}
                        onEdit={() => {
                            setSelectedProject(project);
                            setShowModal("edit-project");
                        }}
                        onDelete={(id) => {
                            setProjects((prev) => prev.filter((p) => p.id !== id));
                            toast.success("Project deleted");
                        }}
                    />
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                    <FolderKanban className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No projects found</p>
                </div>
            )}

            {/* Modals */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => {
                            setShowModal(null);
                            setSelectedProject(null);
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-xl"
                        >
                            {showModal === "add-project" && (
                                <AddProjectForm
                                    onClose={() => setShowModal(null)}
                                    onSuccess={(newProject) => {
                                        setProjects((prev) => [...prev, newProject]);
                                        setShowModal(null);
                                        toast.success("Project created!");
                                    }}
                                />
                            )}

                            {showModal === "view-project" && selectedProject && (
                                <ProjectDetails
                                    project={selectedProject}
                                    onClose={() => {
                                        setShowModal(null);
                                        setSelectedProject(null);
                                    }}
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Project Card Component
function ProjectCard({
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

// Add Project Form
function AddProjectForm({
    onClose,
    onSuccess,
}: {
    onClose: () => void;
    onSuccess: (project: Project) => void;
}) {
    const { profile } = useAuth();
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
            // In production, create via API
            const newProject: Project = {
                id: Date.now().toString(),
                ...formData,
                status: "current",
                created_by: profile?.id || "",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                progress: 0,
            };
            onSuccess(newProject);
        } catch (error) {
            toast.error("Failed to create project");
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

// Project Details Component
function ProjectDetails({
    project,
    onClose,
}: {
    project: Project;
    onClose: () => void;
}) {
    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <FolderKanban className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">{project.name}</h2>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-6">
                {/* Project Info */}
                <div className="grid grid-cols-2 gap-4">
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

                {/* Progress */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">Overall Progress</span>
                        <span className="text-sm font-bold text-primary">{project.progress}%</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                        />
                    </div>
                </div>

                {/* Tasks Section - Coming Soon */}
                <div className="border-t border-border pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">Tasks</h3>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                            <Plus className="w-4 h-4" />
                            Add Task
                        </button>
                    </div>
                    <div className="text-center py-8 text-muted-foreground">
                        <ListTodo className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No tasks yet. Add your first task!</p>
                    </div>
                </div>
            </div>
        </>
    );
}
