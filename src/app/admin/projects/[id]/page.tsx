"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FolderKanban, Loader2 } from "lucide-react";
import { ProjectDocuments } from "./_components/ProjectDocuments";
import { ProjectSheets } from "./_components/ProjectSheets";
import { useProjectDetail } from "./UseAdminProjectDetail";
import { ProjectHero } from "./_components/ProjectHero";
import { ProjectStats } from "./_components/ProjectStats";
import { TaskBreakdown } from "./_components/TaskBreakdown";
import { ProjectTabs } from "./_components/ProjectTabs";
import { TasksTab } from "./_components/TasksTab";
import { MilestonesTab } from "./_components/MilestonesTab";
import { ClientsTab } from "./_components/ClientsTab";
import { InvoicesTab } from "./_components/InvoicesTab";
import { ContactsTab } from "./_components/ContactsTab";

export default function ProjectDetailPage() {
    const {
        projectId,
        project,
        tasks,
        milestones,
        users,
        projectClients,
        invoices,
        contacts,
        activeTab,
        setActiveTab,
        isLoading,
        showTaskForm,
        setShowTaskForm,
        setShowMilestoneForm,
        showClientSelector,
        setShowClientSelector,
        showInvoiceForm,
        setShowInvoiceForm,
        showContactForm,
        setShowContactForm,
        taskStats,
        daysRemaining,
        handleCreateTask,
        handleUpdateTask,
        handleDeleteTask,
        handleAddClient,
        handleRemoveClient,
        handleCreateInvoice,
        handleUpdateInvoice,
        handleDeleteInvoice,
        handleCreateContact,
        handleUpdateContact,
        handleDeleteContact,
    } = useProjectDetail();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading project...</p>
                </div>
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
                <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been deleted.</p>
                <Link
                    href="/admin/projects"
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
                href="/admin/projects"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
            </Link>

            {/* Hero Section with Project Info */}
            <ProjectHero project={project} daysRemaining={daysRemaining} />

            {/* Statistics Cards */}
            <ProjectStats taskStats={taskStats} />

            {/* Task Status Breakdown Bar */}
            {taskStats.total > 0 && (
                <TaskBreakdown taskStats={taskStats} />
            )}

            {/* Tabs Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-card border border-border rounded-2xl overflow-hidden"
            >
                {/* Tab Buttons */}
                <ProjectTabs tasks={tasks} milestones={milestones} projectClients={projectClients} invoices={invoices} contacts={contacts} activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="p-6">
                    {/* Tasks Tab */}
                    {activeTab === "tasks" && (
                        <TasksTab tasks={tasks} users={users} showTaskForm={showTaskForm} setShowTaskForm={setShowTaskForm} handleCreateTask={handleCreateTask} handleUpdateTask={handleUpdateTask} handleDeleteTask={handleDeleteTask} />
                    )}

                    {/* Milestones Tab */}
                    {activeTab === "milestones" && (
                        <MilestonesTab setShowMilestoneForm={setShowMilestoneForm} />
                    )}

                    {/* Documents Tab */}
                    {activeTab === "documents" && (
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-foreground">Project Documents</h3>
                                <p className="text-sm text-muted-foreground">Upload and manage project files</p>
                            </div>
                            <ProjectDocuments projectId={projectId} />
                        </div>
                    )}

                    {/* Sheets Tab */}
                    {activeTab === "sheets" && (
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-foreground">Google Sheets</h3>
                                <p className="text-sm text-muted-foreground">Connect and view project spreadsheets</p>
                            </div>
                            <ProjectSheets projectId={projectId} />
                        </div>
                    )}

                    {/* Clients Tab */}
                    {activeTab === "clients" && (
                        <ClientsTab projectId={projectId} projectClients={projectClients} showClientSelector={showClientSelector} setShowClientSelector={setShowClientSelector} handleAddClient={handleAddClient} handleRemoveClient={handleRemoveClient} />
                    )}

                    {/* Invoices Tab */}
                    {activeTab === "invoices" && (
                        <InvoicesTab invoices={invoices} showInvoiceForm={showInvoiceForm} setShowInvoiceForm={setShowInvoiceForm} handleCreateInvoice={handleCreateInvoice} handleUpdateInvoice={handleUpdateInvoice} handleDeleteInvoice={handleDeleteInvoice} />
                    )}

                    {/* Contacts Tab */}
                    {activeTab === "contacts" && (
                        <ContactsTab users={users} contacts={contacts} showContactForm={showContactForm} setShowContactForm={setShowContactForm} handleCreateContact={handleCreateContact} handleUpdateContact={handleUpdateContact} handleDeleteContact={handleDeleteContact} />
                    )}
                </div>
            </motion.div>
        </div>
    );
}
