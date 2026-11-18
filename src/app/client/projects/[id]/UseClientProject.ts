"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import type { ClientProjectDetail as Project } from "@/types/ClientProject";

export function useClientProject() {
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

    return {
        params,
        projectId,
        project,
        setProject,
        activeTab,
        setActiveTab,
        isLoading,
        setIsLoading,
        taskStats,
        primaryContact,
    };
}

export type ClientProjectState = ReturnType<typeof useClientProject>;
