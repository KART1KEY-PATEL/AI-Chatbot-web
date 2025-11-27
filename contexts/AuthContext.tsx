"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import { STORAGE_KEYS, ROUTES } from "@/lib/constants";
import type { User, AuthState, LoginCredentials } from "@/types/auth";

interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [state, setState] = React.useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    // Initialize auth state from localStorage
    React.useEffect(() => {
        const storedUser = storage.get<User>(STORAGE_KEYS.AUTH);
        if (storedUser) {
            setState({
                user: storedUser,
                isAuthenticated: true,
                isLoading: false,
            });
        } else {
            setState((prev) => ({ ...prev, isLoading: false }));
        }
    }, []);

    const login = async (credentials: LoginCredentials) => {
        // Mock authentication - in real app, this would call an API
        setState((prev) => ({ ...prev, isLoading: true }));

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Create mock user
        const user: User = {
            id: "1",
            email: credentials.email,
            name: credentials.email.split("@")[0] || "User",
        };

        storage.set(STORAGE_KEYS.AUTH, user);
        setState({
            user,
            isAuthenticated: true,
            isLoading: false,
        });

        router.push(ROUTES.CHAT);
    };

    const logout = () => {
        storage.remove(STORAGE_KEYS.AUTH);
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
        router.push(ROUTES.LOGIN);
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
