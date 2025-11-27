"use client";

import * as React from "react";
import { storage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
    undefined
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = React.useState<Theme>("light");
    const [mounted, setMounted] = React.useState(false);

    // Initialize theme from localStorage or system preference
    React.useEffect(() => {
        const stored = storage.get<Theme>(STORAGE_KEYS.THEME);
        if (stored) {
            setThemeState(stored);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setThemeState("dark");
        }
        setMounted(true);
    }, []);

    // Apply theme to document
    React.useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        storage.set(STORAGE_KEYS.THEME, theme);
    }, [theme, mounted]);

    const toggleTheme = () => {
        setThemeState((prev) => (prev === "light" ? "dark" : "light"));
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    // Prevent flash of unstyled content
    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = React.useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
