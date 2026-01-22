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
    Target,
    CheckSquare,
    Square,
    AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface Milestone {
    id: string;
    project_id: string;
    title: string;
    description: string | null;
    due_date: string | null;
    status: "pending" | "completed";
    completed_at: string | null;
    created_at: string;
    updated_at: string;
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
        id: string;
        full_name: string;
        email: string;
        avatar_url?: string;
    };
    progress: number;
    due_date: string | null;
    created_at: string;
    updated_at: string;
}

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
    milestones?: Milestone[];
    progress?: number;
    taskCount?: number;
    completedTasks?: number;
}

interface User {
    id: string;
    full_name: string;
    email: string;
    avatar_url?: string;
}

export default function ProjectsPage() {
    const { profile } = useAuth();
    const [projects, setProjects] = React.useState<Project[]>([]);
    const [adminUsers, setAdminUsers] = React.useState<User[]>([]);
    const [filter, setFilter] = React.useState<"all" | "current" | "finished">("all");
    const [showModal, setShowModal] = React.useState<"add-project" | "edit-project" | "view-project" | null>(null);
    const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    // Fetch projects from API
    const fetchProjects = async () => {
        try {
            const response = await fetch("/api/projects");
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            } else {
                toast.error("Failed to fetch projects");
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
            toast.error("Error loading projects");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch admin users for task assignment
    const fetchAdminUsers = async () => {
        try {
            const response = await fetch("/api/admin/team");
            if (response.ok) {
                const data = await response.json();
                setAdminUsers(data);
            } else {
                console.error("Failed to fetch admin users");
            }
        } catch (error) {
            console.error("Error fetching admin users:", error);
        }
    };

    React.useEffect(() => {
        fetchProjects();
        fetchAdminUsers();
    }, []);

    const filteredProjects = React.useMemo(() => {
        if (filter === "all") return projects;
        return projects.filter((p) => p.status === filter);
    }, [projects, filter]);

    const stats = {
        total: projects.length,
        current: projects.filter((p) => p.status === "current").length,
        finished: projects.filter((p) => p.status === "finished").length,
    };

    const handleCreateProject = async (projectData: any) => {
        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData),
            });

            if (response.ok) {
                await fetchProjects();
                toast.success("Project created successfully!");
                return true;
            } else {
                toast.error("Failed to create project");
                return false;
            }
        } catch (error) {
            toast.error("Error creating project");
            return false;
        }
    };

    const handleUpdateProject = async (projectId: string, updates: any) => {
        try {
            const response = await fetch(`/api/projects/${projectId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
            });

            if (response.ok) {
                await fetchProjects();
                toast.success("Project updated!");
                return true;
            } else {
                toast.error("Failed to update project");
                return false;
            }
        } catch (error) {
            toast.error("Error updating project");
            return false;
        }
    };

    const handleDeleteProject = async (projectId: string) => {
        if (!confirm("Are you sure? This will delete all tasks and milestones.")) {
            return;
        }

        try {
            const response = await fetch(`/api/projects/${projectId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setProjects((prev) => prev.filter((p) => p.id !== projectId));
                toast.success("Project deleted");
            } else {
                toast.error("Failed to delete project");
            }
        } catch (error) {
            toast.error("Error deleting project");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

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
                        onDelete={handleDeleteProject}
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
                            className="bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 shadow-xl my-8"
                        >
                            {showModal === "add-project" && (
                                <AddProjectForm
                                    onClose={() => setShowModal(null)}
                                    onSuccess={async (data) => {
                                        const success = await handleCreateProject(data);
                                        if (success) setShowModal(null);
                                    }}
                                />
                            )}

                            {showModal === "edit-project" && selectedProject && (
                                <EditProjectForm
                                    project={selectedProject}
                                    onClose={() => {
                                        setShowModal(null);
                                        setSelectedProject(null);
                                    }}
                                    onSuccess={async (data) => {
                                        const success = await handleUpdateProject(selectedProject.id, data);
                                        if (success) {
                                            setShowModal(null);
                                            setSelectedProject(null);
                                        }
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
                                    onRefresh={fetchProjects}
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

// Edit Project Form
function EditProjectForm({
    project,
    onClose,
    onSuccess,
}: {
    project: Project;
    onClose: () => void;
    onSuccess: (data: any) => Promise<void>;
}) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: project.name,
        description: project.description,
        start_date: project.start_date,
        end_date: project.end_date || "",
        status: project.status,
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
                        <Edit className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">Edit Project</h2>
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

                <div>
                    <label className="text-sm font-medium text-foreground">Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value as "current" | "finished" }))}
                        className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                        <option value="current">In Progress</option>
                        <option value="finished">Completed</option>
                    </select>
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
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
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
    onRefresh,
}: {
    project: Project;
    onClose: () => void;
    onRefresh: () => void;
}) {
    const [activeTab, setActiveTab] = React.useState<"tasks" | "milestones">("tasks");
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [milestones, setMilestones] = React.useState<any[]>([]);
    const [users, setUsers] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [showTaskForm, setShowTaskForm] = React.useState(false);
    const [showMilestoneForm, setShowMilestoneForm] = React.useState(false);
    const [editingTask, setEditingTask] = React.useState<Task | null>(null);

    // Fetch project details with tasks
    const fetchDetails = async () => {
        setLoading(true);
        try {
            const [projectRes, usersRes] = await Promise.all([
                fetch(`/api/projects/${project.id}`),
                fetch("/api/admin/team"),
            ]);

            if (projectRes.ok) {
                const projectData = await projectRes.json();
                setTasks(projectData.tasks || []);
            }

            if (usersRes.ok) {
                const usersData = await usersRes.json();
                setUsers(usersData);
            }
        } catch (error) {
            console.error("Error fetching details:", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchDetails();
    }, [project.id]);

    const handleCreateTask = async (taskData: any) => {
        try {
            const response = await fetch(`/api/projects/${project.id}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                await fetchDetails();
                onRefresh();
                toast.success("Task created!");
                setShowTaskForm(false);
            } else {
                toast.error("Failed to create task");
            }
        } catch (error) {
            toast.error("Error creating task");
        }
    };

    const handleUpdateTask = async (taskId: string, updates: any) => {
        try {
            const response = await fetch(`/api/projects/${project.id}/tasks/${taskId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
            });

            if (response.ok) {
                await fetchDetails();
                onRefresh();
                toast.success("Task updated!");
                setEditingTask(null);
            } else {
                toast.error("Failed to update task");
            }
        } catch (error) {
            toast.error("Error updating task");
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        if (!confirm("Delete this task?")) return;

        try {
            const response = await fetch(`/api/projects/${project.id}/tasks/${taskId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                await fetchDetails();
                onRefresh();
                toast.success("Task deleted!");
            } else {
                toast.error("Failed to delete task");
            }
        } catch (error) {
            toast.error("Error deleting task");
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <FolderKanban className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">{project.name}</h2>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                            {project.description}
                        </p>
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

                {/* Tabs */}
                <div className="border-t border-border pt-6">
                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={() => setActiveTab("tasks")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeTab === "tasks"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                        >
                            <ListTodo className="w-4 h-4 inline mr-2" />
                            Tasks ({tasks.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("milestones")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeTab === "milestones"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                        >
                            <Target className="w-4 h-4 inline mr-2" />
                            Milestones ({milestones.length})
                        </button>
                    </div>

                    {/* Tasks Tab */}
                    {activeTab === "tasks" && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-foreground">Project Tasks</h3>
                                <button
                                    onClick={() => setShowTaskForm(true)}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Task
                                </button>
                            </div>

                            {showTaskForm && (
                                <TaskForm
                                    users={users}
                                    onSubmit={handleCreateTask}
                                    onCancel={() => setShowTaskForm(false)}
                                />
                            )}

                            {loading ? (
                                <div className="text-center py-8">
                                    <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
                                </div>
                            ) : tasks.length > 0 ? (
                                <div className="space-y-3">
                                    {tasks.map((task) => (
                                        <TaskItem
                                            key={task.id}
                                            task={task}
                                            users={users}
                                            onUpdate={(updates) => handleUpdateTask(task.id, updates)}
                                            onDelete={() => handleDeleteTask(task.id)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <ListTodo className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No tasks yet. Add your first task!</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Milestones Tab */}
                    {activeTab === "milestones" && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-foreground">Project Milestones</h3>
                                <button
                                    onClick={() => setShowMilestoneForm(true)}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Milestone
                                </button>
                            </div>

                            <div className="text-center py-8 text-muted-foreground">
                                <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Milestone tracking coming soon!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

// Task Form Component
function TaskForm({
    task,
    users,
    onSubmit,
    onCancel,
}: {
    task?: Task;
    users: any[];
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
        <form onSubmit={handleSubmit} className="bg-secondary/30 rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                    <input
                        type="text"
                        required
                        placeholder="Task title"
                        value={formData.title}
                        onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
                <div className="col-span-2">
                    <textarea
                        placeholder="Description (optional)"
                        rows={2}
                        value={formData.description}
                        onChange={(e) =>
                            setFormData((p) => ({ ...p, description: e.target.value }))
                        }
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                </div>
                <select
                    value={formData.status}
                    onChange={(e) =>
                        setFormData((p) => ({
                            ...p,
                            status: e.target.value as "todo" | "in_progress" | "completed",
                        }))
                    }
                    className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <select
                    value={formData.priority}
                    onChange={(e) =>
                        setFormData((p) => ({
                            ...p,
                            priority: e.target.value as "low" | "medium" | "high",
                        }))
                    }
                    className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
                <select
                    value={formData.assigned_to}
                    onChange={(e) => setFormData((p) => ({ ...p, assigned_to: e.target.value }))}
                    className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                    <option value="">Unassigned</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.full_name}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData((p) => ({ ...p, due_date: e.target.value }))}
                    className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Due date"
                />
                <div className="col-span-2">
                    <label className="text-xs text-muted-foreground mb-1 block">
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
                        className="w-full"
                    />
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-secondary/50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : task ? "Update" : "Create"}
                </button>
            </div>
        </form>
    );
}

// Task Item Component
function TaskItem({
    task,
    users,
    onUpdate,
    onDelete,
}: {
    task: Task;
    users: any[];
    onUpdate: (updates: any) => void;
    onDelete: () => void;
}) {
    const [isEditing, setIsEditing] = React.useState(false);

    const priorityColors = {
        low: "text-blue-500 bg-blue-500/10",
        medium: "text-orange-500 bg-orange-500/10",
        high: "text-red-500 bg-red-500/10",
    };

    const statusIcons = {
        todo: Square,
        in_progress: Clock,
        completed: CheckSquare,
    };

    const StatusIcon = statusIcons[task.status];

    return (
        <div className="bg-secondary/30 rounded-xl p-4 space-y-3">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <StatusIcon className="w-4 h-4 text-muted-foreground" />
                        <h4 className="font-medium text-foreground">{task.title}</h4>
                        <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                                priorityColors[task.priority]
                            }`}
                        >
                            {task.priority}
                        </span>
                    </div>
                    {task.description && (
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                    )}
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
                    >
                        <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-1.5 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {task.assigned_user && (
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{task.assigned_user.full_name}</span>
                    </div>
                )}
                {task.due_date && (
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(task.due_date).toLocaleDateString()}</span>
                    </div>
                )}
            </div>

            <div>
                <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{task.progress}%</span>
                </div>
                <div className="h-1.5 bg-background rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${task.progress}%` }}
                    />
                </div>
            </div>

            {isEditing && (
                <TaskForm
                    task={task}
                    users={users}
                    onSubmit={async (data) => {
                        await onUpdate(data);
                        setIsEditing(false);
                    }}
                    onCancel={() => setIsEditing(false)}
                />
            )}

            <div className="flex gap-2">
                <button
                    onClick={() => onUpdate({ status: "todo", progress: 0 })}
                    disabled={task.status === "todo"}
                    className="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors bg-background border border-border hover:bg-secondary/50 disabled:opacity-50"
                >
                    To Do
                </button>
                <button
                    onClick={() => onUpdate({ status: "in_progress", progress: 50 })}
                    disabled={task.status === "in_progress"}
                    className="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors bg-background border border-border hover:bg-secondary/50 disabled:opacity-50"
                >
                    In Progress
                </button>
                <button
                    onClick={() => onUpdate({ status: "completed", progress: 100 })}
                    disabled={task.status === "completed"}
                    className="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors bg-background border border-border hover:bg-secondary/50 disabled:opacity-50"
                >
                    Complete
                </button>
            </div>
        </div>
    );
}
