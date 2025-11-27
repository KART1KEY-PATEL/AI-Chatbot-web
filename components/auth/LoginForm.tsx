"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export function LoginForm() {
    const { login, isLoading } = useAuth();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            await login({ email, password });
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-card border border-border rounded-2xl shadow-2xl p-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-primary-foreground" />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
                        <p className="text-muted-foreground">
                            Sign in to continue to AI Chat
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="text-sm font-medium mb-2 block">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="pl-10"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-10"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            isLoading={isLoading}
                            disabled={isLoading}
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Demo credentials */}
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground text-center">
                            <strong>Demo:</strong> Use any email and password to login
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-muted-foreground mt-8">
                    This is a prototype with mock authentication
                </p>
            </motion.div>
        </div>
    );
}
