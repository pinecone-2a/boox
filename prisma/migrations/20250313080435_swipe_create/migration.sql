/*
  Warnings:

  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Unlike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_like1Id_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_like2Id_fkey";

-- DropForeignKey
ALTER TABLE "Unlike" DROP CONSTRAINT "Unlike_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Unlike" DROP CONSTRAINT "Unlike_userId_fkey";

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "Unlike";

-- CreateTable
CREATE TABLE "Swipe" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "liked" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Swipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Swipe" ADD CONSTRAINT "Swipe_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Swipe" ADD CONSTRAINT "Swipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_like1Id_fkey" FOREIGN KEY ("like1Id") REFERENCES "Swipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_like2Id_fkey" FOREIGN KEY ("like2Id") REFERENCES "Swipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
