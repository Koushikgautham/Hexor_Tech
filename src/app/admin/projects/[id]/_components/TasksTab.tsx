"use client";

import { motion } from "framer-motion";
import { ListTodo, Plus } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";
import type { ProjectDetailState } from "../UseAdminProjectDetail";

export function TasksTab({ tasks, users, showTaskForm, setShowTaskForm, handleCreateTask, handleUpdateTask, handleDeleteTask }: Pick<ProjectDetailState, "tasks" | "users" | "showTaskForm" | "setShowTaskForm" | "handleCreateTask" | "handleUpdateTask" | "handleDeleteTask">) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-foreground">Project Tasks</h3>
                    <p className="text-sm text-muted-foreground">Manage and track your project tasks</p>
                </div>
                <button
                    onClick={() => setShowTaskForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Task
                </button>
            </div>

            {showTaskForm && (
                <TaskForm
                    users={users}
                    onSubmit={handleCreateTask}
                    onCancel={() => setShowTaskForm(false)}
                />
            )}

            {tasks.length > 0 ? (
                <div className="space-y-3">
                    {tasks.map((task, index) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <TaskItem
                                task={task}
                                users={users}
                                onUpdate={(updates) => handleUpdateTask(task.id, updates)}
                                onDelete={() => handleDeleteTask(task.id)}
                            />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ListTodo className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-foreground mb-1">No tasks yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">Get started by creating your first task</p>
                    <button
                        onClick={() => setShowTaskForm(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Task
                    </button>
                </div>
            )}
        </div>
    );
}
