import { prisma } from "@/app/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import type { Book } from "@/app/types/types";
import { Genre, Condition } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const allBooks = await prisma.book.findMany();
    return NextResponse.json(allBooks);
  } catch (e) {
    return NextResponse.json(e);
  }
}
