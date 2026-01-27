"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    FolderKanban,
    Clock,
    Calendar,
    Loader2,
    FileText,
    Phone,
    Mail,
    User,
    CheckCircle2,
    Target,
    Download,
    Star,
    ListTodo,
    CalendarDays,
} from "lucide-react";
import { toast } from "sonner";

interface Task {
    id: string;
    title: string;
    status: "todo" | "in_progress" | "completed";
    progress: number;
    priority: "low" | "medium" | "high";
    due_date: string | null;
}

interface Document {
    id: string;
    name: string;
    description: string | null;
    file_url: string;
    file_name: string;
    file_type: string | null;
    created_at: string;
}

interface Contact {
    id: string;
    name: string;
    role: string;
    email: string | null;
    phone: string | null;
    is_primary: boolean;
}

interface Invoice {
    id: string;
    name: string;
    file_url: string;
    file_name: string;
    amount: number | null;
    status: string;
    due_date: string | null;
    created_at: string;
}

interface Project {
    id: string;
    name: string;
    description: string;
    status: "current" | "finished";
    start_date: string;
    end_date: string | null;
    progress: number;
    taskCount: number;
    completedTasks: number;
    tasks: Task[];
    project_documents: Document[];
    project_contacts: Contact[];
    project_invoices: Invoice[];
}

// Circular Progress Component
function CircularProgress({ progress, size = 100, strokeWidth = 6 }: { progress: number; size?: number; strokeWidth?: number }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    className="text-secondary"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <motion.circle
                    className="text-primary"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                        strokeDasharray: circumference,
                    }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">{progress}%</span>
            </div>
        </div>
    );
}

