import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

const meta: Meta<typeof Modal> = {
    title: "UI/Modal",
    component: Modal,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Wrapper component to handle state
function ModalWrapper(args: any) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}

export const Basic: Story = {
    render: (args) => <ModalWrapper {...args} />,
    args: {
        title: "Basic Modal",
        description: "This is a basic modal example",
        children: (
            <div>
                <p>This is the modal content. You can put anything here.</p>
            </div>
        ),
    },
};

export const WithFooter: Story = {
    render: (args) => <ModalWrapper {...args} />,
    args: {
        title: "Modal with Footer",
        description: "This modal has action buttons in the footer",
        children: (
            <div>
                <p>Are you sure you want to perform this action?</p>
            </div>
        ),
        footer: (
            <>
                <Button variant="ghost">Cancel</Button>
                <Button variant="danger">Delete</Button>
            </>
        ),
    },
};

export const Small: Story = {
    render: (args) => <ModalWrapper {...args} />,
    args: {
        title: "Small Modal",
        size: "sm",
        children: <p>This is a small modal.</p>,
    },
};

export const Large: Story = {
    render: (args) => <ModalWrapper {...args} />,
    args: {
        title: "Large Modal",
        size: "lg",
        children: (
            <div>
                <p>This is a large modal with more content.</p>
                <p>It can contain multiple paragraphs and elements.</p>
            </div>
        ),
    },
};

export const LongContent: Story = {
    render: (args) => <ModalWrapper {...args} />,
    args: {
        title: "Modal with Long Content",
        description: "This demonstrates scrolling behavior",
        children: (
            <div className="space-y-4">
                {Array.from({ length: 20 }).map((_, i) => (
                    <p key={i}>
                        This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit.
                    </p>
                ))}
            </div>
        ),
    },
};
