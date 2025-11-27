"use client";

import * as React from "react";
import { Moon, Sun, Download, LogOut, Menu, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/contexts/ChatContext";
import { Button } from "../ui/Button";
import { downloadJSON } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";

interface HeaderProps {
    onMenuClick?: () => void;
    showMenuButton?: boolean;
}

export function Header({ onMenuClick, showMenuButton = false }: HeaderProps) {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const { messages } = useChat();

    const handleExport = () => {
        downloadJSON(
            {
                messages,
                exportedAt: new Date().toISOString(),
            },
            `chat-export-${Date.now()}.json`
        );
    };

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    {showMenuButton && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onMenuClick}
                            className="lg:hidden"
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                    )}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                            <svg
                                className="w-5 h-5 text-primary-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-lg font-bold">{APP_NAME}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {messages.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleExport}
                            className="hidden sm:flex"
                        >
                            <Download className="w-4 h-4" />
                            Export
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? (
                            <Moon className="w-5 h-5" />
                        ) : (
                            <Sun className="w-5 h-5" />
                        )}
                    </Button>

                    {user && (
                        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border">
                            <div className="hidden sm:block text-right">
                                <div className="text-sm font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">
                                    {user.email}
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={logout}
                                aria-label="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
