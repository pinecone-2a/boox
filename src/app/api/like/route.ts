import { prisma } from "@/app/lib/db";
import { Swipe } from "@/app/types/types";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  try {
    const books = await prisma.swipe.findMany({
      where: {
        user: { clerkId: { not: userId ?? "" } }, 
        liked: true },
    });
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });
  
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  try{
    const swipeData:Swipe = await request.json();
    const swipe = await prisma.swipe.create({
      data: {
        bookId:swipeData.bookId,
        userId: user.id,
        liked:swipeData.liked
      }
    });
    return NextResponse.json(swipe);
  }catch(error){
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
