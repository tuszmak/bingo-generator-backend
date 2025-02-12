/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Bingo_table` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Bingo_table" ADD COLUMN     "code" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Bingo_table_code_key" ON "Bingo_table"("code");
