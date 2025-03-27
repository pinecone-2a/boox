import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { pusher } from "@/app/lib/pusher";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const matchId = searchParams.get("matchId");

    if (!matchId) {
        return NextResponse.json({ error: "Missing matchId" }, { status: 400 });
    }

    try {
        const messages = await prisma.message.findMany({
            where: { matchId },
            orderBy: { createdAt: "asc" },
        });

        return NextResponse.json(messages, { status: 200 });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { matchId, senderId, receiverId, text } = await req.json();
        console.log({ matchId, senderId, receiverId, text });

        if (!matchId || !senderId || !receiverId || !text) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const message = await prisma.message.create({
            data: { matchId, senderId, receiverId, text },
        });

        await pusher.trigger(`chat-${matchId}`, "new-message", message);

        return NextResponse.json(message, { status: 201 });
    } catch (error) {
        console.error("Error sending message:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
