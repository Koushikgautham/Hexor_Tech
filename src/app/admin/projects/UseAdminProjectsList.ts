"use client";

import * as React from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/authentication/AuthenticationContext";
import type { Project, TeamUser as User } from "@/types/Project";

export function useProjectsPage() {
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

    return {
        profile,
        projects,
        setProjects,
        adminUsers,
        setAdminUsers,
        filter,
        setFilter,
        showModal,
        setShowModal,
        selectedProject,
        setSelectedProject,
        isLoading,
        setIsLoading,
        fetchProjects,
        fetchAdminUsers,
        filteredProjects,
        stats,
        handleCreateProject,
        handleUpdateProject,
        handleDeleteProject,
    };
}

export type ProjectsPageState = ReturnType<typeof useProjectsPage>;
