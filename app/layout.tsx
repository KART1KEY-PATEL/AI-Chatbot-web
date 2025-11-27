import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChatProvider } from "@/contexts/ChatContext";

export const metadata: Metadata = {
  title: "AI Chat Interface - Polished AI Assistant",
  description: "A modern, feature-rich AI chat interface prototype with model selection, parameter controls, and template management",
  keywords: ["AI", "Chat", "Assistant", "Machine Learning", "Hugging Face"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <AuthProvider>
            <ChatProvider>
              {children}
            </ChatProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

