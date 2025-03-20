import { prisma } from "@/app/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import type { Book } from "@/app/types/types";
import { Genre, Condition } from "@prisma/client";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { printCustomRoutes } from "next/dist/build/utils";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  try {
    const myBooks = await prisma.book.findMany({
      where: {
        id: user?.id,
      },
    });
    return NextResponse.json(myBooks);
  } catch (e) {
    console.log(e);
  }
}

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  try {
    const bookData: Book = await req.json();

    const book = await prisma.book.create({
      data: {
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre as Genre,
        description: bookData.description,
        condition: bookData.condition as Condition,
        cover: bookData.cover,
        ownerId: user.id,
      },
    });
    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
