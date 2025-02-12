/*
  Warnings:

  - You are about to drop the `Table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Table";

-- CreateTable
CREATE TABLE "Bingo_table" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Bingo_table_pkey" PRIMARY KEY ("id")
);
