"use client";

import { motion } from "framer-motion";
import { Plus, FolderKanban, Loader2 } from "lucide-react";
import { ProjectCard } from "./_components/ProjectCard";
import { useProjectsPage } from "./UseAdminProjectsList";
import { ProjectStatsCards } from "./_components/ProjectStatsCards";
import { ProjectModals } from "./_components/ProjectModals";

export default function ProjectsPage() {
    const {
        filter,
        setFilter,
        showModal,
        setShowModal,
        selectedProject,
        setSelectedProject,
        isLoading,
        filteredProjects,
        stats,
        handleCreateProject,
        handleUpdateProject,
        handleDeleteProject,
    } = useProjectsPage();

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
            <ProjectStatsCards stats={stats} />

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
            <ProjectModals showModal={showModal} setShowModal={setShowModal} selectedProject={selectedProject} setSelectedProject={setSelectedProject} handleCreateProject={handleCreateProject} handleUpdateProject={handleUpdateProject} />
        </div>
    );
}
