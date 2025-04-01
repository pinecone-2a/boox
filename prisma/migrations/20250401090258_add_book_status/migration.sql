-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'PASSIVE');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Swipe" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';
