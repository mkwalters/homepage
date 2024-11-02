-- CreateEnum
CREATE TYPE "Color" AS ENUM ('w', 'b');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "playerColor" "Color" NOT NULL DEFAULT 'w';
