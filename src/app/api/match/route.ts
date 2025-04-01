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
            data: { status},
            include: { like1: true, like2: true },
        });
        
        if (updatedMatch) {
            if(status === 'ACCEPTED'){
                const book1Id = updatedMatch.like1.bookId;
                const book2Id = updatedMatch.like2.bookId;
                await prisma.book.updateMany({
                    where: {
                        id: { in: [book1Id, book2Id] },
                    },
                    data: { status: "PASSIVE" },
                });
                await prisma.swipe.updateMany({
                    where: {
                        id: { in: [updatedMatch.like1.id, updatedMatch.like2.id] },
                    },
                    data: { status: "PASSIVE" },
                });
                await prisma.match.updateMany({
                    where: {
                        status: "PENDING",
                        OR: [
                            { like1: { bookId: book1Id } },
                            { like1: { bookId: book2Id } },
                            { like2: { bookId: book1Id } },
                            { like2: { bookId: book2Id } },
                        ],
                    },
                    data: { status: "REJECTED" },
                });
            }else{
                await prisma.swipe.updateMany({
                    where: {
                        id: { in: [updatedMatch.like1.id, updatedMatch.like2.id] },
                    },
                    data: { status: "PASSIVE" },
                });
            }
        }
        return NextResponse.json(updatedMatch);
    } catch (error) {
        console.error("Error fetching matches:", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}