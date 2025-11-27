import { NextResponse } from "next/server";
import templatesData from "@/data/templates.json";

export async function GET() {
    return NextResponse.json({ templates: templatesData });
}

export async function POST(request: Request) {
    try {
        const template = await request.json();
        // In a real app, this would save to a database
        return NextResponse.json({ success: true, template });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create template" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        // In a real app, this would delete from a database
        return NextResponse.json({ success: true, id });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete template" },
            { status: 500 }
        );
    }
}
