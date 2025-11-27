/**
 * Application constants
 */

export const APP_NAME = "AI Chat Interface";
export const APP_DESCRIPTION = "A polished AI chat interface prototype";

export const STORAGE_KEYS = {
    THEME: "ai-chat-theme",
    AUTH: "ai-chat-auth",
    TEMPLATES: "ai-chat-templates",
    CHAT_HISTORY: "ai-chat-history",
    SELECTED_MODEL: "ai-chat-model",
    PARAMETERS: "ai-chat-parameters",
} as const;

export const DEFAULT_PARAMETERS = {
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.9,
} as const;

export const PARAMETER_LIMITS = {
    temperature: { min: 0, max: 2, step: 0.1 },
    maxTokens: { min: 1, max: 4096, step: 1 },
    topP: { min: 0, max: 1, step: 0.01 },
} as const;

export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    CHAT: "/chat",
} as const;
