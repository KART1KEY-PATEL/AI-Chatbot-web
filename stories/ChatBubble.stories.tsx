import type { Meta, StoryObj } from "@storybook/react";
import { ChatBubble } from "@/components/chat/ChatBubble";
import type { Message } from "@/types/chat";

const meta: Meta<typeof ChatBubble> = {
    title: "Chat/ChatBubble",
    component: ChatBubble,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

const userMessage: Message = {
    id: "1",
    role: "user",
    content: "Hello! Can you help me with some code?",
    timestamp: new Date(),
};

const assistantMessage: Message = {
    id: "2",
    role: "assistant",
    content: "Of course! I'd be happy to help you with your code. What do you need assistance with?",
    timestamp: new Date(),
};

const codeMessage: Message = {
    id: "3",
    role: "assistant",
    content: `Here's an example of a React component:

\`\`\`javascript
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default Greeting;
\`\`\`

This component takes a \`name\` prop and displays a greeting.`,
    timestamp: new Date(),
};

const markdownMessage: Message = {
    id: "4",
    role: "assistant",
    content: `# Markdown Support

This message demonstrates **markdown** formatting:

- **Bold text**
- *Italic text*
- \`inline code\`
- [Links](https://example.com)

## Lists

1. First item
2. Second item
3. Third item`,
    timestamp: new Date(),
};

export const UserMessage: Story = {
    args: {
        message: userMessage,
    },
};

export const AssistantMessage: Story = {
    args: {
        message: assistantMessage,
    },
};

export const WithCode: Story = {
    args: {
        message: codeMessage,
    },
};

export const WithMarkdown: Story = {
    args: {
        message: markdownMessage,
    },
};

export const LongMessage: Story = {
    args: {
        message: {
            id: "5",
            role: "assistant",
            content: "This is a very long message that demonstrates how the chat bubble handles lengthy content. ".repeat(10),
            timestamp: new Date(),
        },
    },
};
