import { toast } from "sonner";

// Create / update / delete handlers for the admin project detail page.
// Each handler calls the API, then reloads the project via fetchProject().
export function createProjectActions({
    projectId,
    fetchProject,
    setShowTaskForm,
    setShowClientSelector,
    setShowInvoiceForm,
    setShowContactForm,
}: {
    projectId: string;
    fetchProject: () => Promise<void>;
    setShowTaskForm: (show: boolean) => void;
    setShowClientSelector: (show: boolean) => void;
    setShowInvoiceForm: (show: boolean) => void;
    setShowContactForm: (show: boolean) => void;
}) {
    const handleCreateTask = async (taskData: any) => {
        try {
            const response = await fetch(`/api/projects/${projectId}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                await fetchProject();
                toast.success("Task created!");
                setShowTaskForm(false);
            } else {
                toast.error("Failed to create task");
            }
        } catch (error) {
            toast.error("Error creating task");
        }
    };

    const handleUpdateTask = async (taskId: string, updates: any) => {
        try {
            const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
            });

            if (response.ok) {
                await fetchProject();
                toast.success("Task updated!");
            } else {
                toast.error("Failed to update task");
            }
        } catch (error) {
            toast.error("Error updating task");
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        if (!confirm("Delete this task?")) return;

        try {
            const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                await fetchProject();
                toast.success("Task deleted!");
            } else {
                toast.error("Failed to delete task");
            }
        } catch (error) {
            toast.error("Error deleting task");
        }
    };

    // Client handlers
    const handleAddClient = async (clientId: string) => {
        try {
            const response = await fetch(`/api/projects/${projectId}/clients`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ client_id: clientId }),
            });

            if (response.ok) {
                await fetchProject();
                toast.success("Client added!");
                setShowClientSelector(false);
            } else {
                const data = await response.json();
                toast.error(data.error || "Failed to add client");
            }
        } catch (error) {
            toast.error("Error adding client");
        }
    };

    const handleRemoveClient = async (clientId: string) => {
        if (!confirm("Remove this client from the project?")) return;

        try {
            const response = await fetch(`/api/projects/${projectId}/clients?client_id=${clientId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                await fetchProject();
                toast.success("Client removed!");
            } else {
                toast.error("Failed to remove client");
            }
        } catch (error) {
            toast.error("Error removing client");
        }
    };

    // Invoice handlers
    const handleCreateInvoice = async (invoiceData: any) => {
        try {
            const response = await fetch(`/api/projects/${projectId}/invoices`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(invoiceData),
            });

            if (response.ok) {
                await fetchProject();
                toast.success("Invoice created!");
                setShowInvoiceForm(false);
            } else {
                toast.error("Failed to create invoice");
            }
        } catch (error) {
            toast.error("Error creating invoice");
        }
    };

    const handleUpdateInvoice = async (invoiceId: string, updates: any) => {
        try {
            const response = await fetch(`/api/projects/${projectId}/invoices`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ invoice_id: invoiceId, ...updates }),
            });

            if (response.ok) {
                await fetchProject();
                toast.success("Invoice updated!");
            } else {
                toast.error("Failed to update invoice");
            }
        } catch (error) {
            toast.error("Error updating invoice");
        }
    };

    const handleDeleteInvoice = async (invoiceId: string) => {
        if (!confirm("Delete this invoice?")) return;

        try {
            const response = await fetch(`/api/projects/${projectId}/invoices?invoice_id=${invoiceId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                await fetchProject();
                toast.success("Invoice deleted!");
            } else {
                toast.error("Failed to delete invoice");
            }
        } catch (error) {
            toast.error("Error deleting invoice");
        }
    };

    // Contact handlers
    const handleCreateContact = async (contactData: any) => {
        try {
            const response = await fetch(`/api/projects/${projectId}/contacts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactData),
            });

            if (response.ok) {
                await fetchProject();
                toast.success("Contact added!");
                setShowContactForm(false);
            } else {
                toast.error("Failed to add contact");
            }
        } catch (error) {
            toast.error("Error adding contact");
        }
    };

    const handleUpdateContact = async (contactId: string, updates: any) => {
        try {
            const response = await fetch(`/api/projects/${projectId}/contacts`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contact_id: contactId, ...updates }),
            });

            if (response.ok) {
                await fetchProject();
                toast.success("Contact updated!");
            } else {
                toast.error("Failed to update contact");
            }
        } catch (error) {
            toast.error("Error updating contact");
        }
    };

    const handleDeleteContact = async (contactId: string) => {
        if (!confirm("Remove this contact?")) return;

        try {
            const response = await fetch(`/api/projects/${projectId}/contacts?contact_id=${contactId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                await fetchProject();
                toast.success("Contact removed!");
            } else {
                toast.error("Failed to remove contact");
            }
        } catch (error) {
            toast.error("Error removing contact");
        }
    };

    return {
        handleCreateTask,
        handleUpdateTask,
        handleDeleteTask,
        handleAddClient,
        handleRemoveClient,
        handleCreateInvoice,
        handleUpdateInvoice,
        handleDeleteInvoice,
        handleCreateContact,
        handleUpdateContact,
        handleDeleteContact,
    };
}
