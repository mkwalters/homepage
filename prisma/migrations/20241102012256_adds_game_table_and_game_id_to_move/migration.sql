/*
  Warnings:

  - A unique constraint covering the columns `[gameId,moveNumber]` on the table `Move` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameId` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moveNumber` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Move" ADD COLUMN     "gameId" INTEGER NOT NULL,
ADD COLUMN     "moveNumber" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Move_gameId_moveNumber_key" ON "Move"("gameId", "moveNumber");

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
