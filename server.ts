// server.ts
import { createServer, IncomingMessage, ServerResponse } from "http";
import { Server, Socket } from "socket.io";
import next from "next";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";
import { parse } from "cookie";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const prisma = new PrismaClient();

interface JoinMatchPayload {
  matchId: string;
  userId: string;
}

interface SendMessagePayload {
  matchId: string;
  senderId: string;
  receiverId: string;
  text: string;
}

interface ErrorPayload {
  message: string;
}

app.prepare().then(() => {
  const server = createServer(
    async (req: IncomingMessage, res: ServerResponse) => {
      console.log(`Request received: ${req.url}`);

      // Parse cookies from the request headers
      const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};

      // Create a RequestLike object for Clerk
      const clerkReq = {
        ...req,
        cookies, // Add cookies to satisfy RequestLike
        headers: req.headers, // Ensure headers are passed
      } as const;

      // Get authentication data from Clerk
      const { userId } = getAuth(clerkReq);

      // Protect the /chat/* routes
      if (req.url?.startsWith("/chat/") && !userId) {
        res.writeHead(302, { Location: "/sign-in" });
        res.end();
        return;
      }

      // Forward request to Next.js
      await handle(req, res);
    }
  );

  const io = new Server(server);

  io.on("connection", (socket: Socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinMatch", async ({ matchId, userId }: JoinMatchPayload) => {
      const match = await prisma.match.findUnique({
        where: { id: matchId },
        include: { like1: true, like2: true },
      });

      if (
        !match ||
        (match.like1.userId !== userId && match.like2.userId !== userId)
      ) {
        socket.emit("error", {
          message: "Invalid match or user",
        } as ErrorPayload);
        return;
      }

      socket.join(matchId);
      socket.emit("joined", { matchId });
    });

    socket.on(
      "sendMessage",
      async ({ matchId, senderId, receiverId, text }: SendMessagePayload) => {
        const message = await prisma.message.create({
          data: {
            matchId,
            senderId,
            receiverId,
            text,
          },
        });

        io.to(matchId).emit("message", message);
      }
    );

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err?: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
