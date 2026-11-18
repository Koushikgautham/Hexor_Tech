"use client";

import { Plus, Loader2 } from "lucide-react";
import { useProjectSheets } from "./UseProjectSheets";
import { AddSheetForm } from "./AddSheetForm";
import { SheetsList } from "./SheetsList";
import { SheetPreviewModal } from "./SheetPreviewModal";

interface ProjectSheetsProps {
    projectId: string;
}

export function ProjectSheets({ projectId }: ProjectSheetsProps) {
    const {
        profile,
        sheets,
        isLoading,
        showAddForm,
        setShowAddForm,
        isSubmitting,
        previewSheet,
        setPreviewSheet,
        sheetAccessStatus,
        requestingAccessSheetId,
        formData,
        setFormData,
        getEmbedUrl,
        handleAddSheet,
        handleRequestAccess,
        handleDelete,
    } = useProjectSheets(projectId);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Add Button */}
            <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 hover:bg-green-500/20 rounded-xl font-medium transition-colors"
            >
                <Plus className="w-4 h-4" />
                Link Google Sheet
            </button>

            {/* Add Form */}
            <AddSheetForm showAddForm={showAddForm} setShowAddForm={setShowAddForm} isSubmitting={isSubmitting} formData={formData} setFormData={setFormData} handleAddSheet={handleAddSheet} />

            {/* Sheets List */}
            <SheetsList profile={profile} sheets={sheets} setPreviewSheet={setPreviewSheet} sheetAccessStatus={sheetAccessStatus} requestingAccessSheetId={requestingAccessSheetId} handleRequestAccess={handleRequestAccess} handleDelete={handleDelete} />

            {/* Preview Modal */}
            <SheetPreviewModal previewSheet={previewSheet} setPreviewSheet={setPreviewSheet} getEmbedUrl={getEmbedUrl} />
        </div>
    );
}
