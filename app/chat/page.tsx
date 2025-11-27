"use client";

import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { MessageInput } from "@/components/chat/MessageInput";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useChat } from "@/contexts/ChatContext";

export default function ChatPage() {
    const { messages, isLoading, sendMessage } = useChat();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <ProtectedRoute>
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                {/* Main content */}
                <div className="flex-1 flex flex-col">
                    <Header
                        onMenuClick={() => setIsSidebarOpen(true)}
                        showMenuButton
                    />

                    <div className="flex-1 flex flex-col overflow-hidden">
                        <ChatContainer messages={messages} isLoading={isLoading} />
                        <MessageInput
                            onSend={sendMessage}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
