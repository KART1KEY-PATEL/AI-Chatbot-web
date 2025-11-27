import { NextResponse } from "next/server";
import type { Message } from "@/types/chat";

export async function POST(request: Request) {
    try {
        const { messages, model, parameters } = await request.json();

        // Mock AI response for demo purposes
        // In production, this would call Hugging Face API or another AI service
        const mockResponses = [
            "I'm a mock AI assistant. In production, I would be powered by Hugging Face's Inference API or another AI service. This is a demo response to show the chat interface functionality.",
            "Here's an example of how I can help with code:\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));\n```\n\nThis demonstrates syntax highlighting in the chat interface.",
            "I can provide detailed explanations, help with debugging, write documentation, and much more. The interface supports markdown formatting, code blocks, and various other features.",
            "**Key Features:**\n\n1. Markdown support\n2. Code syntax highlighting\n3. Copy to clipboard\n4. Export conversations\n5. Customizable parameters\n6. Template management",
        ];

        const randomResponse =
            mockResponses[Math.floor(Math.random() * mockResponses.length)];

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

        const assistantMessage: Message = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            role: "assistant",
            content: randomResponse,
            timestamp: new Date(),
            model,
        };

        return NextResponse.json({
            message: assistantMessage,
            usage: {
                promptTokens: 50,
                completionTokens: 100,
                totalTokens: 150,
            },
        });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: "Failed to process chat request" },
            { status: 500 }
        );
    }
}

// Uncomment and configure this for real Hugging Face API integration:
/*
export async function POST(request: Request) {
  try {
    const { messages, model, parameters } = await request.json();
    const apiKey = process.env.NEXT_PUBLIC_HF_API_KEY;

    if (!apiKey) {
      throw new Error("Hugging Face API key not configured");
    }

    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: messages[messages.length - 1].content,
          parameters: {
            temperature: parameters.temperature,
            max_new_tokens: parameters.maxTokens,
            top_p: parameters.topP,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.statusText}`);
    }

    const data = await response.json();
    const assistantMessage: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: "assistant",
      content: data[0]?.generated_text || "No response generated",
      timestamp: new Date(),
      model,
    };

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
*/
