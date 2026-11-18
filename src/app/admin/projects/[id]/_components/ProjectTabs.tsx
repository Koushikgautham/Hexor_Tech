"use client";

import { motion } from "framer-motion";
import { ListTodo, Target, FileText, FileSpreadsheet, Users, Receipt, Phone } from "lucide-react";
import type { ProjectDetailState } from "../UseAdminProjectDetail";

export function ProjectTabs({ tasks, milestones, projectClients, invoices, contacts, activeTab, setActiveTab }: Pick<ProjectDetailState, "tasks" | "milestones" | "projectClients" | "invoices" | "contacts" | "activeTab" | "setActiveTab">) {
    return (
        <div className="flex border-b border-border overflow-x-auto">
            {[
                { id: "tasks", label: "Tasks", icon: ListTodo, count: tasks.length },
                { id: "milestones", label: "Milestones", icon: Target, count: milestones.length },
                { id: "documents", label: "Documents", icon: FileText },
                { id: "sheets", label: "Sheets", icon: FileSpreadsheet },
                { id: "clients", label: "Clients", icon: Users, count: projectClients.length },
                { id: "invoices", label: "Invoices", icon: Receipt, count: invoices.length },
                { id: "contacts", label: "Contacts", icon: Phone, count: contacts.length },
            ].map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all relative ${
                        activeTab === tab.id
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
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
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
