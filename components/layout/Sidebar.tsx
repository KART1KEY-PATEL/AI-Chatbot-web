"use client";

import * as React from "react";
import { X } from "lucide-react";
import { ModelSelector } from "../sidebar/ModelSelector";
import { ParametersPanel } from "../sidebar/ParametersPanel";
import { TemplateManager } from "../sidebar/TemplateManager";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
    className?: string;
}

export function Sidebar({ isOpen = true, onClose, className }: SidebarProps) {
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && onClose && (
                <div
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed lg:sticky top-0 left-0 z-50 h-screen w-80 bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--sidebar-border))] flex flex-col transition-transform lg:translate-x-0",
                    !isOpen && "-translate-x-full",
                    className
                )}
            >
                {/* Mobile close button */}
                {onClose && (
                    <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--sidebar-border))] lg:hidden">
                        <h2 className="text-lg font-semibold">Settings</h2>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                )}

                {/* Sidebar content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <ModelSelector />
                    <ParametersPanel />
                    <TemplateManager />
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-[hsl(var(--sidebar-border))] text-xs text-muted-foreground">
                    <p>AI Chat Interface v1.0</p>
                    <p className="mt-1">Powered by Hugging Face</p>
                </div>
            </aside>
        </>
    );
}
