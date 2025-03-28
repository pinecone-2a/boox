-- CreateTable
CREATE TABLE "MatchRequest" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "status1" "MatchStatus" NOT NULL,
    "status2" "MatchStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MatchRequest" ADD CONSTRAINT "MatchRequest_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchRequest" ADD CONSTRAINT "MatchRequest_user1Id_fkey" FOREIGN KEY ("matchId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchRequest" ADD CONSTRAINT "MatchRequest_user2Id_fkey" FOREIGN KEY ("matchId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
