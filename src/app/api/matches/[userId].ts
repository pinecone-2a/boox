// pages/api/matches/[userId].ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query as { userId: string };

  if (req.method === "GET") {
    const matches = await prisma.match.findMany({
      where: {
        OR: [{ like1: { userId } }, { like2: { userId } }],
        status: "ACCEPTED",
      },
      include: { like1: true, like2: true, messages: true },
    });
    res.status(200).json(matches);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
