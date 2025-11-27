"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    description?: string;
    className?: string;
}

export function Switch({
    checked,
    onChange,
    label,
    description,
    className,
}: SwitchProps) {
    return (
        <div className={cn("flex items-center justify-between", className)}>
            {(label || description) && (
                <div className="flex-1">
                    {label && (
                        <label className="text-sm font-medium leading-none cursor-pointer">
                            {label}
                        </label>
                    )}
                    {description && (
                        <p className="text-xs text-muted-foreground mt-1">{description}</p>
                    )}
                </div>
            )}
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    checked ? "bg-primary" : "bg-input"
                )}
            >
                <span
                    className={cn(
                        "inline-block h-5 w-5 transform rounded-full bg-background shadow-lg transition-transform",
                        checked ? "translate-x-5" : "translate-x-0.5"
                    )}
                />
            </button>
        </div>
    );
}
