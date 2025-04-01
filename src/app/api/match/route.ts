import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { Match } from "@prisma/client";

export async function GET(request: NextRequest) {
    const { userId } = getAuth(request);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    };

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
    });
    
    if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
    };

    try {
        const matches = await prisma.match.findMany({
            where: {
                status: "PENDING",
                OR: [
                    { like1: { userId: user.id } },
                    { like2: { userId: user.id } },
                ],
            },
            include: {
                like1: { include: { book: true, user: true } },
                like2: { include: { book: true, user: true } },
            },
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(matches);
    } catch (error) {
        console.error("Error fetching matches:", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(request:NextRequest) {
    const { userId } = getAuth(request);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    };

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
    });
    
    if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
    };

    try {
        const {matchId,status} = await request.json();
        const updatedMatch = await prisma.match.update({
            where: { id: matchId },
            data: { status },
        });
        console.log("Match status updated:", updatedMatch);
        return NextResponse.json(updatedMatch);
    } catch (error) {
        console.error("Error fetching matches:", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}