"use client";

import { motion } from "framer-motion";
import { FileText, Phone, ListTodo } from "lucide-react";
import type { ClientProjectDetail as Project } from "@/types/ClientProject";
import type { ClientProjectState } from "../UseClientProject";

export function ProjectTabs({ project, activeTab, setActiveTab }: Pick<ClientProjectState, "activeTab" | "setActiveTab"> & { project: Project }) {
    return (
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
    );
}
