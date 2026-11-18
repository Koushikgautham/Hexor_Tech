// Database row types for projects and everything attached to a project.
// Columns match the Supabase schema (supabase/sql/, kept out of git).

export interface Milestone {
    id: string;
    project_id: string;
    title: string;
    description: string | null;
    due_date: string | null;
    status: "pending" | "completed";
    completed_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Task {
    id: string;
    project_id: string;
    title: string;
    description: string;
    status: "todo" | "in_progress" | "completed";
    priority: "low" | "medium" | "high";
    assigned_to: string | null;
    assigned_user?: {
        id: string;
        full_name: string;
        email: string;
        avatar_url?: string;
    };
    progress: number;
    due_date: string | null;
    created_at: string;
    updated_at: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    status: "current" | "finished";
    start_date: string;
    end_date: string | null;
    created_by: string;
    created_at: string;
    updated_at: string;
    tasks?: Task[];
    milestones?: Milestone[];
    progress?: number;
    taskCount?: number;
    completedTasks?: number;
}

// A team member who can be assigned to tasks
export interface TeamUser {
    id: string;
    full_name: string;
    email: string;
    avatar_url?: string;
}

export interface ProjectClient {
    id: string;
    created_at: string;
    client: {
        id: string;
        email: string;
        full_name: string | null;
        avatar_url: string | null;
    };
}

export interface Contact {
    id: string;
    project_id: string;
    user_id: string | null;
    name: string;
    role: string;
    email: string | null;
    phone: string | null;
    is_primary: boolean;
    created_at: string;
    user?: {
        id: string;
        full_name: string;
        email: string;
        avatar_url: string | null;
    };
}

export interface ProjectDocument {
    id: string;
    name: string;
    file_path: string;
    file_type: string;
    file_size: number;
    created_at: string;
    uploader?: {
        id: string;
        full_name: string;
    };
}

export interface ProjectSheet {
    id: string;
    name: string;
    sheet_url: string;
    description: string | null;
    created_at: string;
    added_by: string;
    added_by_user?: {
        id: string;
        full_name: string;
    };
}

export interface SheetAccessRequest {
    id: string;
    status: "pending" | "accepted" | "rejected";
    created_at: string;
}
