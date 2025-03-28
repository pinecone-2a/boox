/*
  Warnings:

  - A unique constraint covering the columns `[user1Id,user2Id]` on the table `MatchRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user1Id` to the `MatchRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2Id` to the `MatchRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchRequest" ADD COLUMN     "user1Id" TEXT NOT NULL,
ADD COLUMN     "user2Id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MatchRequest_user1Id_user2Id_key" ON "MatchRequest"("user1Id", "user2Id");
