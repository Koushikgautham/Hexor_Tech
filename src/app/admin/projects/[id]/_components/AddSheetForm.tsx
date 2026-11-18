"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X, Link } from "lucide-react";
import type { ProjectSheetsState } from "./UseProjectSheets";

export function AddSheetForm({ showAddForm, setShowAddForm, isSubmitting, formData, setFormData, handleAddSheet }: Pick<ProjectSheetsState, "showAddForm" | "setShowAddForm" | "isSubmitting" | "formData" | "setFormData" | "handleAddSheet">) {
    return (
        <AnimatePresence>
            {showAddForm && (
                <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleAddSheet}
                    className="bg-secondary/30 rounded-xl p-4 space-y-3"
                >
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-foreground">
                            Link a Google Sheet
                        </h4>
                        <button
                            type="button"
                            onClick={() => setShowAddForm(false)}
                            className="p-1 hover:bg-secondary rounded-lg"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div>
                        <label className="text-xs text-muted-foreground">Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((p) => ({ ...p, name: e.target.value }))
                            }
                            placeholder="Q1 Budget Tracker"
                            className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-muted-foreground">
                            Google Sheets URL
                        </label>
                        <input
                            type="url"
                            required
                            value={formData.sheet_url}
                            onChange={(e) =>
                                setFormData((p) => ({ ...p, sheet_url: e.target.value }))
                            }
                            placeholder="https://docs.google.com/spreadsheets/d/..."
                            className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-muted-foreground">
                            Description (optional)
                        </label>
                        <input
                            type="text"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData((p) => ({ ...p, description: e.target.value }))
                            }
                            placeholder="Brief description..."
                            className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setShowAddForm(false)}
                            className="flex-1 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <Link className="w-4 h-4" />
                                    Link Sheet
                                </>
                            )}
                        </button>
                    </div>
                </motion.form>
            )}
        </AnimatePresence>
    );
}
