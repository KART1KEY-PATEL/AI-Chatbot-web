"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
    value: string;
    label: string;
    description?: string;
}

export interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    className?: string;
    label?: string;
}

export function Select({
    value,
    onChange,
    options,
    placeholder = "Select an option",
    className,
    label,
}: SelectProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div className={cn("relative", className)}>
            {label && (
                <label className="text-sm font-medium leading-none mb-2 block">
                    {label}
                </label>
            )}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-10 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
            >
                <span className={cn(!selectedOption && "text-muted-foreground")}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                    className={cn(
                        "h-4 w-4 opacity-50 transition-transform",
                        isOpen && "rotate-180"
                    )}
                />
            </button>
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute z-50 mt-2 w-full rounded-lg border border-border bg-popover p-1 shadow-lg animate-slide-down">
                        <div className="max-h-60 overflow-auto custom-scrollbar">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus:bg-accent focus:outline-none",
                                        value === option.value && "bg-accent font-medium"
                                    )}
                                >
                                    <div>{option.label}</div>
                                    {option.description && (
                                        <div className="text-xs text-muted-foreground mt-0.5">
                                            {option.description}
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
