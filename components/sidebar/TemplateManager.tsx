"use client";

import * as React from "react";
import {
    FileText,
    ChevronDown,
    Plus,
    Trash2,
    Download,
} from "lucide-react";
import { useChat } from "@/contexts/ChatContext";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { cn } from "@/lib/utils";

export function TemplateManager() {
    const { templates, loadTemplate, saveTemplate, deleteTemplate } = useChat();
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [newTemplate, setNewTemplate] = React.useState({
        name: "",
        prompt: "",
        category: "General",
    });

    const handleSave = () => {
        if (newTemplate.name && newTemplate.prompt) {
            saveTemplate(newTemplate);
            setNewTemplate({ name: "", prompt: "", category: "General" });
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <div className="border-b border-[hsl(var(--sidebar-border))]">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-semibold">Templates</h3>
                        <span className="text-xs text-muted-foreground">
                            ({templates.length})
                        </span>
                    </div>
                    <ChevronDown
                        className={cn(
                            "w-4 h-4 transition-transform",
                            isExpanded && "rotate-180"
                        )}
                    />
                </button>

                {isExpanded && (
                    <div className="px-4 pb-4 space-y-2">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            variant="outline"
                            size="sm"
                            className="w-full"
                        >
                            <Plus className="w-4 h-4" />
                            New Template
                        </Button>

                        <div className="space-y-1 max-h-60 overflow-y-auto custom-scrollbar">
                            {templates.length === 0 ? (
                                <p className="text-xs text-muted-foreground text-center py-4">
                                    No templates yet
                                </p>
                            ) : (
                                templates.map((template) => (
                                    <div
                                        key={template.id}
                                        className="group flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
                                    >
                                        <button
                                            onClick={() => loadTemplate(template)}
                                            className="flex-1 text-left"
                                        >
                                            <div className="text-sm font-medium">
                                                {template.name}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {template.category}
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => deleteTemplate(template.id)}
                                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded transition-opacity"
                                            aria-label="Delete template"
                                        >
                                            <Trash2 className="w-3.5 h-3.5 text-destructive" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create Template"
                description="Save a prompt template for quick reuse"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>Save Template</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-2 block">Name</label>
                        <Input
                            value={newTemplate.name}
                            onChange={(e) =>
                                setNewTemplate({ ...newTemplate, name: e.target.value })
                            }
                            placeholder="e.g., Code Review"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-2 block">Category</label>
                        <Input
                            value={newTemplate.category}
                            onChange={(e) =>
                                setNewTemplate({ ...newTemplate, category: e.target.value })
                            }
                            placeholder="e.g., Development"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-2 block">Prompt</label>
                        <Textarea
                            value={newTemplate.prompt}
                            onChange={(e) =>
                                setNewTemplate({ ...newTemplate, prompt: e.target.value })
                            }
                            placeholder="Enter your prompt template..."
                            rows={6}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}
