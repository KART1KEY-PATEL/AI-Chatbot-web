"use client";

import * as React from "react";
import { Settings, ChevronDown } from "lucide-react";
import { Slider } from "../ui/Slider";
import { useChat } from "@/contexts/ChatContext";
import { PARAMETER_LIMITS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ParametersPanel() {
    const { parameters, updateParameters } = useChat();
    const [isExpanded, setIsExpanded] = React.useState(true);

    return (
        <div className="border-b border-[hsl(var(--sidebar-border))]">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold">Parameters</h3>
                </div>
                <ChevronDown
                    className={cn(
                        "w-4 h-4 transition-transform",
                        isExpanded && "rotate-180"
                    )}
                />
            </button>

            {isExpanded && (
                <div className="px-4 pb-4 space-y-6">
                    <Slider
                        label="Temperature"
                        description="Controls randomness. Higher = more creative"
                        value={parameters.temperature}
                        onChange={(value) => updateParameters({ temperature: value })}
                        min={PARAMETER_LIMITS.temperature.min}
                        max={PARAMETER_LIMITS.temperature.max}
                        step={PARAMETER_LIMITS.temperature.step}
                    />

                    <Slider
                        label="Max Tokens"
                        description="Maximum length of the response"
                        value={parameters.maxTokens}
                        onChange={(value) => updateParameters({ maxTokens: value })}
                        min={PARAMETER_LIMITS.maxTokens.min}
                        max={PARAMETER_LIMITS.maxTokens.max}
                        step={PARAMETER_LIMITS.maxTokens.step}
                    />

                    <Slider
                        label="Top P"
                        description="Controls diversity via nucleus sampling"
                        value={parameters.topP}
                        onChange={(value) => updateParameters({ topP: value })}
                        min={PARAMETER_LIMITS.topP.min}
                        max={PARAMETER_LIMITS.topP.max}
                        step={PARAMETER_LIMITS.topP.step}
                    />
                </div>
            )}
        </div>
    );
}
