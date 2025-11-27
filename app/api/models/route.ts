import { NextResponse } from "next/server";
import modelsData from "@/data/models.json";

export async function GET() {
    return NextResponse.json({ models: modelsData });
}
