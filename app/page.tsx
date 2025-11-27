"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, Zap, Settings, FileText, Moon, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/lib/constants";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push(ROUTES.CHAT);
    } else {
      router.push(ROUTES.LOGIN);
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: "Multiple AI Models",
      description: "Choose from GPT-3.5, GPT-4, Llama 2, Mistral, and more",
    },
    {
      icon: Settings,
      title: "Fine-tune Parameters",
      description: "Adjust temperature, max tokens, and top-p for perfect responses",
    },
    {
      icon: FileText,
      title: "Template Management",
      description: "Save and reuse your favorite prompts with custom templates",
    },
    {
      icon: Moon,
      title: "Dark Mode",
      description: "Beautiful light and dark themes with smooth transitions",
    },
    {
      icon: Download,
      title: "Export Conversations",
      description: "Download your chat history as JSON for later reference",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with real-time typing indicators",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-2xl">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AI Chat Interface
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A polished, feature-rich AI assistant prototype combining the best
            features from leading AI platforms
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="text-lg px-8 py-6"
            >
              <Sparkles className="w-5 h-5" />
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("https://github.com", "_blank")}
              className="text-lg px-8 py-6"
            >
              View on GitHub
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="mt-16 pt-16 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Built with</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-card border border-border rounded-lg">
                Next.js 16
              </span>
              <span className="px-4 py-2 bg-card border border-border rounded-lg">
                React 19
              </span>
              <span className="px-4 py-2 bg-card border border-border rounded-lg">
                TypeScript
              </span>
              <span className="px-4 py-2 bg-card border border-border rounded-lg">
                Tailwind CSS 4
              </span>
              <span className="px-4 py-2 bg-card border border-border rounded-lg">
                Framer Motion
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

