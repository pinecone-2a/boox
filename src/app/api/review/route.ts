import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { Review } from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        const review:Review = await req.json();
        const reviewed = await prisma.review.create({
            data: {
              ...review,
            },
          });
        return NextResponse.json(reviewed);
    } catch (error) {
        console.error("Error sending message:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
