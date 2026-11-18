export interface Notification {
    id: string;
    type: "task_assigned" | "task_updated" | "project_created" | "sheet_access_request" | "sheet_access_response";
    title: string;
    message: string | null;
    task_id: string | null;
    project_id: string | null;
    is_read: boolean;
    created_at: string;
    creator?: {
        id: string;
        full_name: string;
        email: string;
    };
    task?: {
        id: string;
        title: string;
        status: string;
        project_id: string;
    };
    project?: {
        id: string;
        name: string;
    };
}
