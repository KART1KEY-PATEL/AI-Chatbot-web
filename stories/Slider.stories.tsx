import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@/components/ui/Slider";
import { useState } from "react";

const meta: Meta<typeof Slider> = {
    title: "UI/Slider",
    component: Slider,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Slider>;

// Wrapper component to handle state
function SliderWrapper(args: any) {
    const [value, setValue] = useState(args.value);
    return <Slider {...args} value={value} onChange={setValue} />;
}

export const Temperature: Story = {
    render: (args) => <SliderWrapper {...args} />,
    args: {
        label: "Temperature",
        description: "Controls randomness. Higher = more creative",
        value: 0.7,
        min: 0,
        max: 2,
        step: 0.1,
        showValue: true,
    },
};

export const MaxTokens: Story = {
    render: (args) => <SliderWrapper {...args} />,
    args: {
        label: "Max Tokens",
        description: "Maximum length of the response",
        value: 2048,
        min: 1,
        max: 4096,
        step: 1,
        showValue: true,
    },
};

export const TopP: Story = {
    render: (args) => <SliderWrapper {...args} />,
    args: {
        label: "Top P",
        description: "Controls diversity via nucleus sampling",
        value: 0.9,
        min: 0,
        max: 1,
        step: 0.01,
        showValue: true,
    },
};

export const WithoutValue: Story = {
    render: (args) => <SliderWrapper {...args} />,
    args: {
        label: "Simple Slider",
        value: 50,
        min: 0,
        max: 100,
        step: 1,
        showValue: false,
    },
};
