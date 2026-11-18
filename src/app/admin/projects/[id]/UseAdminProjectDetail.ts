"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { createProjectActions } from "./ProjectCrudHandlers";
import type { Invoice } from "@/types/Invoice";
import type { Milestone, Task, Project, TeamUser, ProjectClient, Contact } from "@/types/Project";

export function useProjectDetail() {
    const params = useParams();
    const projectId = params.id as string;

    const [project, setProject] = React.useState<Project | null>(null);
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [milestones, setMilestones] = React.useState<Milestone[]>([]);
    const [users, setUsers] = React.useState<TeamUser[]>([]);
    const [projectClients, setProjectClients] = React.useState<ProjectClient[]>([]);
    const [invoices, setInvoices] = React.useState<Invoice[]>([]);
    const [contacts, setContacts] = React.useState<Contact[]>([]);
    const [activeTab, setActiveTab] = React.useState<"tasks" | "milestones" | "documents" | "sheets" | "clients" | "invoices" | "contacts">("tasks");
    const [isLoading, setIsLoading] = React.useState(true);
    const [showTaskForm, setShowTaskForm] = React.useState(false);
    const [showMilestoneForm, setShowMilestoneForm] = React.useState(false);
    const [showClientSelector, setShowClientSelector] = React.useState(false);
    const [showInvoiceForm, setShowInvoiceForm] = React.useState(false);
    const [showContactForm, setShowContactForm] = React.useState(false);

    const fetchProject = async () => {
        try {
            const [projectRes, usersRes, milestonesRes, clientsRes, invoicesRes, contactsRes] = await Promise.all([
                fetch(`/api/projects/${projectId}`),
                fetch("/api/admin/team"),
                fetch(`/api/projects/${projectId}/milestones`),
                fetch(`/api/projects/${projectId}/clients`),
                fetch(`/api/projects/${projectId}/invoices`),
                fetch(`/api/projects/${projectId}/contacts`),
            ]);

            if (projectRes.ok) {
                const projectData = await projectRes.json();
                setProject(projectData);
                setTasks(projectData.tasks || []);
            } else {
                toast.error("Failed to load project");
            }

            if (usersRes.ok) {
                setUsers(await usersRes.json());
            }

            if (milestonesRes.ok) {
                setMilestones(await milestonesRes.json());
            }

            if (clientsRes.ok) {
                setProjectClients(await clientsRes.json());
            }

            if (invoicesRes.ok) {
                setInvoices(await invoicesRes.json());
            }

            if (contactsRes.ok) {
                setContacts(await contactsRes.json());
            }
        } catch (error) {
            console.error("Error fetching project:", error);
            toast.error("Failed to load project");
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    // Calculate task statistics
    const taskStats = React.useMemo(() => {
        const todo = tasks.filter(t => t.status === "todo").length;
        const inProgress = tasks.filter(t => t.status === "in_progress").length;
        const completed = tasks.filter(t => t.status === "completed").length;
        const highPriority = tasks.filter(t => t.priority === "high").length;
        return { todo, inProgress, completed, highPriority, total: tasks.length };
    }, [tasks]);

    // Calculate days remaining
    const daysRemaining = React.useMemo(() => {
        if (!project?.end_date) return null;
        const end = new Date(project.end_date);
        const now = new Date();
        const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return diff;
    }, [project?.end_date]);

    const {
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
    } = createProjectActions({
        projectId,
        fetchProject,
        setShowTaskForm,
        setShowClientSelector,
        setShowInvoiceForm,
        setShowContactForm,
    });
    return {
        params,
        projectId,
        project,
        setProject,
        tasks,
        setTasks,
        milestones,
        setMilestones,
        users,
        setUsers,
        projectClients,
        setProjectClients,
        invoices,
        setInvoices,
        contacts,
        setContacts,
        activeTab,
        setActiveTab,
        isLoading,
        setIsLoading,
        showTaskForm,
        setShowTaskForm,
        showMilestoneForm,
        setShowMilestoneForm,
        showClientSelector,
        setShowClientSelector,
        showInvoiceForm,
        setShowInvoiceForm,
        showContactForm,
        setShowContactForm,
        fetchProject,
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
    };
}

export type ProjectDetailState = ReturnType<typeof useProjectDetail>;
