import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(req:NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId as string);
    return NextResponse.json({ imageUrl: user.imageUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ imageUrl: "" }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { clerkId, email, firstName } = await req.json();

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
