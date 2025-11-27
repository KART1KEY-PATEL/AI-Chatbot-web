"use client";

import * as React from "react";
import { ChatBubble } from "./ChatBubble";
import { TypingIndicator } from "./TypingIndicator";
import type { Message } from "@/types/chat";
import { cn } from "@/lib/utils";

export interface ChatContainerProps {
    messages: Message[];
    isLoading?: boolean;
    className?: string;
}

export function ChatContainer({
    messages,
    isLoading = false,
    className,
}: ChatContainerProps) {
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    if (messages.length === 0 && !isLoading) {
        return (
            <div className={cn("flex items-center justify-center h-full", className)}>
                <div className="text-center space-y-3 max-w-md">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Start a conversation</h3>
                    <p className="text-sm text-muted-foreground">
                        Send a message to begin chatting with the AI assistant. You can ask
                        questions, request code reviews, or get help with any task.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4", className)}>
            {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
        </div>
    );
}
