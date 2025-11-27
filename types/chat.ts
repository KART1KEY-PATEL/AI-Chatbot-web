export type MessageRole = "user" | "assistant" | "system";

export interface Message {
    id: string;
    role: MessageRole;
    content: string;
    timestamp: Date;
    model?: string;
}

export interface ChatParameters {
    temperature: number;
    maxTokens: number;
    topP: number;
}

export interface PromptTemplate {
    id: string;
    name: string;
    prompt: string;
    category: string;
    createdAt?: Date;
}

export interface ChatState {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    selectedModel: string;
    parameters: ChatParameters;
    templates: PromptTemplate[];
}

export interface ChatRequest {
    messages: Message[];
    model: string;
    parameters: ChatParameters;
}

export interface ChatResponse {
    message: Message;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}
