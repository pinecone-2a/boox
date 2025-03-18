import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "no query params" });
    }
    const { title, cover, author, genre, condition } = await req.json();
    const newBook = await prisma.book.create({
      data: {
        title,
        cover,
        author,
        genre,
        condition,
        ownerId: id,
      },
    });
    return new Response(JSON.stringify(newBook), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating books:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
