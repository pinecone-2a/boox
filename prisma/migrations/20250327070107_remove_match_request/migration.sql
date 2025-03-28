/*
  Warnings:

  - You are about to drop the `MatchRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MatchRequest" DROP CONSTRAINT "MatchRequest_matchId_fkey";

-- DropForeignKey
ALTER TABLE "MatchRequest" DROP CONSTRAINT "MatchRequest_user1Id_fkey";

-- DropForeignKey
ALTER TABLE "MatchRequest" DROP CONSTRAINT "MatchRequest_user2Id_fkey";

-- DropTable
DROP TABLE "MatchRequest";
