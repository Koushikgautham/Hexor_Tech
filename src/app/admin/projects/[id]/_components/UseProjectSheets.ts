"use client";

import * as React from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/authentication/AuthenticationContext";
import type { ProjectSheet as Sheet, SheetAccessRequest as AccessRequest } from "@/types/Project";

export function useProjectSheets(projectId: string) {
    const { profile } = useAuth();
    const [sheets, setSheets] = React.useState<Sheet[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [showAddForm, setShowAddForm] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [previewSheet, setPreviewSheet] = React.useState<Sheet | null>(null);
    const [sheetAccessStatus, setSheetAccessStatus] = React.useState<{ [key: string]: AccessRequest | null }>({});
    const [requestingAccessSheetId, setRequestingAccessSheetId] = React.useState<string | null>(null);
    const [formData, setFormData] = React.useState({
        name: "",
        sheet_url: "",
        description: "",
    });

    // Fetch sheets
    const fetchSheets = React.useCallback(async () => {
        try {
            const response = await fetch(`/api/projects/${projectId}/sheets`);
            if (response.ok) {
                const data = await response.json();
                setSheets(data);
                // Fetch access status for each sheet
                data.forEach((sheet: Sheet) => {
                    fetchAccessStatus(sheet.id);
                });
            }
        } catch (error) {
            console.error("Error fetching sheets:", error);
        } finally {
            setIsLoading(false);
        }
    }, [projectId]);

    // Fetch access status for a sheet
    const fetchAccessStatus = async (sheetId: string) => {
        try {
            const response = await fetch(`/api/projects/${projectId}/sheets/${sheetId}/access-request`);
            if (response.ok) {
                const data = await response.json();
                setSheetAccessStatus((prev) => ({
                    ...prev,
                    [sheetId]: data.request,
                }));
            }
        } catch (error) {
            console.error("Error fetching access status:", error);
        }
    };

    React.useEffect(() => {
        fetchSheets();
    }, [fetchSheets]);

    // Convert Google Sheets URL to embed URL
    const getEmbedUrl = (url: string) => {
        // Extract the spreadsheet ID
        const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (match) {
            const spreadsheetId = match[1];
            return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/htmlembed?widget=true`;
        }
        return url;
    };

    // Handle add sheet
    const handleAddSheet = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/projects/${projectId}/sheets`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newSheet = await response.json();
                setSheets((prev) => [newSheet, ...prev]);
                setFormData({ name: "", sheet_url: "", description: "" });
                setShowAddForm(false);
                toast.success("Google Sheet linked successfully");
            } else {
                const error = await response.json();
                toast.error(error.error || "Failed to add sheet");
            }
        } catch (error) {
            toast.error("Error adding sheet");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle request edit access
    const handleRequestAccess = async (sheetId: string) => {
        setRequestingAccessSheetId(sheetId);
        try {
            const response = await fetch(`/api/projects/${projectId}/sheets/${sheetId}/access-request`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Access request sent to sheet creator");
                await fetchAccessStatus(sheetId);
            } else {
                const error = await response.json();
                toast.error(error.error || "Failed to send request");
            }
        } catch (error) {
            toast.error("Error requesting access");
            console.error(error);
        } finally {
            setRequestingAccessSheetId(null);
        }
    };

    // Handle delete
    const handleDelete = async (sheetId: string) => {
        if (!confirm("Are you sure you want to remove this sheet link?")) return;

        try {
            const response = await fetch(
                `/api/projects/${projectId}/sheets?sheetId=${sheetId}`,
                { method: "DELETE" }
            );

            if (response.ok) {
                setSheets((prev) => prev.filter((s) => s.id !== sheetId));
                toast.success("Sheet link removed");
            } else {
                toast.error("Failed to remove sheet");
            }
        } catch (error) {
            toast.error("Error removing sheet");
        }
    };

    return {
        profile,
        sheets,
        setSheets,
        isLoading,
        setIsLoading,
        showAddForm,
        setShowAddForm,
        isSubmitting,
        setIsSubmitting,
        previewSheet,
        setPreviewSheet,
        sheetAccessStatus,
        setSheetAccessStatus,
        requestingAccessSheetId,
        setRequestingAccessSheetId,
        formData,
        setFormData,
        fetchSheets,
        fetchAccessStatus,
        getEmbedUrl,
        handleAddSheet,
        handleRequestAccess,
        handleDelete,
    };
}

export type ProjectSheetsState = ReturnType<typeof useProjectSheets>;
