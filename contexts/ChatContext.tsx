"use client";

import * as React from "react";
import { storage } from "@/lib/storage";
import { STORAGE_KEYS, DEFAULT_PARAMETERS } from "@/lib/constants";
import { generateId } from "@/lib/utils";
import type {
    Message,
    ChatParameters,
    PromptTemplate,
    ChatState,
} from "@/types/chat";

interface ChatContextType extends ChatState {
    sendMessage: (content: string) => Promise<void>;
    clearMessages: () => void;
    setSelectedModel: (model: string) => void;
    updateParameters: (params: Partial<ChatParameters>) => void;
    loadTemplate: (template: PromptTemplate) => void;
    saveTemplate: (template: Omit<PromptTemplate, "id" | "createdAt">) => void;
    deleteTemplate: (id: string) => void;
}

const ChatContext = React.createContext<ChatContextType | undefined>(
    undefined
);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = React.useState<ChatState>({
        messages: [],
        isLoading: false,
        error: null,
        selectedModel: "gpt-3.5-turbo",
        parameters: DEFAULT_PARAMETERS,
        templates: [],
    });

    // Load saved state from localStorage
    React.useEffect(() => {
        const savedModel = storage.get<string>(STORAGE_KEYS.SELECTED_MODEL);
        const savedParams = storage.get<ChatParameters>(STORAGE_KEYS.PARAMETERS);
        const savedTemplates = storage.get<PromptTemplate[]>(STORAGE_KEYS.TEMPLATES);

        setState((prev) => ({
            ...prev,
            selectedModel: savedModel || prev.selectedModel,
            parameters: savedParams || prev.parameters,
            templates: savedTemplates || [],
        }));
    }, []);

    // Save state to localStorage
    React.useEffect(() => {
        storage.set(STORAGE_KEYS.SELECTED_MODEL, state.selectedModel);
        storage.set(STORAGE_KEYS.PARAMETERS, state.parameters);
        storage.set(STORAGE_KEYS.TEMPLATES, state.templates);
    }, [state.selectedModel, state.parameters, state.templates]);

    const sendMessage = async (content: string) => {
        const userMessage: Message = {
            id: generateId(),
            role: "user",
            content,
            timestamp: new Date(),
        };

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, userMessage],
            isLoading: true,
            error: null,
        }));

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...state.messages, userMessage],
                    model: state.selectedModel,
                    parameters: state.parameters,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to get response from AI");
            }

            const data = await response.json();
            const assistantMessage: Message = data.message;

            setState((prev) => ({
                ...prev,
                messages: [...prev.messages, assistantMessage],
                isLoading: false,
            }));
        } catch (error) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : "An error occurred",
            }));
        }
    };

    const clearMessages = () => {
        setState((prev) => ({ ...prev, messages: [] }));
    };

    const setSelectedModel = (model: string) => {
        setState((prev) => ({ ...prev, selectedModel: model }));
    };

    const updateParameters = (params: Partial<ChatParameters>) => {
        setState((prev) => ({
            ...prev,
            parameters: { ...prev.parameters, ...params },
        }));
    };

    const loadTemplate = (template: PromptTemplate) => {
        // This would typically set the input field value
        // For now, we'll just trigger a custom event
        window.dispatchEvent(
            new CustomEvent("loadTemplate", { detail: template.prompt })
        );
    };

    const saveTemplate = (
        template: Omit<PromptTemplate, "id" | "createdAt">
    ) => {
        const newTemplate: PromptTemplate = {
            ...template,
            id: generateId(),
            createdAt: new Date(),
        };

        setState((prev) => ({
            ...prev,
            templates: [...prev.templates, newTemplate],
        }));
    };

    const deleteTemplate = (id: string) => {
        setState((prev) => ({
            ...prev,
            templates: prev.templates.filter((t) => t.id !== id),
        }));
    };

    return (
        <ChatContext.Provider
            value={{
                ...state,
                sendMessage,
                clearMessages,
                setSelectedModel,
                updateParameters,
                loadTemplate,
                saveTemplate,
                deleteTemplate,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = React.useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
}
