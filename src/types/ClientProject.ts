// Project shapes returned by the client-portal APIs (/api/client/projects).
import type { ClientProjectInvoice } from "./Invoice";

// Client dashboard project card
export interface ClientProjectSummary {
    id: string;
    name: string;
    description: string;
    status: string;
    progress: number;
    taskCount: number;
    completedTasks: number;
}

// Client projects list
export interface ClientProjectListItem {
    id: string;
    name: string;
    description: string;
    status: string;
    start_date: string;
    end_date: string | null;
    progress: number;
    taskCount: number;
    completedTasks: number;
}

export interface ClientTask {
    id: string;
    title: string;
    status: "todo" | "in_progress" | "completed";
    progress: number;
    priority: "low" | "medium" | "high";
    due_date: string | null;
}

export interface ClientDocument {
    id: string;
    name: string;
    description: string | null;
    file_url: string;
    file_name: string;
    file_type: string | null;
    created_at: string;
}

export interface ClientContact {
    id: string;
    name: string;
    role: string;
    email: string | null;
    phone: string | null;
    is_primary: boolean;
}

// Client project detail page
export interface ClientProjectDetail {
    id: string;
    name: string;
    description: string;
    status: "current" | "finished";
    start_date: string;
    end_date: string | null;
    progress: number;
    taskCount: number;
    completedTasks: number;
    tasks: ClientTask[];
    project_documents: ClientDocument[];
    project_contacts: ClientContact[];
    project_invoices: ClientProjectInvoice[];
}
