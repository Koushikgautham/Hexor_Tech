"use client";

import { motion } from "framer-motion";
import type { ProjectDetailState } from "../UseAdminProjectDetail";

export function TaskBreakdown({ taskStats }: Pick<ProjectDetailState, "taskStats">) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card border border-border rounded-2xl p-6"
        >
            <h3 className="text-sm font-medium text-foreground mb-4">Task Breakdown</h3>
            <div className="h-4 bg-secondary rounded-full overflow-hidden flex">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(taskStats.completed / taskStats.total) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-green-500 h-full"
                />
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(taskStats.inProgress / taskStats.total) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="bg-orange-500 h-full"
                />
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(taskStats.todo / taskStats.total) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    className="bg-secondary h-full"
                />
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-sm text-muted-foreground">Completed ({taskStats.completed})</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    <span className="text-sm text-muted-foreground">In Progress ({taskStats.inProgress})</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-secondary rounded-full border border-border" />
                    <span className="text-sm text-muted-foreground">To Do ({taskStats.todo})</span>
                </div>
            </div>
        </motion.div>
    );
}
