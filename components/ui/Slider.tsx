"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    label: string;
    description?: string;
    className?: string;
    showValue?: boolean;
}

export function Slider({
    value,
    onChange,
    min,
    max,
    step,
    label,
    description,
    className,
    showValue = true,
}: SliderProps) {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex items-center justify-between">
                <div>
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {label}
                    </label>
                    {description && (
                        <p className="text-xs text-muted-foreground mt-1">{description}</p>
                    )}
                </div>
                {showValue && (
                    <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                        {value}
                    </span>
                )}
            </div>
            <div className="relative">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider-thumb"
                    style={{
                        background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${percentage}%, hsl(var(--secondary)) ${percentage}%, hsl(var(--secondary)) 100%)`,
                    }}
                />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{min}</span>
                <span>{max}</span>
            </div>
            <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
          border: 2px solid hsl(var(--background));
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
        }

        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .slider-thumb::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
          border: 2px solid hsl(var(--background));
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
        }

        .slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
        </div>
    );
}
