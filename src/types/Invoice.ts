// Invoice types. `Invoice` is the full project_invoices row;
// the others are the smaller shapes returned by the client-portal APIs.

export interface Invoice {
    id: string;
    project_id: string;
    name: string;
    description: string | null;
    file_url: string;
    file_name: string;
    amount: number | null;
    status: "pending" | "paid" | "overdue";
    due_date: string | null;
    created_at: string;
    updated_at: string;
}

// Client invoices page (/api/client/invoices)
export interface ClientInvoice {
    id: string;
    project_id: string;
    name: string;
    description: string | null;
    file_url: string;
    file_name: string;
    amount: number | null;
    status: "pending" | "paid" | "overdue";
    due_date: string | null;
    created_at: string;
    project?: {
        id: string;
        name: string;
    };
}

// Client dashboard invoice list
export interface ClientInvoiceSummary {
    id: string;
    name: string;
    amount: number | null;
    status: string;
    due_date: string | null;
    project: {
        id: string;
        name: string;
    };
}

// Invoices shown on a client's project detail page
export interface ClientProjectInvoice {
    id: string;
    name: string;
    file_url: string;
    file_name: string;
    amount: number | null;
    status: string;
    due_date: string | null;
    created_at: string;
}
