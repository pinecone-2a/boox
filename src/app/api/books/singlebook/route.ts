import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "NO_ID_PROVIDED" }, { status: 400 });
    }

    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) {
      return NextResponse.json({ message: "Ном олдсонгүй!" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (e) {
    console.error("Error fetching book:", e);
    return NextResponse.json(
      { message: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, author, genre, description, condition, cover } = body;
    console.log(cover);
    if (!id) {
      return NextResponse.json({ message: "NO_ID_PROVIDED" }, { status: 400 });
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: { title, author, genre, description, condition, cover },
    });

    return NextResponse.json(updatedBook);
  } catch (e) {
    console.error("Error updating book:", e);
    return NextResponse.json(
      { message: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "NO_ID_PROVIDED" }, { status: 400 });
    }
    const book = await prisma.book.delete({ where: { id } });
    return NextResponse.json({ message: "book deleted successfully" });
  } catch (e) {
    console.error("Error fetching book:", e);
    return NextResponse.json(
      { message: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}
export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "NO_ID_PROVIDED" }, { status: 400 });
    }
    await prisma.book.update({
        where: {
          id
        },
        data: { status: "PASSIVE" },
    });
    await prisma.swipe.updateMany({
      where: {
        bookId:id
      },
      data: { status: "PASSIVE" },
    });
    await prisma.match.updateMany({
      where: {
          status: "PENDING",
          OR: [
            { like1: { bookId: id } },
            { like2: { bookId: id } }
          ],
      },
      data: { status: "REJECTED" },
    });
    return NextResponse.json({ message: "book deleted successfully" });
  } catch (e) {
    console.error("Error fetching book:", e);
    return NextResponse.json(
      { message: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}
