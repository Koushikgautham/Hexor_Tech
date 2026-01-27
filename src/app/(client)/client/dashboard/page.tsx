"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    FolderKanban,
    Receipt,
    TrendingUp,
    Clock,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
    progress: number;
    taskCount: number;
    completedTasks: number;
}

interface Invoice {
    id: string;
    name: string;
    amount: number | null;
    status: string;
    due_date: string | null;
    project: {
        id: string;
        name: string;
    };
}

export default function ClientDashboard() {
    const [projects, setProjects] = React.useState<Project[]>([]);
    const [invoices, setInvoices] = React.useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsRes, invoicesRes] = await Promise.all([
                    fetch("/api/client/projects"),
                    fetch("/api/client/invoices"),
                ]);

                if (projectsRes.ok) {
                    setProjects(await projectsRes.json());
                }

                if (invoicesRes.ok) {
                    setInvoices(await invoicesRes.json());
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Calculate stats
    const stats = React.useMemo(() => {
        const activeProjects = projects.filter(p => p.status === "current").length;
        const completedProjects = projects.filter(p => p.status === "finished").length;
        const pendingInvoices = invoices.filter(i => i.status === "pending").length;
        const overdueInvoices = invoices.filter(i => i.status === "overdue").length;
        const totalDue = invoices
            .filter(i => i.status === "pending" || i.status === "overdue")
            .reduce((sum, i) => sum + (i.amount || 0), 0);

        return { activeProjects, completedProjects, pendingInvoices, overdueInvoices, totalDue };
    }, [projects, invoices]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back!</h1>
                <p className="text-muted-foreground">Here's an overview of your projects and invoices.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card border border-border rounded-2xl p-5"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 bg-blue-500/10 rounded-xl">
                            <FolderKanban className="w-5 h-5 text-blue-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stats.activeProjects}</p>
                    <p className="text-sm text-muted-foreground">Active Projects</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card border border-border rounded-2xl p-5"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 bg-green-500/10 rounded-xl">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stats.completedProjects}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-card border border-border rounded-2xl p-5"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 bg-orange-500/10 rounded-xl">
                            <Receipt className="w-5 h-5 text-orange-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stats.pendingInvoices}</p>
                    <p className="text-sm text-muted-foreground">Pending Invoices</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-card border border-border rounded-2xl p-5"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 bg-primary/10 rounded-xl">
                            <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">${stats.totalDue.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Total Due</p>
                </motion.div>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Projects */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                    <div className="flex items-center justify-between p-5 border-b border-border">
                        <h2 className="font-semibold text-foreground">Your Projects</h2>
                        <Link
                            href="/client/projects"
                            className="flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                            View all
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="p-5 space-y-4">
                        {projects.length > 0 ? (
                            projects.slice(0, 3).map((project) => (
                                <Link
                                    key={project.id}
                                    href={`/client/projects/${project.id}`}
                                    className="block"
                                >
                                    <div className="p-4 bg-secondary/30 border border-border rounded-xl hover:border-primary/30 transition-all">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-medium text-foreground">{project.name}</h3>
                                            <span
                                                className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                                    project.status === "current"
                                                        ? "bg-orange-500/10 text-orange-500"
                                                        : "bg-green-500/10 text-green-500"
                                                }`}
                                            >
                                                {project.status === "current" ? "In Progress" : "Completed"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <span>{project.completedTasks}/{project.taskCount} tasks</span>
                                            <span>{project.progress}%</span>
                                        </div>
                                        <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all"
                                                style={{ width: `${project.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-12 h-12 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <FolderKanban className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <p className="text-sm text-muted-foreground">No projects assigned yet</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Recent Invoices */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                    <div className="flex items-center justify-between p-5 border-b border-border">
                        <h2 className="font-semibold text-foreground">Recent Invoices</h2>
                        <Link
                            href="/client/invoices"
                            className="flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                            View all
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="p-5 space-y-4">
                        {invoices.length > 0 ? (
                            invoices.slice(0, 4).map((invoice) => (
                                <div
                                    key={invoice.id}
                                    className="flex items-center justify-between p-4 bg-secondary/30 border border-border rounded-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${
                                            invoice.status === "paid"
                                                ? "bg-green-500/10"
                                                : invoice.status === "overdue"
                                                ? "bg-red-500/10"
                                                : "bg-orange-500/10"
                                        }`}>
                                            {invoice.status === "paid" ? (
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            ) : invoice.status === "overdue" ? (
                                                <AlertCircle className="w-4 h-4 text-red-500" />
                                            ) : (
                                                <Clock className="w-4 h-4 text-orange-500" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground text-sm">{invoice.name}</p>
                                            <p className="text-xs text-muted-foreground">{invoice.project?.name}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-foreground">
                                            {invoice.amount ? `$${invoice.amount.toFixed(2)}` : "-"}
                                        </p>
                                        <span className={`text-xs ${
                                            invoice.status === "paid"
                                                ? "text-green-500"
                                                : invoice.status === "overdue"
                                                ? "text-red-500"
                                                : "text-orange-500"
                                        }`}>
                                            {invoice.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-12 h-12 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Receipt className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <p className="text-sm text-muted-foreground">No invoices yet</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
