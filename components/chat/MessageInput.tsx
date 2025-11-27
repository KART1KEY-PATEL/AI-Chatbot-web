"use client";

import * as React from "react";
import { Send, Mic } from "lucide-react";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

export interface MessageInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
}

export function MessageInput({
    onSend,
    disabled = false,
    placeholder = "Type your message...",
    className,
}: MessageInputProps) {
    const [message, setMessage] = React.useState("");
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage("");
            // Reset textarea height
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={cn("relative", className)}>
            <div className="flex items-end gap-2 p-4 border-t border-border bg-card">
                <Textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    autoResize
                    className="min-h-[60px] max-h-[200px] resize-none pr-12"
                    rows={1}
                />
                <div className="flex gap-2">
                    <Button
                        onClick={handleSend}
                        disabled={disabled || !message.trim()}
                        size="icon"
                        className="flex-shrink-0"
                        aria-label="Send message"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <div className="px-4 pb-2 text-xs text-muted-foreground">
                Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">⌘</kbd> +{" "}
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Enter</kbd> to
                send
            </div>
        </div>
    );
}
