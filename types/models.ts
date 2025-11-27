export interface AIModel {
    id: string;
    name: string;
    description: string;
    maxTokens: number;
    provider: string;
    icon?: string;
}

export interface ModelResponse {
    models: AIModel[];
}
