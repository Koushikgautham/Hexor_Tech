"use client";

import { FileText, Download } from "lucide-react";
import type { ClientProjectDetail as Project } from "@/types/ClientProject";

export function DocumentsTab({ project }: { project: Project }) {
    return (
        <div className="space-y-4">
            {project.project_documents && project.project_documents.length > 0 ? (
                project.project_documents.map((doc) => (
                    <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 bg-secondary/30 border border-border rounded-xl"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium text-foreground">{doc.name}</p>
                                {doc.description && (
                                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                                )}
                            </div>
                        </div>
                        <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        >
                            <Download className="w-5 h-5 text-muted-foreground" />
                        </a>
                    </div>
                ))
            ) : (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No documents available</p>
                </div>
            )}
        </div>
    );
}
