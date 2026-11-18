"use client";

import { Target, Plus } from "lucide-react";
import type { ProjectDetailState } from "../UseAdminProjectDetail";

export function MilestonesTab({ setShowMilestoneForm }: Pick<ProjectDetailState, "setShowMilestoneForm">) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-foreground">Project Milestones</h3>
                    <p className="text-sm text-muted-foreground">Track major project achievements</p>
                </div>
                <button
                    onClick={() => setShowMilestoneForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Milestone
                </button>
            </div>

            <div className="text-center py-12">
                <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-foreground mb-1">Milestone tracking coming soon</h3>
                <p className="text-sm text-muted-foreground">We're working on this feature</p>
            </div>
        </div>
    );
}
