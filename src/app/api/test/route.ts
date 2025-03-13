import { prisma } from "@/app/lib/db";

export async function GET(request: Request) {
    try {
        const user = await prisma.user.create({
            data: {
                name: "John Doe",
                email: "john@example.com",
            },
        });
        console.log("User created:", user);

        return new Response(JSON.stringify(user), { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
