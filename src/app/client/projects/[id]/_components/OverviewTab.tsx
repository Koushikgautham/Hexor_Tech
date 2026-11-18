"use client";

import type { ClientProjectDetail as Project } from "@/types/ClientProject";
import type { ClientProjectState } from "../UseClientProject";

export function OverviewTab({ project, taskStats }: Pick<ClientProjectState, "taskStats"> & { project: Project }) {
    return (
        <div className="space-y-6">
            {/* Task Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-secondary/30 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">{taskStats.todo}</p>
                    <p className="text-sm text-muted-foreground">To Do</p>
                </div>
                <div className="bg-orange-500/10 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-orange-500">{taskStats.inProgress}</p>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-green-500">{taskStats.completed}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                </div>
            </div>

            {/* Task List */}
            <div>
                <h3 className="font-semibold text-foreground mb-4">Tasks</h3>
                {project.tasks && project.tasks.length > 0 ? (
                    <div className="space-y-3">
                        {project.tasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex items-center justify-between p-4 bg-secondary/30 border border-border rounded-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${
                                        task.status === "completed"
                                            ? "bg-green-500"
                                            : task.status === "in_progress"
                                            ? "bg-orange-500"
                                            : "bg-muted-foreground"
                                    }`} />
                                    <span className={`font-medium ${
                                        task.status === "completed"
                                            ? "text-muted-foreground line-through"
                                            : "text-foreground"
                                    }`}>
                                        {task.title}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                        task.priority === "high"
                                            ? "bg-red-500/10 text-red-500"
                                            : task.priority === "medium"
                                            ? "bg-orange-500/10 text-orange-500"
                                            : "bg-blue-500/10 text-blue-500"
                                    }`}>
                                        {task.priority}
                                    </span>
                                    <span className="text-sm text-muted-foreground">{task.progress}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">No tasks found</p>
                )}
            </div>
        </div>
    );
}
