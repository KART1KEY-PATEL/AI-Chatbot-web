import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/Button";

const meta: Meta<typeof Button> = {
    title: "UI/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["primary", "secondary", "ghost", "danger", "outline"],
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg", "icon"],
        },
        isLoading: {
            control: "boolean",
        },
        disabled: {
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: "Primary Button",
        variant: "primary",
        size: "md",
    },
};

export const Secondary: Story = {
    args: {
        children: "Secondary Button",
        variant: "secondary",
        size: "md",
    },
};

export const Ghost: Story = {
    args: {
        children: "Ghost Button",
        variant: "ghost",
        size: "md",
    },
};

export const Danger: Story = {
    args: {
        children: "Danger Button",
        variant: "danger",
        size: "md",
    },
};

export const Outline: Story = {
    args: {
        children: "Outline Button",
        variant: "outline",
        size: "md",
    },
};

export const Small: Story = {
    args: {
        children: "Small Button",
        size: "sm",
    },
};

export const Large: Story = {
    args: {
        children: "Large Button",
        size: "lg",
    },
};

export const Loading: Story = {
    args: {
        children: "Loading Button",
        isLoading: true,
    },
};

export const Disabled: Story = {
    args: {
        children: "Disabled Button",
        disabled: true,
    },
};

export const WithIcon: Story = {
    args: {
        children: (
            <>
                <svg
                    className="w-4 h-4"
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
                Button with Icon
            </>
        ),
    },
};
