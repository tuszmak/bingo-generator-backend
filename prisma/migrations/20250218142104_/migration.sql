/*
  Warnings:

  - You are about to drop the `Bingo_table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Bingo_table";

-- CreateTable
CREATE TABLE "BingoTable" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'A cool table!',
    "content" TEXT NOT NULL,

    CONSTRAINT "BingoTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BingoTable_code_key" ON "BingoTable"("code");
