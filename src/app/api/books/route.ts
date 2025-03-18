import { prisma } from "@/app/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

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
    const { name, image, author, description, genre, condition } =
      await req.json();

    const book = await prisma.book.create({
      data: {
        title: name,
        cover: image,
        author,
        description,
        genre,
        condition,
        ownerId: user.id,
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
