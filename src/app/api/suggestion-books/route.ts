import { prisma } from "@/app/lib/db";

export async function GET(request: Request) {
    try {
        const books = await prisma.book.findMany();
        return new Response(JSON.stringify(books), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}