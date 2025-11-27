"use client";

import * as React from "react";
import { Copy, Check, User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn, copyToClipboard, formatDate } from "@/lib/utils";
import type { Message } from "@/types/chat";
import { Button } from "../ui/Button";

export interface ChatBubbleProps {
    message: Message;
    className?: string;
}

export function ChatBubble({ message, className }: ChatBubbleProps) {
    const [copied, setCopied] = React.useState(false);
    const [isDark, setIsDark] = React.useState(false);
    const isUser = message.role === "user";

    React.useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);

    const handleCopy = async () => {
        const success = await copyToClipboard(message.content);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div
            className={cn(
                "group flex gap-3 animate-slide-up",
                isUser ? "justify-end" : "justify-start",
                className
            )}
        >
            {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                </div>
            )}

            <div
                className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                    isUser
                        ? "bg-[hsl(var(--user-message))] text-[hsl(var(--user-message-foreground))]"
                        : "bg-[hsl(var(--ai-message))] text-[hsl(var(--ai-message-foreground))] border border-border"
                )}
            >
                <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown
                        components={{
                            code({ node, inline, className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || "");
                                return !inline && match ? (
                                    <div className="relative group/code">
                                        <SyntaxHighlighter
                                            style={isDark ? vscDarkPlus : vs}
                                            language={match[1]}
                                            PreTag="div"
                                            className="rounded-lg !mt-2 !mb-2"
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, "")}
                                        </SyntaxHighlighter>
                                    </div>
                                ) : (
                                    <code
                                        className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
                                        {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-current/10">
                    <span className="text-xs opacity-60">
                        {formatDate(new Date(message.timestamp))}
                    </span>
                    <button
                        onClick={handleCopy}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-current/10 rounded"
                        aria-label="Copy message"
                    >
                        {copied ? (
                            <Check className="w-3.5 h-3.5" />
                        ) : (
                            <Copy className="w-3.5 h-3.5" />
                        )}
                    </button>
                </div>
            </div>

            {isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-foreground" />
                </div>
            )}
        </div>
    );
}