export default function ClientProjectDetail() {
    const params = useParams();
    const projectId = params.id as string;

    const [project, setProject] = React.useState<Project | null>(null);
    const [activeTab, setActiveTab] = React.useState<"overview" | "documents" | "invoices" | "contacts">("overview");
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`/api/client/projects/${projectId}`);
                if (response.ok) {
                    setProject(await response.json());
                } else {
                    toast.error("Failed to load project");
                }
            } catch (error) {
                console.error("Error fetching project:", error);
                toast.error("Failed to load project");
            } finally {
                setIsLoading(false);
            }
        };

        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    // Calculate task statistics
    const taskStats = React.useMemo(() => {
        if (!project?.tasks) return { todo: 0, inProgress: 0, completed: 0 };
        const todo = project.tasks.filter(t => t.status === "todo").length;
        const inProgress = project.tasks.filter(t => t.status === "in_progress").length;
        const completed = project.tasks.filter(t => t.status === "completed").length;
        return { todo, inProgress, completed };
    }, [project?.tasks]);

    // Get primary contact
    const primaryContact = React.useMemo(() => {
        return project?.project_contacts?.find(c => c.is_primary);
    }, [project?.project_contacts]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FolderKanban className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Project not found</h2>
                <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or you don't have access.</p>
                <Link
                    href="/client/projects"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Back Navigation */}
            <Link
                href="/client/projects"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
            </Link>

            {/* Project Header */}
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

            {/* Tabs */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="flex border-b border-border overflow-x-auto">
                    {[
                        { id: "overview", label: "Overview", icon: ListTodo },
                        { id: "documents", label: "Documents", icon: FileText, count: project.project_documents?.length },
                        { id: "invoices", label: "Invoices", icon: FileText, count: project.project_invoices?.length },
                        { id: "contacts", label: "Contacts", icon: Phone, count: project.project_contacts?.length },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all relative min-w-[120px] ${
                                activeTab === tab.id
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                            {tab.count !== undefined && (
                                <span className={`px-2 py-0.5 rounded-full text-xs ${
                                    activeTab === tab.id
                                        ? "bg-primary/10 text-primary"
                                        : "bg-secondary text-muted-foreground"
                                }`}>
                                    {tab.count}
                                </span>
                            )}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="clientActiveTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="p-6">
                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                        <div className="space-y-6">
                            {/* Task Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-secondary/30 rounded-xl p-4 text-center">
                                    <p className="text-2xl font-bold text-foreground">{taskStats.todo}</p>
                                    <p className="text-sm text-muted-foreground">To Do</p>
                                </div>
                                <div className="bg-orange-500/10 rounded-xl p-4 text-center">
                                    <p className="text-2xl font-bold text-orange-500">{taskStats.inProgress}</p>
                                    <p className="text-sm text-muted-foreground">In Progress</p>
                                </div>
                                <div className="bg-green-500/10 rounded-xl p-4 text-center">
                                    <p className="text-2xl font-bold text-green-500">{taskStats.completed}</p>
                                    <p className="text-sm text-muted-foreground">Completed</p>
                                </div>
                            </div>

                            {/* Task List */}
                            <div>
                                <h3 className="font-semibold text-foreground mb-4">Tasks</h3>
                                {project.tasks && project.tasks.length > 0 ? (
                                    <div className="space-y-3">
                                        {project.tasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className="flex items-center justify-between p-4 bg-secondary/30 border border-border rounded-xl"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-2 h-2 rounded-full ${
                                                        task.status === "completed"
                                                            ? "bg-green-500"
                                                            : task.status === "in_progress"
                                                            ? "bg-orange-500"
                                                            : "bg-muted-foreground"
                                                    }`} />
                                                    <span className={`font-medium ${
                                                        task.status === "completed"
                                                            ? "text-muted-foreground line-through"
                                                            : "text-foreground"
                                                    }`}>
                                                        {task.title}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                                        task.priority === "high"
                                                            ? "bg-red-500/10 text-red-500"
                                                            : task.priority === "medium"
                                                            ? "bg-orange-500/10 text-orange-500"
                                                            : "bg-blue-500/10 text-blue-500"
                                                    }`}>
                                                        {task.priority}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground">{task.progress}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-8">No tasks found</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Documents Tab */}
                    {activeTab === "documents" && (
                        <div className="space-y-4">
                            {project.project_documents && project.project_documents.length > 0 ? (
                                project.project_documents.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="flex items-center justify-between p-4 bg-secondary/30 border border-border rounded-xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <FileText className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{doc.name}</p>
                                                {doc.description && (
                                                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                                                )}
                                            </div>
                                        </div>
                                        <a
                                            href={doc.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                        >
                                            <Download className="w-5 h-5 text-muted-foreground" />
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FileText className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground">No documents available</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Invoices Tab */}
                    {activeTab === "invoices" && (
                        <div className="space-y-4">
                            {project.project_invoices && project.project_invoices.length > 0 ? (
                                project.project_invoices.map((invoice) => (
                                    <div
                                        key={invoice.id}
                                        className="flex items-center justify-between p-4 bg-secondary/30 border border-border rounded-xl"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-lg ${
                                                invoice.status === "paid"
                                                    ? "bg-green-500/10"
                                                    : invoice.status === "overdue"
                                                    ? "bg-red-500/10"
                                                    : "bg-orange-500/10"
                                            }`}>
                                                {invoice.status === "paid" ? (
                                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                ) : (
                                                    <Clock className="w-5 h-5 text-orange-500" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{invoice.name}</p>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    {invoice.amount && <span>${invoice.amount.toFixed(2)}</span>}
                                                    {invoice.due_date && (
                                                        <>
                                                            <span>•</span>
                                                            <span>Due: {new Date(invoice.due_date).toLocaleDateString()}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                                invoice.status === "paid"
                                                    ? "bg-green-500/10 text-green-500"
                                                    : invoice.status === "overdue"
                                                    ? "bg-red-500/10 text-red-500"
                                                    : "bg-orange-500/10 text-orange-500"
                                            }`}>
                                                {invoice.status}
                                            </span>
                                            <a
                                                href={invoice.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                            >
                                                <Download className="w-5 h-5 text-muted-foreground" />
                                            </a>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FileText className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground">No invoices available</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Contacts Tab */}
                    {activeTab === "contacts" && (
                        <div className="space-y-4">
                            {project.project_contacts && project.project_contacts.length > 0 ? (
                                project.project_contacts.map((contact) => (
                                    <div
                                        key={contact.id}
                                        className="flex items-center justify-between p-4 bg-secondary/30 border border-border rounded-xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                                <User className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium text-foreground">{contact.name}</p>
                                                    {contact.is_primary && (
                                                        <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded text-xs font-medium">
                                                            <Star className="w-3 h-3" />
                                                            Primary
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground">{contact.role}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {contact.email && (
                                                <a
                                                    href={`mailto:${contact.email}`}
                                                    className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-sm"
                                                >
                                                    <Mail className="w-4 h-4" />
                                                    Email
                                                </a>
                                            )}
                                            {contact.phone && (
                                                <a
                                                    href={`tel:${contact.phone}`}
                                                    className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-sm"
                                                >
                                                    <Phone className="w-4 h-4" />
                                                    Call
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Phone className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground">No contacts available</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
