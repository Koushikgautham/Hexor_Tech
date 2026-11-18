"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AddProjectForm } from "./AddProjectForm";
import { EditProjectForm } from "./EditProjectForm";
import { ProjectOverview } from "./ProjectOverview";
import type { ProjectsPageState } from "../UseAdminProjectsList";

export function ProjectModals({ showModal, setShowModal, selectedProject, setSelectedProject, handleCreateProject, handleUpdateProject }: Pick<ProjectsPageState, "showModal" | "setShowModal" | "selectedProject" | "setSelectedProject" | "handleCreateProject" | "handleUpdateProject">) {
    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => {
                        setShowModal(null);
                        setSelectedProject(null);
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className={`bg-card border border-border rounded-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl my-8 ${
                            showModal === "view-project" ? "max-w-lg" : "max-w-4xl"
                        }`}
                    >
                        {showModal === "add-project" && (
                            <AddProjectForm
                                onClose={() => setShowModal(null)}
                                onSuccess={async (data) => {
                                    const success = await handleCreateProject(data);
                                    if (success) setShowModal(null);
                                }}
                            />
                        )}

                        {showModal === "edit-project" && selectedProject && (
                            <EditProjectForm
                                project={selectedProject}
                                onClose={() => {
                                    setShowModal(null);
                                    setSelectedProject(null);
                                }}
                                onSuccess={async (data) => {
                                    const success = await handleUpdateProject(selectedProject.id, data);
                                    if (success) {
                                        setShowModal(null);
                                        setSelectedProject(null);
                                    }
                                }}
                            />
                        )}

                        {showModal === "view-project" && selectedProject && (
                            <ProjectOverview
                                project={selectedProject}
                                onClose={() => {
                                    setShowModal(null);
                                    setSelectedProject(null);
                                }}
                            />
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
