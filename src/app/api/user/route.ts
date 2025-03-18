import { prisma } from "@/app/lib/db";

async function GET(request: Request) {
  const users = await prisma.user.findMany();
  return new Response(JSON.stringify(users), { status: 200 });
}

async function POST(request: Request) {
  const body = await request.json();
  try {
    const user = await prisma.user.create({ data: body });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

async function PUT(request: Request) {
  const body = await request.json();
  try {
    const user = await prisma.user.update({
      where: { id: body.id },
      data: body,
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

async function DELETE(request: Request) {
  const body = await request.json();
  try {
    const user = await prisma.user.delete({ where: { id: body.id } });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
