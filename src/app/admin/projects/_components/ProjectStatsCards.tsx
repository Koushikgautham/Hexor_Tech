"use client";

import { motion } from "framer-motion";
import { FolderKanban, Clock, CheckCircle2 } from "lucide-react";
import type { ProjectsPageState } from "../UseAdminProjectsList";

export function ProjectStatsCards({ stats }: Pick<ProjectsPageState, "stats">) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-2xl p-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500/10 rounded-xl">
                        <FolderKanban className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">Total Projects</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
            </motion.div>

            <motion.div
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-2xl p-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-500/10 rounded-xl">
                        <Clock className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">In Progress</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{stats.current}</p>
            </motion.div>

            <motion.div
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-2xl p-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-500/10 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">Completed</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{stats.finished}</p>
            </motion.div>
        </div>
    );
}
