"use client";

import Link from "next/link";
import { ArrowLeft, FolderKanban, Loader2 } from "lucide-react";
import { useClientProject } from "./UseClientProject";
import { ProjectHeader } from "./_components/ProjectHeader";
import { ProjectTabs } from "./_components/ProjectTabs";
import { OverviewTab } from "./_components/OverviewTab";
import { DocumentsTab } from "./_components/DocumentsTab";
import { InvoicesTab } from "./_components/InvoicesTab";
import { ContactsTab } from "./_components/ContactsTab";

export default function ClientProjectDetail() {
    const {
        project,
        activeTab,
        setActiveTab,
        isLoading,
        taskStats,
        primaryContact,
    } = useClientProject();

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
            <ProjectHeader project={project} primaryContact={primaryContact} />

            {/* Tabs */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <ProjectTabs project={project} activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="p-6">
                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                        <OverviewTab project={project} taskStats={taskStats} />
                    )}

                    {/* Documents Tab */}
                    {activeTab === "documents" && (
                        <DocumentsTab project={project} />
                    )}

                    {/* Invoices Tab */}
                    {activeTab === "invoices" && (
                        <InvoicesTab project={project} />
                    )}

                    {/* Contacts Tab */}
                    {activeTab === "contacts" && (
                        <ContactsTab project={project} />
                    )}
                </div>
            </div>
        </div>
    );
}
