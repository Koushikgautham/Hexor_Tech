"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileSpreadsheet, ExternalLink, X } from "lucide-react";
import type { ProjectSheetsState } from "./UseProjectSheets";

export function SheetPreviewModal({ previewSheet, setPreviewSheet, getEmbedUrl }: Pick<ProjectSheetsState, "previewSheet" | "setPreviewSheet" | "getEmbedUrl">) {
    return (
        <AnimatePresence>
            {previewSheet && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4"
                    onClick={() => setPreviewSheet(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-card border border-border rounded-2xl w-full max-w-5xl h-[80vh] overflow-hidden flex flex-col"
                    >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                            <div className="flex items-center gap-2">
                                <FileSpreadsheet className="w-5 h-5 text-green-500" />
                                <span className="font-medium text-foreground">
                                    {previewSheet.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => window.open(previewSheet.sheet_url, "_blank")}
                                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Open in Google Sheets
                                </button>
                                <button
                                    onClick={() => setPreviewSheet(null)}
                                    className="p-2 hover:bg-secondary rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 bg-white">
                            <iframe
                                src={getEmbedUrl(previewSheet.sheet_url)}
                                className="w-full h-full border-0"
                                title={previewSheet.name}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
