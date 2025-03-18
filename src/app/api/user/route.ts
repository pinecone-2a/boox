import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { clerkId, email, firstName, lastName } = await req.json();

    await prisma.user.upsert({
      where: { clerkId },
      update: { email, name: firstName },
      create: { clerkId, email, name: firstName },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
