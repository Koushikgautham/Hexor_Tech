"use client";

import { motion } from "framer-motion";
import { FileSpreadsheet, Trash2, ExternalLink, Loader2, Maximize2, Lock, LockOpen, Clock } from "lucide-react";
import type { ProjectSheetsState } from "./UseProjectSheets";

export function SheetsList({ profile, sheets, setPreviewSheet, sheetAccessStatus, requestingAccessSheetId, handleRequestAccess, handleDelete }: Pick<ProjectSheetsState, "profile" | "sheets" | "setPreviewSheet" | "sheetAccessStatus" | "requestingAccessSheetId" | "handleRequestAccess" | "handleDelete">) {
    return (
        <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">
                Linked Sheets ({sheets.length})
            </h4>

            {sheets.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                    No Google Sheets linked yet
                </p>
            ) : (
                <div className="space-y-2">
                    {sheets.map((sheet) => (
                        <motion.div
                            key={sheet.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-secondary/30 rounded-xl overflow-hidden"
                        >
                            <div className="flex items-center gap-3 p-3">
                                <FileSpreadsheet className="w-5 h-5 text-green-500" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">
                                        {sheet.name}
                                    </p>
                                    {sheet.description && (
                                        <p className="text-xs text-muted-foreground truncate">
                                            {sheet.description}
                                        </p>
                                    )}
                                    {/* Show access status if not creator */}
                                    {sheet.added_by !== profile?.id && (
                                        <div className="mt-1">
                                            {sheetAccessStatus[sheet.id]?.status === "pending" ? (
                                                <div className="flex items-center gap-1 text-xs text-orange-500">
                                                    <Clock className="w-3 h-3" />
                                                    Request pending
                                                </div>
                                            ) : sheetAccessStatus[sheet.id]?.status === "accepted" ? (
                                                <div className="flex items-center gap-1 text-xs text-green-500">
                                                    <LockOpen className="w-3 h-3" />
                                                    Edit access granted
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Lock className="w-3 h-3" />
                                                    View only
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    {/* Request Edit Access Button */}
                                    {sheet.added_by !== profile?.id && !sheetAccessStatus[sheet.id] && (
                                        <button
                                            onClick={() => handleRequestAccess(sheet.id)}
                                            disabled={requestingAccessSheetId === sheet.id}
                                            className="px-2 py-1.5 text-xs bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1"
                                            title="Request edit access"
                                        >
                                            {requestingAccessSheetId === sheet.id ? (
                                                <Loader2 className="w-3 h-3 animate-spin" />
                                            ) : (
                                                <Lock className="w-3 h-3" />
                                            )}
                                            Request Access
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setPreviewSheet(sheet)}
                                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                        title="Preview"
                                    >
                                        <Maximize2 className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                    <button
                                        onClick={() => window.open(sheet.sheet_url, "_blank")}
                                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                        title="Open in new tab"
                                    >
                                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(sheet.id)}
                                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                                        title="Remove"
                                    >
                                        <Trash2 className="w-4 h-4 text-destructive" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
