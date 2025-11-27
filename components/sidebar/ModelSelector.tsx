"use client";

import * as React from "react";
import { Cpu } from "lucide-react";
import { Select, type SelectOption } from "../ui/Select";
import { useChat } from "@/contexts/ChatContext";
import type { AIModel } from "@/types/models";

export function ModelSelector() {
    const { selectedModel, setSelectedModel } = useChat();
    const [models, setModels] = React.useState<AIModel[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch("/api/models")
            .then((res) => res.json())
            .then((data) => {
                setModels(data.models);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Failed to load models:", error);
                setIsLoading(false);
            });
    }, []);

    const options: SelectOption[] = models.map((model) => ({
        value: model.id,
        label: model.name,
        description: model.description,
    }));

    if (isLoading) {
        return (
            <div className="p-4 border-b border-border">
                <div className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-20 mb-2" />
                    <div className="h-10 bg-muted rounded" />
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 border-b border-[hsl(var(--sidebar-border))]">
            <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold">Model</h3>
            </div>
            <Select
                value={selectedModel}
                onChange={setSelectedModel}
                options={options}
                placeholder="Select a model"
            />
            {selectedModel && (
                <div className="mt-2 text-xs text-muted-foreground">
                    {models.find((m) => m.id === selectedModel)?.provider}
                </div>
            )}
        </div>
    );
}
