"use client";

import { motion } from "framer-motion";
import { Clock, ListTodo, CheckCircle2, AlertCircle } from "lucide-react";
import type { ProjectDetailState } from "../UseAdminProjectDetail";

export function ProjectStats({ taskStats }: Pick<ProjectDetailState, "taskStats">) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-2xl p-5 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 bg-blue-500/10 rounded-xl">
                        <ListTodo className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-xs font-medium text-blue-500 bg-blue-500/10 px-2 py-1 rounded-lg">Total</span>
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{taskStats.total}</p>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-2xl p-5 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 bg-orange-500/10 rounded-xl">
                        <Clock className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className="text-xs font-medium text-orange-500 bg-orange-500/10 px-2 py-1 rounded-lg">Active</span>
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{taskStats.inProgress}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-2xl p-5 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/5 transition-all"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 bg-green-500/10 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">Done</span>
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{taskStats.completed}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border rounded-2xl p-5 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 transition-all"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 bg-red-500/10 rounded-xl">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-xs font-medium text-red-500 bg-red-500/10 px-2 py-1 rounded-lg">Urgent</span>
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{taskStats.highPriority}</p>
                <p className="text-sm text-muted-foreground">High Priority</p>
            </motion.div>
        </div>
    );
}
