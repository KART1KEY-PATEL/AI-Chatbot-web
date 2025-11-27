"use client";

import * as React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
};

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    className,
    size = "md",
}: ModalProps) {
    // Handle ESC key
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.3 }}
                            className={cn(
                                "relative w-full rounded-xl border border-border bg-card shadow-2xl",
                                sizeClasses[size],
                                className
                            )}
                        >
                            {/* Header */}
                            {(title || description) && (
                                <div className="border-b border-border px-6 py-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            {title && (
                                                <h2 className="text-lg font-semibold leading-none tracking-tight">
                                                    {title}
                                                </h2>
                                            )}
                                            {description && (
                                                <p className="text-sm text-muted-foreground mt-1.5">
                                                    {description}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={onClose}
                                            className="rounded-md p-1 hover:bg-accent transition-colors"
                                            aria-label="Close modal"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Content */}
                            <div className="px-6 py-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                {children}
                            </div>

                            {/* Footer */}
                            {footer && (
                                <div className="border-t border-border px-6 py-4 flex items-center justify-end gap-2">
                                    {footer}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
